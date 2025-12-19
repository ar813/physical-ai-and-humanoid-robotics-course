import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', sender: 'bot', text: 'Hi! Ask me anything about the content provided.' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 20 }); // Bottom-right initial offset
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Text Selection State
    const [selectionPopup, setSelectionPopup] = useState<{ x: number, y: number, text: string } | null>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    // Handle Text Selection
    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            if (selection && selection.toString().trim().length > 0) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();

                // Show popup slightly above the selection
                setSelectionPopup({
                    x: rect.left + (rect.width / 2) - 40, // Center horizontally (approx 80px width)
                    y: rect.top + window.scrollY - 40, // Above text, accounting for scroll
                    text: selection.toString().trim()
                });
            } else {
                setSelectionPopup(null);
            }
        };

        // We use mouseup to detect end of selection. 
        // selectionchange fires too often.
        const handleMouseUp = (e: MouseEvent) => {
            // If clicking inside the popup or chatbot, don't clear selection yet
            if ((e.target as HTMLElement).closest('.ask-ai-popup') || (e.target as HTMLElement).closest('.chatbot-container')) {
                return;
            }

            // Small timeout to let selection settle
            setTimeout(handleSelectionChange, 10);
        };

        // Hide popup onmousedown if clicking elsewhere
        const handleMouseDown = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest('.ask-ai-popup')) {
                setSelectionPopup(null);
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const handleAskAI = () => {
        if (!selectionPopup) return;

        setIsOpen(true);
        // Pre-fill input with context
        setInputValue(`Context: "${selectionPopup.text}"\n\nQuestion: `);
        setSelectionPopup(null);
        // Clear selection
        window.getSelection()?.removeAllRanges();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        // Only drag if clicking the icon, not inside the modal
        if ((e.target as HTMLElement).closest('.chatbot-modal')) return;

        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    // ... (rest of drag logic preserved) ...
    // Refined Drag Logic
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // We'll use a transform for performance
    // Position is fixed in CSS (bottom: 20, right: 20).
    // We will apply transform: translate(x, y)

    const handleDragStart = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.chatbot-modal')) return;
        // don't toggle open if we dragged
        setIsDragging(true);
        dragStartPos.current = {
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        };
    };

    const handleDragMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;
        setOffset({ x: newX, y: newY });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging]);

    const toggleOpen = () => {
        // Prevent opening if it was a drag action (small threshold)
        // For now, assume if not moving much it's a click.
        if (!isDragging) {
            setIsOpen(!isOpen);
        }
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    const autoResizeInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Max height 120px
        }
    };

    useEffect(() => {
        autoResizeInput();
    }, [inputValue]);

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        // Reset height
        if (textareaRef.current) {
            textareaRef.current.style.height = '40px';
        }

        // https://arsalan-ai-backend.onrender.com/ask
        try {
            const res = await fetch("https://arsalan-ai-backend.onrender.com/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMsg.text }),
            });

            if (!res.ok) throw new Error('Network response was not ok');

            const data = await res.json();
            // Assuming API returns { response: "..." } or similar. The prompt didn't specify return format strictly, 
            // but usually these APIs return a 'text' or 'answer' or 'message'. 
            // Let's assume the user just wants us to "display the response". 
            // I'll handle common fields or dump stringified if unknown, but usually it's `response` or `reply`.
            // I'll default to logging it first or checking safety.
            // User said "Send user questions to the provided API endpoint and display the response."
            // Let's assume it returns a JSON with a text field.
            // Based on typical express backends, let's try reading `data.response` or `data`.
            // Safe fallback:
            // The API returns { "reply": "..." }
            const botResponseText = data.reply || data.response || data.answer || data.message || (typeof data === 'string' ? data : JSON.stringify(data));

            const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error fetching chat response:', error);
            setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {selectionPopup && (
                <button
                    className="ask-ai-popup"
                    style={{ top: selectionPopup.y, left: selectionPopup.x }}
                    onClick={handleAskAI}
                >
                    ✨ Ask AI
                </button>
            )}

            <div
                className="chatbot-container"
                style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
                onMouseDown={handleDragStart}
            >
                <div className="chatbot-icon" onClick={toggleOpen} title="Ask AI">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM12 18C9.33 18 7 16.67 7 14.5C7 14.22 7.22 14 7.5 14H16.5C16.78 14 17 14.22 17 14.5C17 16.67 14.67 18 12 18Z" fill="white" />
                    </svg>
                </div>

                {isOpen && (
                    <div className="chatbot-modal" onMouseDown={(e) => e.stopPropagation()}>
                        <div className="chatbot-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>AI Assistant</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                    className="chatbot-clear-btn"
                                    onClick={() => setMessages([{ id: Date.now().toString(), sender: 'bot', text: 'Hi! Ask me anything about the content provided.' }])}
                                    title="Clear Chat"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                </button>
                                <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>×</button>
                            </div>
                        </div>

                        <div className="chatbot-messages">
                            {messages.map(msg => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message bot typing-indicator">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chatbot-input-area">
                            <textarea
                                ref={textareaRef}
                                className="chatbot-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask a question..."
                                disabled={isLoading}
                                rows={1}
                            />
                            <button className={`chatbot-send-btn ${isLoading ? 'loading' : ''}`} onClick={sendMessage} disabled={isLoading || !inputValue.trim()}>
                                {isLoading ? (
                                    <div className="btn-spinner"></div>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Chatbot;
