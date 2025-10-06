
import React, { useState } from 'react';
import type { NavigationProps, Stock } from '../types';
import { SCREENS } from '../constants';
import { mockStocks } from '../services/mockData';
import { searchStocks } from '../services/geminiService';
import SearchIcon from '../components/icons/SearchIcon';

const DiscoverScreen: React.FC<NavigationProps> = ({ navigate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Top Gainers');
    const [searchResults, setSearchResults] = useState<Stock[] | null>(null);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setSearchResults(null);
            return;
        }
        const results = searchStocks(searchTerm);
        setSearchResults(results);
    };

    const tabs = ['Top Gainers', 'Top Losers', 'Popular Brands'];
    const currentList = mockStocks.slice(0, 5); // Simple mock list

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
        <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-900">Discover</h1>
            <div className="relative my-4">
                <input
                    type="text"
                    placeholder='"French luxury stocks up 20% this year"'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                </div>
            </div>

            {searchResults ? (
                 <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Search Results</h2>
                    {searchResults.length > 0 ? (
                        searchResults.map(stock => <StockListItem key={stock.ticker} stock={stock} />)
                    ) : (
                        <p className="text-center text-gray-500 py-8">No results found.</p>
                    )}
                </div>
            ) : (
                <>
                    <div className="flex space-x-2 border-b border-gray-200 mb-4">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-semibold ${
                                    activeTab === tab 
                                    ? 'border-b-2 border-primary text-primary' 
                                    : 'text-gray-500'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div>
                        {currentList.map(stock => <StockListItem key={stock.ticker} stock={stock} />)}
                    </div>
                </>
            )}
        </div>
    );
};

export default DiscoverScreen;
