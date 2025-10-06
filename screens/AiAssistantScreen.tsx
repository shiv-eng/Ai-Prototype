
import React, { useState, useEffect, useRef } from 'react';
import type { NavigationProps } from '../types';
import { processCommand } from '../services/geminiService';
import SparklesIcon from '../components/icons/SparklesIcon';
import SendIcon from '../components/icons/SendIcon';

interface Message {
    text: string;
    sender: 'user' | 'ai';
}

const AiAssistantScreen: React.FC<NavigationProps> = ({ navigate }) => {
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! How can I help you today? You can ask me to buy stocks, check your portfolio, or find investment ideas.", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage: Message = { text: input, sender: 'user' };
        
        // Optimistically add user message
        setMessages(prev => [...prev, userMessage]);
        
        // Process command and get AI response
        const aiResponseText = processCommand(input);
        const aiMessage: Message = { text: aiResponseText, sender: 'ai' };

        setInput('');

        // Add AI response after a short delay
        setTimeout(() => {
            setMessages(prev => [...prev, aiMessage]);
        }, 1000);
    };

    const suggestionPrompts = [
        "Buy 5 shares of NVIDIA",
        "How is my portfolio doing?",
        "Show me high-dividend UK real estate stocks"
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <header className="p-4 border-b bg-white text-center">
                <h1 className="text-xl font-bold text-gray-800">AI Assistant</h1>
                <p className="text-sm text-gray-500">Your personal investment copilot</p>
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                     <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><SparklesIcon/></div>}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                            msg.sender === 'user' 
                            ? 'bg-primary text-white rounded-br-lg' 
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                        }`}>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text }}></p>
                        </div>
                    </div>
                ))}
                 <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
                    {suggestionPrompts.map(prompt => (
                        <button key={prompt} onClick={() => setInput(prompt)} className="text-xs text-primary bg-secondary p-2 rounded-lg text-left">
                           {prompt}
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a command..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button onClick={handleSend} className="p-3 bg-primary text-white rounded-full">
                       <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AiAssistantScreen;
