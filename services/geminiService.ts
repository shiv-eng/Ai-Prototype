
// This is a mock service to simulate Gemini API calls.
// In a real application, this would use `@google/genai`.
import { mockStocks, mockHoldings } from './mockData';
import type { Stock } from '../types';

export const getOnboardingResponse = (userInput: string, step: number): string => {
    const responses = [
        "Hi! I'm your AI investment assistant. To start, what kind of companies or industries are you passionate about? (e.g., technology, healthcare, sustainable energy)",
        "That's great! Now, let's talk about risk. How would you feel if your investment portfolio dropped by 10% in a month?",
        "Understood. We're building a profile that matches your style. What's your primary financial goal for investing? (e.g., long-term growth, regular income, saving for a big purchase)",
        "Perfect. One last thing. Are you new to investing, or do you have some experience?",
        "Thank you! Your investor profile is ready. Let's create your secure account to get started."
    ];
    return responses[step] || "An error occurred.";
};

export const searchStocks = (query: string): Stock[] => {
    const lowerQuery = query.toLowerCase();
    return mockStocks.filter(stock => 
        stock.name.toLowerCase().includes(lowerQuery) ||
        stock.ticker.toLowerCase().includes(lowerQuery) ||
        stock.about.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);
};

export const processCommand = (command: string): string => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes('buy')) {
        return "Trade confirmation: You have successfully purchased 5 shares of NVIDIA. Your portfolio has been updated.";
    }
    if (lowerCommand.includes('sell')) {
        return "Trade confirmation: You have successfully sold all your Apple stock. Your portfolio has been updated.";
    }
    if (lowerCommand.includes('portfolio') || lowerCommand.includes('how am i doing')) {
        const totalValue = mockHoldings.reduce((acc, h) => acc + h.totalValue, 0);
        return `Your portfolio value is currently <strong>$${totalValue.toLocaleString()}</strong>. Today's gain is <strong>+$1,250.75 (+1.52%)</strong>. Your top holding is NVIDIA (NVDA).`;
    }
    if (lowerCommand.includes('price of')) {
         return "The current price of Google (GOOGL) is $178.54.";
    }
    if (lowerCommand.includes('dividend') && lowerCommand.includes('uk')) {
        return `I've found 5 high-dividend-paying stocks in the UK real estate sector that match your low-risk profile. I can add them to a new watchlist for you.`;
    }
    return "I'm sorry, I didn't understand that. You can ask me to buy/sell stocks, check your portfolio, or find investment opportunities.";
};