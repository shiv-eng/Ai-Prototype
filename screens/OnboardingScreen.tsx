
import React, { useState, useEffect, useRef } from 'react';
import { getOnboardingResponse } from '../services/geminiService';
import SparklesIcon from '../components/icons/SparklesIcon';
import type { NavigationProps } from '../types';
import { SCREENS } from '../constants';

interface OnboardingScreenProps extends NavigationProps {
    onComplete?: () => void;
}

interface Message {
    text: string;
    sender: 'user' | 'ai';
}

const onboardingFlow = [
    {
        options: ["Technology", "Healthcare", "Sustainable Energy", "Finance"]
    },
    {
        options: ["I'd be very concerned", "A little worried is normal", "I see it as a buying opportunity"]
    },
    {
        options: ["Long-term growth", "Regular income", "Saving for a big purchase"]
    },
    {
        options: ["I'm new to this", "I have some experience", "I'm an expert"]
    }
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, navigate }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState(0);
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const initialMessage = getOnboardingResponse('', 0);
        setMessages([{ text: initialMessage, sender: 'ai' }]);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleOptionClick = (option: string) => {
        if (step >= onboardingFlow.length) return;

        const userMessage: Message = { text: option, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
            const nextStep = step + 1;
            const aiResponseText = getOnboardingResponse(option, nextStep);
            const aiMessage: Message = { text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);
            setStep(nextStep);

            if (nextStep === onboardingFlow.length) { // End of onboarding
                setTimeout(() => {
                    if (onComplete) {
                        onComplete();
                    } else {
                        navigate(SCREENS.REGISTRATION);
                    }
                }, 2000);
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="p-4 border-b bg-white">
                <h1 className="text-xl font-bold text-center text-gray-800">Welcome! Let's get to know you.</h1>
                <p className="text-sm text-center text-gray-500">Our AI will guide you through a quick setup.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><SparklesIcon/></div>}
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                            msg.sender === 'user' 
                            ? 'bg-primary text-white rounded-br-lg' 
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
                        }`}>
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-white border-t">
                 {step < onboardingFlow.length ? (
                    <div className="grid grid-cols-1 gap-3">
                        {onboardingFlow[step].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-secondary hover:border-primary/50 transition-all group"
                            >
                                <span className="font-semibold text-gray-700 group-hover:text-primary">{option}</span>
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 font-semibold py-4">Finalizing your profile...</p>
                )}
            </div>
        </div>
    );
};

export default OnboardingScreen;