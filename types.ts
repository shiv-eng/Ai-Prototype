import { SCREENS } from './constants';

export type Screen = typeof SCREENS[keyof typeof SCREENS];

export interface QuarterlyData {
    quarter: string;
    revenue: number;
    netIncome: number;
    eps: number;
}

export interface DocumentLink {
    title: string;
    url: string;
}

export interface FinancialStatement {
    aiSummary: string;
    documentLinks: DocumentLink[];
}

export interface AnalystRating {
    buy: number;
    hold: number;
    sell: number;
}

export interface PriceTarget {
    high: number;
    low: number;
    average: number;
}

export interface AnalystOutlook {
    rating: AnalystRating;
    priceTarget: PriceTarget;
    summary: string;
}

export interface NewsArticle {
    date: string;
    source: string;
    headline: string;
    impact: 'Positive' | 'Negative' | 'Neutral';
    summary: string;
}

export interface Stock {
    ticker: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: string;
    peRatio: number | null;
    dividendYield: number | null;
    week52High: number;
    week52Low: number;
    logo: string;
    about: string;
    analystRating: 'Buy' | 'Hold' | 'Sell'; 
    financials: FinancialStatement;
    analystOutlook: AnalystOutlook;
    news: NewsArticle[];
    aiNewsSummary: string;
}

export interface PortfolioHolding {
    stock: Stock;
    shares: number;
    avgCost: number;
    totalValue: number;
}

export interface Order {
    id: string;
    stock: Stock;
    type: 'Buy' | 'Sell';
    shares: number;
    price: number;
    status: 'Executed' | 'Pending' | 'Cancelled';
    date: string;
}

export interface AiPortfolio {
    id: string;
    name: string;
    description: string;
    cagr: number;
    risk: 'Low' | 'Medium' | 'High';
}

export interface AiInsight {
    id: string;
    title: string;
    content: string;
    rationale: string;
    timing: string;
    horizon: string;
    relatedStocks: Stock[];
}

export interface NavigationProps {
    navigate: (screen: Screen, payload?: any) => void;
}