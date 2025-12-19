import os
import glob
from typing import List
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.http import models
from fastembed import TextEmbedding

# 1. Load Environment Variables
load_dotenv()

API_KEY = os.getenv("API_KEY")
CLUSTER_ENDPOINT = os.getenv("CLUSTER_ENDPOINT")

if not API_KEY or not CLUSTER_ENDPOINT:
    print("Error: API_KEY or CLUSTER_ENDPOINT not found in .env file.")
    print("Please ensure you have a .env file with these variables.")
    exit(1)

# Configuration
COLLECTION_NAME = "robotics_course"
DOCS_DIR = "docs"
CHUNK_SIZE = 1000  # Characters
OVERLAP = 100

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    """Splits text into smaller chunks with overlap."""
    if not text:
        return []
        
    chunks = []
    start = 0
    text_len = len(text)
    
    while start < text_len:
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap
        
    return chunks

def main():
    print("Starting Qdrant ingestion process...")

    # 2. Connect to Qdrant Vector Database
    try:
        client = QdrantClient(
            url=CLUSTER_ENDPOINT,
            api_key=API_KEY,
        )
        print("Successfully connected to Qdrant.")
    except Exception as e:
        print(f"Failed to connect to Qdrant: {e}")
        exit(1)

    # 3. Initialize Embedding Model
    print("Initializing embedding model (FastEmbed)...")
    # fastembed downloads and uses a lightweight, fast model by default (BAAI/bge-small-en-v1.5)
    embedding_model = TextEmbedding()
    
    # Ensure collection exists
    if not client.collection_exists(collection_name=COLLECTION_NAME):
        print(f"Creating collection '{COLLECTION_NAME}'...")
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(
                size=384,  # Dimension for BAAI/bge-small-en-v1.5
                distance=models.Distance.COSINE
            )
        )
    else:
        print(f"Collection '{COLLECTION_NAME}' already exists.")

    # 4. Process Files and Create Embeddings
    markdown_files = glob.glob(os.path.join(DOCS_DIR, "**", "*.md"), recursive=True)
    if not markdown_files:
        print(f"No markdown files found in {DOCS_DIR}")
        exit(1)

    print(f"Found {len(markdown_files)} markdown files to process.")

    total_chunks_saved = 0

    for file_path in markdown_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
            
            # Simple metadata from file path
            file_name = os.path.basename(file_path)
            
            # Skip empty files
            if not content.strip():
                continue

            chunks = chunk_text(content, CHUNK_SIZE, OVERLAP)
            if not chunks:
                continue

            print(f"Processing '{file_name}': {len(chunks)} chunks...")
            
            # Generate embeddings for all chunks in this file
            # fastembed returns a generator, convert to list
            embeddings = list(embedding_model.embed(chunks))

            points = []
            for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
                # Create a unique ID for each chunk (deterministically based on file and index)
                # Or let Qdrant assign UUIDs. Here we verify uniqueness manually or let client handle it.
                # Simplest is to let Qdrant generate UUIDs or use UUIDs ourselves.
                import uuid
                point_id = str(uuid.uuid4())
                
                payload = {
                    "source": file_name,
                    "path": file_path,
                    "text": chunk,
                    "chunk_index": i
                }

                points.append(models.PointStruct(
                    id=point_id,
                    vector=embedding.tolist(),
                    payload=payload
                ))

            # 5. Save Chunks in Qdrant
            operation_info = client.upsert(
                collection_name=COLLECTION_NAME,
                wait=True,
                points=points
            )
            
            if operation_info.status == models.UpdateStatus.COMPLETED:
                total_chunks_saved += len(points)
            else:
                print(f"Warning: Upsert status for {file_name} is {operation_info.status}")

        except Exception as e:
            print(f"Error processing file {file_path}: {e}")

    print("-" * 30)
    print(f"Success! Process completed.")
    print(f"Total documents processed: {len(markdown_files)}")
    print(f"Total chunks saved to Qdrant: {total_chunks_saved}")
    print("-" * 30)

if __name__ == "__main__":
    main()
