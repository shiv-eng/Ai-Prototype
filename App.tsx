
import React, { useState, useCallback } from 'react';
import { SCREENS } from './constants';
import type { Screen, Stock } from './types';

import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import StockDetailScreen from './screens/StockDetailScreen';
import AiAssistantScreen from './screens/AiAssistantScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import AiInsightsScreen from './screens/AiInsightsScreen';
import RecommendedStocksScreen from './screens/RecommendedStocksScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import KycPanAadhaarScreen from './screens/KycPanAadhaarScreen';
import KycDigiLockerScreen from './screens/KycDigiLockerScreen';
import KycSuccessScreen from './screens/KycSuccessScreen';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
    const [currentScreen, setCurrentScreen] = useState<Screen>(SCREENS.LOGIN);
    const [navigationPayload, setNavigationPayload] = useState<any>(null);

    const navigate = useCallback((screen: Screen, payload: any = null) => {
        setCurrentScreen(screen);
        setNavigationPayload(payload);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        setIsOnboardingComplete(true);
        setCurrentScreen(SCREENS.HOME);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentScreen(SCREENS.LOGIN);
    };

    const renderContent = () => {
        if (!isAuthenticated) {
            switch (currentScreen) {
                case SCREENS.ONBOARDING:
                    return <OnboardingScreen navigate={navigate} />;
                case SCREENS.REGISTRATION:
                    return <RegistrationScreen navigate={navigate} />;
                case SCREENS.KYC_PAN_AADHAAR:
                    return <KycPanAadhaarScreen navigate={navigate} />;
                case SCREENS.KYC_DIGILOCKER:
                    return <KycDigiLockerScreen navigate={navigate} />;
                case SCREENS.KYC_SUCCESS:
                    return <KycSuccessScreen onComplete={handleLogin} />;
                case SCREENS.LOGIN:
                default:
                    return <LoginScreen onLogin={handleLogin} onSignUp={() => navigate(SCREENS.ONBOARDING)} />;
            }
        }
        
        // Authenticated user flows
        if (!isOnboardingComplete) {
             return <OnboardingScreen onComplete={() => setIsOnboardingComplete(true)} navigate={navigate} />;
        }

        switch (currentScreen) {
            case SCREENS.HOME:
                return <HomeScreen navigate={navigate} />;
            case SCREENS.DISCOVER:
                return <DiscoverScreen navigate={navigate} />;
            case SCREENS.PORTFOLIO:
                return <PortfolioScreen navigate={navigate} />;
            case SCREENS.AI_ASSISTANT:
                return <AiAssistantScreen navigate={navigate} />;
            case SCREENS.PROFILE:
                return <ProfileScreen onLogout={handleLogout} />;
            case SCREENS.STOCK_DETAIL:
                return <StockDetailScreen stock={navigationPayload as Stock} navigate={navigate} />;
            case SCREENS.AI_INSIGHTS:
                return <AiInsightsScreen navigate={navigate} />;
            case SCREENS.RECOMMENDED_STOCKS:
                return <RecommendedStocksScreen payload={navigationPayload} navigate={navigate} />;
            default:
                return <HomeScreen navigate={navigate} />;
        }
    };

    const showNav = isAuthenticated && isOnboardingComplete;

    return (
        <div className="h-screen w-screen bg-white font-sans flex flex-col items-center">
            <div className="relative w-full max-w-md h-full flex flex-col bg-gray-50 shadow-2xl">
                <main className="flex-1 overflow-y-auto pb-20">
                    {renderContent()}
                </main>
                {showNav && (
                    <BottomNav
                        currentScreen={currentScreen}
                        navigate={navigate}
                    />
                )}
            </div>
        </div>
    );
};

export default App;