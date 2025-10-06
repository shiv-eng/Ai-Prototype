import React from 'react';
import type { NavigationProps, Stock, AiInsight } from '../types';
import { SCREENS } from '../constants';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import LightbulbIcon from '../components/icons/LightbulbIcon';
import ClockIcon from '../components/icons/ClockIcon';
import CalendarIcon from '../components/icons/CalendarIcon';


interface RecommendedStocksScreenProps extends NavigationProps {
    payload: AiInsight;
}

const RecommendedStocksScreen: React.FC<RecommendedStocksScreenProps> = ({ navigate, payload }) => {
    
    const { title, relatedStocks: stocks, rationale, timing, horizon } = payload;
    
    const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 text-primary flex-shrink-0 mt-1">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{children}</p>
                </div>
            </div>
        </div>
    );
    
    const StockListItem: React.FC<{ stock: Stock }> = ({ stock }) => (
        <button onClick={() => navigate(SCREENS.STOCK_DETAIL, stock)} className="flex items-center justify-between w-full p-4 bg-white rounded-lg mb-3 transition-all hover:bg-gray-50 border border-gray-100">
            <div className="flex items-center">
                <img src={stock.logo} alt={stock.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                    <p className="font-bold text-gray-800">{stock.ticker}</p>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold text-gray-900">${stock.price.toFixed(2)}</p>
                <p className={`text-sm font-medium ${stock.changePercent >= 0 ? 'text-positive' : 'text-negative'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
            </div>
        </button>
    );

    return (
         <div className="min-h-full bg-gray-50">
            <header className="p-4 flex items-center bg-white border-b border-gray-100 sticky top-0 z-10">
                <button onClick={() => navigate(SCREENS.AI_INSIGHTS)} className="mr-2 p-1">
                    <ChevronLeftIcon />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
                    <p className="text-sm text-gray-500">AI Investment Thesis</p>
                </div>
            </header>
            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <InfoCard icon={<LightbulbIcon />} title="The Big Idea (Why)">
                        {rationale}
                    </InfoCard>
                     <InfoCard icon={<ClockIcon />} title="The Timing (Why Now)">
                        {timing}
                    </InfoCard>
                     <InfoCard icon={<CalendarIcon />} title="Investment Horizon">
                        <span className="font-semibold text-primary">{horizon}</span>
                    </InfoCard>
                </div>
                
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">What to Buy</h2>
                    {stocks && stocks.length > 0 ? (
                        stocks.map(stock => <StockListItem key={stock.ticker} stock={stock} />)
                    ) : (
                        <p className="text-center text-gray-500 py-8">No recommended stocks for this insight.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default RecommendedStocksScreen;