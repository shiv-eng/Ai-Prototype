
import React, { useState } from 'react';
import type { NavigationProps } from '../types';
import { SCREENS } from '../constants';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import IdentificationIcon from '../components/icons/IdentificationIcon';

const KycPanAadhaarScreen: React.FC<NavigationProps> = ({ navigate }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate(SCREENS.KYC_DIGILOCKER);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full bg-primary text-white">
            <header className="p-4 flex items-center bg-transparent border-b border-white/20">
                <button onClick={() => navigate(SCREENS.REGISTRATION)} className="mr-2 p-1">
                    <ChevronLeftIcon />
                </button>
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-bold">KYC Verification</h1>
                    <p className="text-sm text-white/80">Step 2 of 3: Identity Check</p>
                </div>
                <div className="w-8"></div>
            </header>
            <div className="flex-1 flex flex-col justify-center p-6 text-center">
                 <div className="w-16 h-16 bg-white/20 text-white rounded-full mx-auto flex items-center justify-center mb-6">
                    <IdentificationIcon />
                </div>
                <h2 className="text-xl font-bold">Verify Your Identity</h2>
                <p className="text-white/80 mt-2 mb-8">Please enter your PAN and Aadhaar number for verification as per SEBI guidelines.</p>
                
                <div className="w-full space-y-4 text-left">
                    <div>
                        <label className="text-sm font-medium text-white/90 ml-1">PAN Number</label>
                        <input 
                            type="text" 
                            placeholder="ABCDE1234F" 
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white border-transparent"
                        />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-white/90 ml-1">Aadhaar Number</label>
                        <input 
                            type="text" 
                            placeholder="xxxx xxxx xxxx" 
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white border-transparent"
                        />
                    </div>
                </div>
                <div className="w-full mt-8">
                    <button
                        onClick={handleVerify}
                        disabled={isLoading}
                        className="w-full py-4 text-lg font-bold text-primary bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-all disabled:bg-white/70 disabled:text-primary/60"
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Proceed'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KycPanAadhaarScreen;