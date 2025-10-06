
import React from 'react';
import type { NavigationProps } from '../types';
import { SCREENS } from '../constants';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';

const RegistrationScreen: React.FC<NavigationProps> = ({ navigate }) => {
    return (
        <div className="flex flex-col h-full bg-primary text-white">
            <header className="p-4 flex items-center bg-transparent border-b border-white/20">
                <button onClick={() => navigate(SCREENS.ONBOARDING)} className="mr-2 p-1">
                    <ChevronLeftIcon />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold">Create Account</h1>
                    <p className="text-sm text-white/80">Step 1 of 3: Your Details</p>
                </div>
                <div className="w-8"></div>
            </header>
            <div className="flex-1 flex flex-col justify-center p-6">
                <div className="w-full space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white border-transparent"
                    />
                    <input 
                        type="tel" 
                        placeholder="Mobile Number" 
                        className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white border-transparent"
                    />
                    <input 
                        type="password" 
                        placeholder="Create Password" 
                        className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white border-transparent"
                    />
                </div>
                <div className="w-full mt-8">
                    <button
                        onClick={() => navigate(SCREENS.KYC_PAN_AADHAAR)}
                        className="w-full py-4 text-lg font-bold text-primary bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all"
                    >
                        Continue
                    </button>
                </div>
                 <p className="text-xs text-white/70 text-center mt-4">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default RegistrationScreen;