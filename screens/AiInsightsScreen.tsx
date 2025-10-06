import React from 'react';
import type { NavigationProps, AiInsight } from '../types';
import { SCREENS } from '../constants';
import { mockAiInsights } from '../services/mockData';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';

const AiInsightsScreen: React.FC<NavigationProps> = ({ navigate }) => {

    const InsightCard: React.FC<{ insight: AiInsight }> = ({ insight }) => (
        <div className="bg-white p-4 rounded-xl mb-4 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 text-primary flex-shrink-0 mt-1">
                    <SparklesIcon />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.content}</p>
                    <button 
                        onClick={() => navigate(SCREENS.RECOMMENDED_STOCKS, insight)}
                        className="text-sm font-bold text-primary mt-3 flex items-center"
                    >
                        Explore Stocks <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-full bg-gray-50">
            <header className="p-4 flex items-center bg-white border-b border-gray-100 sticky top-0 z-10">
                <button onClick={() => navigate(SCREENS.HOME)} className="mr-2 p-1">
                    <ChevronLeftIcon />
                </button>
                <h1 className="text-lg font-bold text-gray-900">AI Insights</h1>
            </header>
            <div className="p-4">
                {mockAiInsights.map(insight => <InsightCard key={insight.id} insight={insight} />)}
            </div>
        </div>
    );
};

export default AiInsightsScreen;