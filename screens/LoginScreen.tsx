
import React from 'react';
import SparklesIcon from '../components/icons/SparklesIcon';

interface LoginScreenProps {
    onLogin: () => void;
    onSignUp: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-primary p-8 text-white">
            <div className="text-center">
                <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
                    <div className="w-16 h-16 text-primary-dark">
                         <SparklesIcon />
                    </div>
                </div>
                <h1 className="text-4xl font-bold">Global Invest AI</h1>
                <p className="mt-4 text-lg text-white/80">Your AI-powered gateway to global markets.</p>
            </div>

            <div className="w-full mt-16 space-y-4">
                 <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                 <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                />
            </div>

            <div className="w-full mt-8">
                <button
                    onClick={onLogin}
                    className="w-full py-4 text-lg font-bold text-primary bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all"
                >
                    Sign In
                </button>
                <button
                    onClick={onSignUp}
                    className="w-full py-3 mt-4 text-lg font-semibold text-white bg-transparent border-2 border-white/50 rounded-lg hover:bg-white/10 transition-all"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;