import React, { useState, useMemo } from 'react';
import type { NavigationProps, Stock, DocumentLink, NewsArticle } from '../types';
import { SCREENS } from '../constants';
import Chart from '../components/Chart';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import LinkIcon from '../components/icons/LinkIcon';
import NewspaperIcon from '../components/icons/NewspaperIcon';


interface StockDetailScreenProps extends NavigationProps {
    stock: Stock;
}

const Stat: React.FC<{ label: string; value: string | number | null }> = ({ label, value }) => (
    <div className="flex justify-between items-center py-3">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value ?? 'N/A'}</p>
    </div>
);


const OverviewTab: React.FC<{ stock: Stock }> = ({ stock }) => {
    const [timeframe, setTimeframe] = useState('1Y');
    const isPositive = stock.changePercent >= 0;
    const chartData = useMemo(() => {
        const data = [];
        let value = stock.price * (1 - (Math.random() - 0.5) * 0.4);
        for (let i = 0; i < 100; i++) {
            data.push({ name: `p${i}`, value: value });
            value += (Math.random() - 0.5) * 2;
        }
        return data;
    }, [stock.price, timeframe]);
    
    return (
        <div className="space-y-6">
            <section>
                <h2 className="text-lg font-bold text-gray-800 mb-2">About {stock.name}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{stock.about}</p>
            </section>
            
            <Chart data={chartData} isPositive={isPositive} />
             <div className="flex justify-center space-x-2 pb-4 border-b border-gray-100">
                {['1D', '1W', '1M', '1Y', '5Y'].map(tf => (
                    <button key={tf} onClick={() => setTimeframe(tf)} className={`px-4 py-1.5 text-sm rounded-full font-semibold ${timeframe === tf ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                        {tf}
                    </button>
                ))}
            </div>

             <section>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Key Statistics</h2>
                <div className="divide-y divide-gray-100">
                    <Stat label="Market Cap" value={stock.marketCap} />
                    <Stat label="P/E Ratio" value={stock.peRatio} />
                    <Stat label="Dividend Yield" value={stock.dividendYield ? `${stock.dividendYield.toFixed(2)}%` : null} />
                    <Stat label="52-Week High" value={`$${stock.week52High.toFixed(2)}`} />
                    <Stat label="52-Week Low" value={`$${stock.week52Low.toFixed(2)}`} />
                </div>
            </section>
        </div>
    );
};

const FinancialsTab: React.FC<{ stock: Stock }> = ({ stock }) => {
    const { aiSummary, documentLinks } = stock.financials;

    const DocumentLinkItem: React.FC<{ link: DocumentLink }> = ({ link }) => (
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-secondary transition-colors">
            <p className="font-semibold text-gray-800">{link.title}</p>
            <div className="text-primary">
                <LinkIcon />
            </div>
        </a>
    );
    
    return (
        <div className="space-y-6">
            <div className="bg-secondary/70 p-4 rounded-xl text-sm text-primary-dark leading-relaxed">
                <p>{aiSummary}</p>
            </div>
            
            <section>
                 <h2 className="text-lg font-bold text-gray-800 mb-3">Source Documents</h2>
                 <div className="space-y-3">
                    {documentLinks.map(link => <DocumentLinkItem key={link.title} link={link} />)}
                 </div>
            </section>
        </div>
    );
};


const NewsAndAnalysisTab: React.FC<{ stock: Stock }> = ({ stock }) => {
    const { rating, priceTarget, summary } = stock.analystOutlook;

    const totalRatings = rating.buy + rating.hold + rating.sell;
    const buyPercent = (rating.buy / totalRatings) * 100;
    const holdPercent = (rating.hold / totalRatings) * 100;
    const sellPercent = (rating.sell / totalRatings) * 100;
    
    const impactColors = {
        Positive: 'bg-positive/10 text-positive border-positive/30',
        Negative: 'bg-negative/10 text-negative border-negative/30',
        Neutral: 'bg-gray-400/10 text-gray-600 border-gray-400/30'
    };
    
    const NewsItem: React.FC<{ article: NewsArticle }> = ({ article }) => (
        <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-semibold text-gray-800">{article.headline}</p>
                    <p className="text-xs text-gray-500">{article.source} · {article.date}</p>
                </div>
                 <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap border ${impactColors[article.impact]}`}>{article.impact}</span>
            </div>
            <p className="text-sm text-gray-600">{article.summary}</p>
        </div>
    );

    return (
        <div className="space-y-8">
            <section>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-100 shadow-sm space-y-4">
                     <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2 text-center">Analyst Consensus</p>
                        <div className="flex w-full h-3 rounded-full overflow-hidden">
                            <div className="bg-positive" style={{ width: `${buyPercent}%` }}></div>
                            <div className="bg-yellow-400" style={{ width: `${holdPercent}%` }}></div>
                            <div className="bg-negative" style={{ width: `${sellPercent}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-2 font-medium text-gray-500">
                             <span className="text-positive">Buy ({buyPercent.toFixed(0)}%)</span>
                             <span className="text-yellow-500">Hold ({holdPercent.toFixed(0)}%)</span>
                             <span className="text-negative">Sell ({sellPercent.toFixed(0)}%)</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-center pt-4 border-t border-gray-200">
                         <div>
                            <p className="text-xs text-gray-500">Low Target</p>
                            <p className="font-bold text-lg text-gray-800">${priceTarget.low.toFixed(2)}</p>
                        </div>
                         <div>
                            <p className="text-xs text-gray-500">Average Target</p>
                            <p className="font-bold text-xl text-primary">${priceTarget.average.toFixed(2)}</p>
                        </div>
                         <div>
                            <p className="text-xs text-gray-500">High Target</p>
                            <p className="font-bold text-lg text-gray-800">${priceTarget.high.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
                    </div>
                </div>
            </section>
            
            <section>
                <h2 className="text-lg font-bold text-gray-900 flex items-center mb-3"><NewspaperIcon/> <span className="ml-2">Latest News</span></h2>
                <div className="bg-secondary/70 p-4 rounded-xl text-sm text-primary-dark leading-relaxed mb-4">
                    <p className="font-semibold text-primary-dark mb-1">AI News Summary</p>
                    <p>{stock.aiNewsSummary}</p>
                </div>
                <div className="space-y-3">
                    {stock.news.map((item, i) => <NewsItem key={i} article={item}/>)}
                </div>
            </section>
        </div>
    );
};


const StockDetailScreen: React.FC<StockDetailScreenProps> = ({ stock, navigate }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'news'>('overview');
    const isPositive = stock.changePercent >= 0;

    const TabButton: React.FC<{label: string, name: 'overview' | 'financials' | 'news'}> = ({label, name}) => (
        <button
            onClick={() => setActiveTab(name)}
            className={`flex-1 py-3 text-center font-semibold text-sm transition-all border-b-2 ${
                activeTab === name
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="bg-gray-50 min-h-full">
            <header className="p-4 flex items-center bg-white border-b border-gray-100 sticky top-0 z-10">
                <button onClick={() => navigate(SCREENS.HOME)} className="mr-2 p-1">
                    <ChevronLeftIcon />
                </button>
                <img src={stock.logo} alt={stock.name} className="w-9 h-9 rounded-full mr-3" />
                <div className="flex-1">
                    <h1 className="text-lg font-bold text-gray-900">{stock.ticker}</h1>
                    <p className="text-xs text-gray-500 truncate">{stock.name}</p>
                </div>
                 <div className="text-right">
                    <p className="text-lg font-bold">${stock.price.toFixed(2)}</p>
                    <p className={`text-xs font-semibold ${isPositive ? 'text-positive' : 'text-negative'}`}>
                        {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </p>
                </div>
            </header>

            <div className="flex border-b border-gray-200 bg-white">
                <TabButton label="Overview" name="overview" />
                <TabButton label="Financials" name="financials" />
                <TabButton label="News & Analysis" name="news" />
            </div>

            <div className="p-4 pb-24">
                {activeTab === 'overview' && <OverviewTab stock={stock} />}
                {activeTab === 'financials' && <FinancialsTab stock={stock} />}
                {activeTab === 'news' && <NewsAndAnalysisTab stock={stock} />}
            </div>
            
            <div className="fixed bottom-20 left-0 right-0 w-full max-w-md mx-auto p-3 bg-transparent pointer-events-none">
                <div className="flex space-x-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg pointer-events-auto">
                    <button className="w-1/2 py-3 bg-negative text-white font-bold rounded-full text-lg shadow-md hover:bg-red-600 transition">Sell</button>
                    <button className="w-1/2 py-3 bg-positive text-white font-bold rounded-full text-lg shadow-md hover:bg-green-600 transition">Buy</button>
                </div>
            </div>
        </div>
    );
};

export default StockDetailScreen;