
import React, { useState } from 'react';
import type { NavigationProps, PortfolioHolding, Order } from '../types';
import { SCREENS } from '../constants';
import { mockHoldings, mockOrders } from '../services/mockData';
import ArrowUpIcon from '../components/icons/ArrowUpIcon';
import ArrowDownIcon from '../components/icons/ArrowDownIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';

const PortfolioScreen: React.FC<NavigationProps> = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState<'holdings' | 'orders'>('holdings');
    const totalValue = mockHoldings.reduce((sum, h) => sum + h.totalValue, 0);

    const HoldingItem: React.FC<{ holding: PortfolioHolding }> = ({ holding }) => {
        const pnl = (holding.stock.price * holding.shares) - (holding.avgCost * holding.shares);
        const pnlPercent = (pnl / (holding.avgCost * holding.shares)) * 100;

        return (
            <button 
                onClick={() => navigate(SCREENS.STOCK_DETAIL, holding.stock)}
                className="w-full flex justify-between items-center bg-white p-4 rounded-lg mb-3 border border-gray-100"
            >
                <div className="flex items-center">
                    <img src={holding.stock.logo} alt={holding.stock.name} className="w-10 h-10 rounded-full mr-4" />
                    <div>
                        <p className="font-bold text-gray-800">{holding.stock.ticker}</p>
                        <p className="text-sm text-gray-500">{holding.shares} Shares</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-gray-900">${holding.totalValue.toFixed(2)}</p>
                    <p className={`text-sm font-medium flex items-center justify-end ${pnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                       {pnl >= 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                       <span className="ml-1">{pnl >= 0 ? '+' : ''}${pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)</span>
                    </p>
                </div>
                <ChevronRightIcon />
            </button>
        );
    };

    const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
        const statusColors = {
            Executed: 'bg-green-100 text-green-800',
            Pending: 'bg-yellow-100 text-yellow-800',
            Cancelled: 'bg-red-100 text-red-800'
        };

        return (
            <div className="bg-white p-4 rounded-lg mb-3 border border-gray-100">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-lg text-gray-800">{order.stock.ticker} <span className={`text-sm font-medium ${order.type === 'Buy' ? 'text-positive' : 'text-negative'}`}>{order.type}</span></p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">${(order.shares * order.price).toFixed(2)}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[order.status]}`}>{order.status}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-full">
            <header className="p-6 bg-white border-b">
                 <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
                 <p className="text-4xl font-bold text-primary mt-4">${totalValue.toLocaleString()}</p>
            </header>

            <div className="flex border-b border-gray-200 bg-white">
                <button
                    onClick={() => setActiveTab('holdings')}
                    className={`flex-1 py-3 text-center font-semibold ${activeTab === 'holdings' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                >
                    Holdings ({mockHoldings.length})
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`flex-1 py-3 text-center font-semibold ${activeTab === 'orders' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
                >
                    Order History ({mockOrders.length})
                </button>
            </div>

            <div className="p-4">
                {activeTab === 'holdings' ? (
                    <div>
                        {mockHoldings.map(h => <HoldingItem key={h.stock.ticker} holding={h} />)}
                    </div>
                ) : (
                    <div>
                        {mockOrders.map(o => <OrderItem key={o.id} order={o} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortfolioScreen;
