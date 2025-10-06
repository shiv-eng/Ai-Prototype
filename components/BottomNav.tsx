
import React from 'react';
import type { Screen } from '../types';
import { SCREENS } from '../constants';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import PortfolioIcon from './icons/PortfolioIcon';
import SparklesIcon from './icons/SparklesIcon';
import UserIcon from './icons/UserIcon';

interface BottomNavProps {
    currentScreen: Screen;
    navigate: (screen: Screen) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    const activeColor = 'text-primary';
    const inactiveColor = 'text-gray-400';
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center w-1/5 pt-2 pb-1"
        >
            <div className={`w-6 h-6 ${isActive ? activeColor : inactiveColor}`}>
                {icon}
            </div>
            <span className={`text-xs mt-1 ${isActive ? activeColor : inactiveColor}`}>
                {label}
            </span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, navigate }) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex justify-around items-center">
            <NavItem 
                label="Home"
                icon={<HomeIcon />}
                isActive={currentScreen === SCREENS.HOME}
                onClick={() => navigate(SCREENS.HOME)}
            />
            <NavItem 
                label="Discover"
                icon={<SearchIcon />}
                isActive={currentScreen === SCREENS.DISCOVER}
                onClick={() => navigate(SCREENS.DISCOVER)}
            />
            <NavItem 
                label="AI Assistant"
                icon={<SparklesIcon />}
                isActive={currentScreen === SCREENS.AI_ASSISTANT}
                onClick={() => navigate(SCREENS.AI_ASSISTANT)}
            />
            <NavItem 
                label="Portfolio"
                icon={<PortfolioIcon />}
                isActive={currentScreen === SCREENS.PORTFOLIO}
                onClick={() => navigate(SCREENS.PORTFOLIO)}
            />
            <NavItem 
                label="Profile"
                icon={<UserIcon />}
                isActive={currentScreen === SCREENS.PROFILE}
                onClick={() => navigate(SCREENS.PROFILE)}
            />
        </div>
    );
};

export default BottomNav;
