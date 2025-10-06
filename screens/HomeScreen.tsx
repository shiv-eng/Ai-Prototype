import React from 'react';
import type { NavigationProps, Stock, AiPortfolio } from '../types';
import { SCREENS } from '../constants';
import { mockHoldings, mockWatchlist, mockAiPortfolios, mockAiInsights } from '../services/mockData';
import ArrowUpIcon from '../components/icons/ArrowUpIcon';
import ArrowDownIcon from '../components/icons/ArrowDownIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const HomeScreen: React.FC<NavigationProps> = ({ navigate }) => {
    const totalValue = mockHoldings.reduce((acc, h) => acc + h.totalValue, 0);
    const totalGain = 1250.75;
    const totalGainPercent = (totalGain / (totalValue - totalGain)) * 100;
    const firstInsight = mockAiInsights[0];

    // A small, reusable chart for the watchlist
    const MiniChart: React.FC<{ data: { value: number }[], isPositive: boolean }> = ({ data, isPositive }) => {
        const color = isPositive ? '#10B981' : '#EF4444';
        return (
            <div className="w-24 h-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                        <defs>
                            <linearGradient id={`mini-chart-gradient-${isPositive}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={color} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fill={`url(#mini-chart-gradient-${isPositive})`}
                            fillOpacity={1}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const StockListItem: React.FC<{ stock: Stock }> = ({ stock }) => {
        // Generate mock data for the mini chart
        const chartData = Array.from({ length: 20 }, () => ({
            value: stock.price * (1 + (Math.random() - 0.5) * 0.1)
        }));
        
        const isPositive = stock.changePercent >= 0;

        return (
            <button 
                onClick={() => navigate(SCREENS.STOCK_DETAIL, stock)} 
                className="flex items-center w-full p-4 bg-white rounded-xl mb-3 transition-all hover:shadow-lg hover:scale-[1.02] border border-gray-100 shadow-sm"
            >
                <img src={stock.logo} alt={stock.name} className="w-10 h-10 rounded-full mr-4" />
                <div className="flex-1">
                    <p className="font-bold text-gray-900">{stock.ticker}</p>
                    <p className="text-sm text-gray-500 truncate">{stock.name}</p>
                </div>
                <div className="mx-4">
                    <MiniChart data={chartData} isPositive={isPositive} />
                </div>
                <div className="text-right w-24">
                    <p className="font-semibold text-gray-900">${stock.price.toFixed(2)}</p>
                    <p className={`text-sm font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
                        {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </p>
                </div>
            </button>
        );
    };
    
    // Create some gradients for the portfolio cards
    const portfolioGradients = [
        'from-blue-100 to-indigo-100',
        'from-green-100 to-teal-100',
        'from-purple-100 to-pink-100',
        'from-yellow-100 to-orange-100',
    ];

    const AiPortfolioCard: React.FC<{ portfolio: AiPortfolio, gradient: string }> = ({ portfolio, gradient }) => (
        <div className={`w-72 flex-shrink-0 relative bg-gradient-to-br ${gradient} p-5 rounded-2xl shadow-md overflow-hidden group`}>
             <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-300"></div>
            <h3 className="font-bold text-lg text-gray-800 relative z-10">{portfolio.name}</h3>
            <p className="text-sm text-gray-600 mt-2 h-10 relative z-10">{portfolio.description}</p>
            <div className="flex justify-between items-end mt-6 relative z-10">
                <div>
                    <p className="text-xs text-gray-500 font-medium">AVG. RETURN</p>
                    <p className="font-bold text-xl text-positive">{portfolio.cagr.toFixed(1)}%</p>
                </div>
                 <div>
                    <p className="text-xs text-gray-500 font-medium text-right">RISK</p>
                    <p className="font-semibold text-gray-800 text-right">{portfolio.risk}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-full">
            <header className="bg-gradient-to-br from-primary to-primary-dark text-white p-6 rounded-b-[2.5rem] shadow-2xl shadow-primary/30">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-sm font-medium text-white/70">Portfolio Value</h1>
                        <p className="text-4xl font-bold mt-1">${totalValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full">
                         <img src="https://picsum.photos/100" alt="User" className="w-12 h-12 rounded-full"/>
                    </div>
                </div>
                <div className="mt-4">
                    <span className="inline-flex items-center font-semibold bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-sm">
                        {totalGain >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        <span className="ml-2">${totalGain.toFixed(2)} ({totalGainPercent.toFixed(2)}%) Today</span>
                    </span>
                </div>
            </header>

            <div className="p-4 space-y-8">
                <section>
                    <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-bold text-gray-800">AI Insights</h2>
                         <button onClick={() => navigate(SCREENS.AI_INSIGHTS)} className="text-sm font-semibold text-primary flex items-center">
                            See All <ChevronRightIcon />
                         </button>
                    </div>
                    <div className="p-5 bg-gradient-to-tr from-secondary to-white rounded-2xl border border-primary/10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 text-primary/10">
                            <SparklesIcon />
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 text-primary flex-shrink-0 mt-1">
                                <SparklesIcon />
                            </div>
                            <div>
                                <p className="font-semibold text-primary-dark leading-snug">{firstInsight.content}</p>
                                <button onClick={() => navigate(SCREENS.RECOMMENDED_STOCKS, firstInsight)} className="text-sm font-bold text-primary mt-3">Explore Now</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                     <h2 className="text-xl font-bold text-gray-800 mb-4">AI-Managed Portfolios</h2>
                     <div className="flex overflow-x-auto space-x-4 -mx-4 px-4 pb-2">
                        {mockAiPortfolios.map((p, i) => <AiPortfolioCard key={p.id} portfolio={p} gradient={portfolioGradients[i % portfolioGradients.length]} />)}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Watchlist</h2>
                        <button onClick={() => navigate(SCREENS.DISCOVER)} className="text-sm font-semibold text-primary flex items-center">
                            Discover More <ChevronRightIcon />
                        </button>
                    </div>
                    <div>
                        {mockWatchlist.map(stock => <StockListItem key={stock.ticker} stock={stock} />)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomeScreen;