
import React from 'react';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

interface KycSuccessScreenProps {
    onComplete: () => void;
}

const KycSuccessScreen: React.FC<KycSuccessScreenProps> = ({ onComplete }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8 text-center">
            <div className="text-positive w-24 h-24 mb-6">
                <CheckCircleIcon />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Verification Complete!</h1>
            <p className="mt-4 text-lg text-gray-600">
                Welcome aboard! Your account has been successfully created and verified. You're all set to explore global investment opportunities.
            </p>

            <div className="w-full mt-12">
                <button
                    onClick={onComplete}
                    className="w-full py-4 text-lg font-bold text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition-all"
                >
                    Start Investing
                </button>
            </div>
        </div>
    );
};

export default KycSuccessScreen;