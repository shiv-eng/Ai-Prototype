import React from 'react';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';

interface ProfileScreenProps {
    onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {

    const MenuItem: React.FC<{ label: string, isDestructive?: boolean, onClick?: () => void }> = ({ label, isDestructive = false, onClick }) => (
        <button onClick={onClick} className={`w-full flex justify-between items-center text-left p-4 bg-white rounded-lg mb-2 border border-gray-200 ${isDestructive ? 'text-negative' : 'text-gray-800'}`}>
            <span className="font-semibold">{label}</span>
            <ChevronRightIcon />
        </button>
    );

    return (
        <div className="p-4">
            <header className="text-center my-6">
                <img src="https://picsum.photos/100" alt="User" className="w-24 h-24 rounded-full mx-auto mb-4"/>
                <h1 className="text-2xl font-bold text-gray-900">Anusha Sharma</h1>
                <p className="text-gray-500">anusha.sharma@email.com</p>
            </header>

            <div className="space-y-4">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-2">Account</h2>
                <MenuItem label="Personal Details" />
                <MenuItem label="Linked Bank Accounts" />
                <MenuItem label="Risk Profile" />
            </div>

            <div className="space-y-4 mt-8">
                 <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-2">Settings & Support</h2>
                <MenuItem label="Security (Password & Biometrics)" />
                <MenuItem label="Notifications" />
                <MenuItem label="Help Center / FAQs" />
                <MenuItem label="Contact Support" />
                <MenuItem label="Generate Tax Report" />
            </div>
            
            <div className="mt-8">
                 <MenuItem label="Log Out" isDestructive onClick={onLogout} />
            </div>
        </div>
    );
};

export default ProfileScreen;