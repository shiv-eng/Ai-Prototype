
import React, { useState } from 'react';
import type { NavigationProps } from '../types';
import { SCREENS } from '../constants';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import LockSolidIcon from '../components/icons/LockSolidIcon';

const KycDigiLockerScreen: React.FC<NavigationProps> = ({ navigate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [statusText, setStatusText] = useState('Connecting to DigiLocker...');

    const handleConnect = () => {
        setIsLoading(true);
        setTimeout(() => {
            setStatusText('Fetching documents...');
        }, 1500);
        setTimeout(() => {
            setStatusText('Verifying details...');
        }, 3000);
        setTimeout(() => {
            navigate(SCREENS.KYC_SUCCESS);
        }, 4500);
    };

    return (
        <div className="flex flex-col h-full bg-primary text-white">
            <header className="p-4 flex items-center bg-transparent border-b border-white/20">
                <button onClick={() => navigate(SCREENS.KYC_PAN_AADHAAR)} className="mr-2 p-1">
                    <ChevronLeftIcon />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold">KYC Verification</h1>
                    <p className="text-sm text-white/80">Step 3 of 3: Document Sync</p>
                </div>
                <div className="w-8"></div>
            </header>
            <div className="flex-1 flex flex-col justify-center p-6 text-center">
                 <div className="w-16 h-16 bg-white/20 rounded-full mx-auto flex items-center justify-center mb-6">
                    <img src="https://picsum.photos/seed/digilocker/100" alt="DigiLocker" className="w-10"/>
                </div>
                <h2 className="text-xl font-bold">Connect with DigiLocker</h2>
                <p className="text-white/80 mt-2 mb-8">Securely fetch your KYC documents to complete your verification instantly.</p>
                
                {isLoading ? (
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-white font-semibold mt-4">{statusText}</p>
                    </div>
                ) : (
                    <div className="w-full mt-8">
                        <button
                            onClick={handleConnect}
                            className="w-full py-4 text-lg font-bold text-primary bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all flex items-center justify-center"
                        >
                            <LockSolidIcon />
                            <span className="ml-2">Connect with DigiLocker</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KycDigiLockerScreen;