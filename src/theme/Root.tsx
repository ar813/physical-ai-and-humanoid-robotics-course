import React from 'react';
import Chatbot from '../components/Chatbot';

// Standard Docusaurus Root wrapper
export default function Root({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Chatbot />
        </>
    );
}
