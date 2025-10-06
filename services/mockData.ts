import type { Stock, PortfolioHolding, Order, AiPortfolio, NewsArticle, AiInsight } from '../types';

const financialDocuments = [
    { title: 'Earning Call Transcripts', url: '#' },
    { title: 'Investor Presentations', url: '#' },
    { title: 'Annual Reports', url: '#' },
    { title: 'Income Statements', url: '#' },
    { title: 'Balance Sheet (PnL)', url: '#' },
];

const aaplFinancials = {
    aiSummary: "Over the past 3 years, Apple has demonstrated consistent revenue growth, primarily driven by strong iPhone sales and a rapidly expanding high-margin Services division. While net income growth has been robust, it has faced some pressure from rising R&D costs for new product categories like the Vision Pro. The company maintains an exceptionally strong balance sheet with significant cash reserves, allowing for substantial shareholder returns through buybacks and dividends.",
    documentLinks: financialDocuments
};

const googlFinancials = {
    aiSummary: "Alphabet's financial performance has been strong, with consistent double-digit revenue growth fueled by its core Search and YouTube advertising businesses. The Google Cloud segment has become a significant contributor, recently achieving profitability. Net income remains high, though investments in AI and 'Other Bets' create some margin variability. The company's cash flow is substantial, supporting both innovation and capital return programs.",
    documentLinks: financialDocuments
};

const adyenFinancials = {
    aiSummary: "Adyen has shown impressive revenue growth, consistently expanding its payment processing volume with large enterprise clients. However, its 'volume vs. value' strategy has led to some margin compression as the company invests heavily in talent and platform expansion to capture market share. Profitability remains solid, but the market is closely watching the balance between growth and margins.",
    documentLinks: financialDocuments
}

const asmlFinancials = {
    aiSummary: "ASML's financials are characterized by its monopoly in EUV lithography, leading to very strong revenue and high profit margins. The company experiences cyclicality based on semiconductor industry demand, but its long-term order backlog provides significant visibility. Heavy R&D investment is a constant, necessary to maintain its technological lead. It generates strong free cash flow, supporting both dividends and growth initiatives.",
     documentLinks: financialDocuments
}

// FIX: Explicitly type `aaplNews` with NewsArticle[] to ensure its shape, particularly the 'impact' property, matches the type definition.
const aaplNews: NewsArticle[] = [
    { date: 'May 20, 2024', source: 'Bloomberg', headline: "Apple Shares Rise on Report of 'Groundbreaking' AI Features Coming to iOS 18", impact: 'Positive', summary: 'A new report suggests Apple is set to unveil significant AI enhancements at its upcoming developer conference, potentially driving a new iPhone upgrade cycle.'},
    { date: 'May 15, 2024', source: 'Reuters', headline: "iPhone Sales in China Show Signs of Stabilization After a Tough Quarter", impact: 'Neutral', summary: 'Recent data indicates that while competition from local brands remains fierce, Apple\'s market share in China is no longer in freefall, offering some relief to investors.'},
    { date: 'May 5, 2024', source: 'Wall Street Journal', headline: "EU Opens New Antitrust Probe into Apple's App Store Policies", impact: 'Negative', summary: 'Regulators are investigating whether Apple\'s compliance with the Digital Markets Act is sufficient, posing a risk of further fines and mandated changes.'}
];

// FIX: Corrected a malformed object that caused shorthand property errors and explicitly typed the array with NewsArticle[] to resolve type errors.
const googlNews: NewsArticle[] = [
    { date: 'May 22, 2024', source: 'The Verge', headline: "Google I/O Showcases 'AI-First' Future with Project Astra and Gemini Integration", impact: 'Positive', summary: 'Google demonstrated deep integration of its Gemini AI model across its product suite, impressing analysts with its vision for an AI-powered future.'},
    { date: 'May 18, 2024', source: 'CNBC', headline: "Waymo Gets Green Light for Expansion in More US Cities", impact: 'Positive', summary: 'Alphabet\'s self-driving car unit, Waymo, received regulatory approval to expand its robotaxi services, a positive step for the long-term \'Other Bets\' category.'},
    { date: 'May 12, 2024', source: 'Financial Times', headline: "Advertisers Raise Concerns Over AI-Generated Search Results", impact: 'Negative', summary: 'Some major advertisers are expressing concern that AI-driven search summaries could reduce click-through rates on traditional ad links, a core part of Google\'s revenue.'}
];

// FIX: Explicitly type `adyenNews` with NewsArticle[] to ensure its shape matches the type definition.
const adyenNews: NewsArticle[] = [
     { date: 'May 19, 2024', source: 'Reuters', headline: "Adyen Partners with a Major US Retail Giant for In-Store and Online Payments", impact: 'Positive', summary: 'The new partnership is expected to significantly boost Adyen\'s payment volume in North America, a key growth market for the company.'},
     { date: 'May 10, 2024', source: 'Bloomberg', headline: "Competition in Digital Payments Heats Up as Stripe Lowers Fees for Enterprise", impact: 'Negative', summary: 'Increased pricing pressure from competitors like Stripe could impact Adyen\'s take rate and margins in the coming quarters, according to analysts.'},
     { date: 'Apr 28, 2024', source: 'Company Press Release', headline: "Adyen Reports Strong Q1 Growth in Processed Volume, Beating Expectations", impact: 'Positive', summary: 'The company reported higher-than-expected payment volume for the first quarter, reassuring investors about its growth trajectory.'}
];

// FIX: Explicitly type `asmlNews` with NewsArticle[] to ensure its shape matches the type definition.
const asmlNews: NewsArticle[] = [
     { date: 'May 21, 2024', source: 'Nikkei Asia', headline: "ASML Receives Major Order for New High-NA EUV Machines from TSMC", impact: 'Positive', summary: 'A significant order from a key customer for its next-generation machines signals strong long-term demand for advanced chipmaking equipment.'},
     { date: 'May 14, 2024', source: 'Reuters', headline: "US Government Pressures Netherlands to Further Restrict Chip Tech Exports", impact: 'Negative', summary: 'Ongoing geopolitical tensions could lead to tighter restrictions on ASML\'s ability to sell certain equipment to China, potentially impacting a portion of its revenue.'},
     { date: 'May 1, 2024', source: 'Financial Times', headline: "Semiconductor Industry Outlook Softens Amidst Slowing Smartphone Sales", impact: 'Neutral', summary: 'While ASML\'s long-term outlook is secure, short-term demand for its machines could be affected by a broader slowdown in the consumer electronics market.'}
]


export const mockStocks: Stock[] = [
    {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        price: 190.91,
        change: -1.50,
        changePercent: -0.78,
        marketCap: '3.1T',
        peRatio: 30.5,
        dividendYield: 0.51,
        week52High: 199.62,
        week52Low: 164.08,
        logo: 'https://picsum.photos/seed/AAPL/100',
        about: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It is known for its innovative hardware, software, and services, creating a powerful and loyal ecosystem.',
        analystRating: 'Buy',
        financials: aaplFinancials,
        analystOutlook: {
            rating: { buy: 35, hold: 10, sell: 2 },
            priceTarget: { high: 250, low: 180, average: 215.50 },
            summary: "Analysts are broadly positive on Apple due to its strong brand loyalty, consistent cash flow, and growth in its high-margin services division. Concerns remain around regulatory scrutiny and reliance on iPhone sales."
        },
        news: aaplNews,
        aiNewsSummary: "Recent news for Apple is cautiously optimistic. Positive sentiment is driven by high expectations for AI features in the next iOS, which could spur upgrades. However, this is balanced by ongoing regulatory challenges in the EU and a competitive, though stabilizing, market in China."
    },
    {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 178.54,
        change: 2.30,
        changePercent: 1.30,
        marketCap: '2.2T',
        peRatio: 27.2,
        dividendYield: 0.45,
        week52High: 180.25,
        week52Low: 115.83,
        logo: 'https://picsum.photos/seed/GOOGL/100',
        about: 'Alphabet Inc. is a holding company that gives ambitious projects the resources to succeed. It is the parent company of Google, which remains the global leader in online search, advertising, and cloud computing.',
        analystRating: 'Buy',
        financials: googlFinancials,
        analystOutlook: {
            rating: { buy: 45, hold: 5, sell: 0 },
            priceTarget: { high: 220, low: 180, average: 205.00 },
            summary: "The consensus for Alphabet is a strong buy. Wall Street is optimistic about the growth trajectory of Google Cloud and the company's leadership position in AI development, which is expected to drive future earnings."
        },
        news: googlNews,
        aiNewsSummary: "The news narrative for Alphabet is strongly positive, centering on its aggressive and well-received push into AI with Gemini. Progress in its Waymo division adds to long-term optimism, though some advertisers are expressing minor concerns about the changing nature of search."
    },
    {
        ticker: 'TSLA',
        name: 'Tesla, Inc.',
        price: 183.01,
        change: -2.25,
        changePercent: -1.22,
        marketCap: '580B',
        peRatio: 40.8,
        dividendYield: null,
        week52High: 299.29,
        week52Low: 138.80,
        logo: 'https://picsum.photos/seed/TSLA/100',
        about: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems. It is a leader in the EV market and is expanding into AI and robotics.',
        analystRating: 'Hold',
        financials: aaplFinancials, // Using as placeholder
        analystOutlook: {
            rating: { buy: 15, hold: 25, sell: 10 },
            priceTarget: { high: 250, low: 150, average: 190.00 },
            summary: "Analysts are divided on Tesla. While its strong brand and technological lead, while bears highlight increasing competition, margin pressures, and concerns over CEO Elon Musk's other ventures."
        },
        news: aaplNews, // Placeholder
        aiNewsSummary: "Recent news for Tesla is mixed. Positive sentiment is driven by new model announcements. However, this is balanced by ongoing regulatory challenges and a competitive market."
    },
    {
        ticker: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 950.02,
        change: 15.80,
        changePercent: 1.69,
        marketCap: '2.3T',
        peRatio: 76.5,
        dividendYield: 0.02,
        week52High: 974.00,
        week52Low: 373.56,
        logo: 'https://picsum.photos/seed/NVDA/100',
        about: 'NVIDIA Corporation is a company that designs and manufactures graphics processing units (GPUs), and other technology for computers. It is the undisputed leader in chips for artificial intelligence.',
        analystRating: 'Buy',
        financials: googlFinancials, // Using as placeholder
        analystOutlook: {
            rating: { buy: 50, hold: 2, sell: 1 },
            priceTarget: { high: 1200, low: 900, average: 1100.00 },
            summary: "NVIDIA has a near-unanimous 'Strong Buy' rating from analysts, driven by the explosive demand for its AI accelerators. The company's dominant market position in the AI data center is a key factor."
        },
        news: googlNews, // Placeholder
        aiNewsSummary: "The news narrative for NVIDIA is strongly positive, centering on its aggressive and well-received push into AI. Progress in its partnerships adds to long-term optimism."
    },
     {
        ticker: 'AMZN',
        name: 'Amazon.com, Inc.',
        price: 185.00,
        change: 1.50,
        changePercent: 0.82,
        marketCap: '1.9T',
        peRatio: 52.1,
        dividendYield: null,
        week52High: 191.70,
        week52Low: 118.35,
        logo: 'https://picsum.photos/seed/AMZN/100',
        about: 'Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
        analystRating: 'Buy',
        financials: googlFinancials, // Using as placeholder
        analystOutlook: {
            rating: { buy: 52, hold: 3, sell: 0 },
            priceTarget: { high: 230, low: 190, average: 210.00 },
            summary: "Analysts are highly optimistic about Amazon, citing the continued dominance and profitability of Amazon Web Services (AWS) and improvements in e-commerce operating margins as primary growth drivers."
        },
        news: googlNews, // Placeholder
        aiNewsSummary: "Recent news for Amazon is positive, with focus on the continued growth of its AWS cloud division and strong e-commerce performance."
    },
];

export const mockInternationalStocks: Stock[] = [
    {
        ticker: 'ADYEN.AS',
        name: 'Adyen N.V.',
        price: 1250.70,
        change: -12.30,
        changePercent: -0.97,
        marketCap: '38B',
        peRatio: 48.1,
        dividendYield: null,
        week52High: 1700,
        week52Low: 600,
        logo: 'https://picsum.photos/seed/ADYEN/100',
        about: 'Adyen is a Dutch payment company that provides a modern end-to-end infrastructure connecting directly to Visa, Mastercard, and consumers\' globally preferred payment methods.',
        analystRating: 'Buy',
        financials: adyenFinancials,
        analystOutlook: {
            rating: { buy: 18, hold: 5, sell: 2 },
            priceTarget: { high: 1800, low: 1200, average: 1650.00 },
            summary: "Analysts favor Adyen for its superior single-platform technology in the competitive payments space and its high-growth exposure to digital commerce. Valuation remains a key point of debate."
        },
        news: adyenNews,
        aiNewsSummary: "The current news sentiment for Adyen is mixed but leaning positive. A major new partnership in the US is a significant win, but it's tempered by broader concerns about increasing price competition in the payments sector, which could affect future margins."
    },
    {
        ticker: '1211.HK',
        name: 'BYD Company',
        price: 29.80, // In USD
        change: 0.55,
        changePercent: 1.88,
        marketCap: '85B',
        peRatio: 20.5,
        dividendYield: 0.5,
        week52High: 35.00,
        week52Low: 22.00,
        logo: 'https://picsum.photos/seed/BYD/100',
        about: 'BYD Company Limited is a Chinese multinational manufacturing company. It is a major manufacturer of electric vehicles (cars, buses, etc.), and batteries.',
        analystRating: 'Buy',
        financials: googlFinancials, // Using as placeholder
        analystOutlook: {
            rating: { buy: 25, hold: 3, sell: 1 },
            priceTarget: { high: 40, low: 28, average: 35.00 },
            summary: "The outlook on BYD is positive, driven by its leading position in the Chinese EV market and its vertical integration with battery production. Geopolitical risks are a primary concern for investors."
        },
        news: googlNews, // Placeholder
        aiNewsSummary: "News for BYD is positive, focusing on its market leadership in the EV space and international expansion efforts. Geopolitical tensions remain a background concern."
    },
    {
        ticker: 'ASML.AS',
        name: 'ASML Holding N.V.',
        price: 1025.00,
        change: 15.70,
        changePercent: 1.56,
        marketCap: '410B',
        peRatio: 45.3,
        dividendYield: 0.5,
        week52High: 1050.00,
        week52Low: 580.00,
        logo: 'https://picsum.photos/seed/ASML/100',
        about: 'ASML Holding N.V. is a Dutch multinational corporation specializing in the development and manufacturing of photolithography systems, essential for producing computer chips.',
        analystRating: 'Buy',
        financials: asmlFinancials,
        analystOutlook: {
            rating: { buy: 28, hold: 4, sell: 0 },
            priceTarget: { high: 1200, low: 1000, average: 1120.00 },
            summary: "ASML holds a monopoly on critical EUV lithography machines required for advanced chipmaking, giving it a 'Strong Buy' consensus. Long-term demand is viewed as secure due to global chip expansion."
        },
        news: asmlNews,
        aiNewsSummary: "ASML's news flow reflects its unique position. Positive long-term sentiment is reinforced by major new orders for its advanced technology. However, this is consistently shadowed by negative geopolitical news regarding trade restrictions, which creates short-term uncertainty."
    },
    {
        ticker: 'WISE.L',
        name: 'Wise plc',
        price: 8.90, // In USD
        change: -0.15,
        changePercent: -1.66,
        marketCap: '9B',
        peRatio: 35.2,
        dividendYield: null,
        week52High: 12.00,
        week52Low: 6.00,
        logo: 'https://picsum.photos/seed/WISE/100',
        about: 'Wise plc (formerly TransferWise) is a London-based financial technology company. The company allows people and businesses to send money abroad at a lower cost compared to traditional banks.',
        analystRating: 'Hold',
        financials: adyenFinancials, // Using placeholder
        analystOutlook: {
            rating: { buy: 8, hold: 12, sell: 3 },
            priceTarget: { high: 11.50, low: 8.00, average: 9.50 },
            summary: "Analysts are mixed on Wise. While its strong brand and low-cost model are positives, increasing competition in the remittance space and regulatory pressures have led to a more cautious 'Hold' stance."
        },
        news: adyenNews, // Placeholder
        aiNewsSummary: "News for Wise is neutral, focusing on the competitive landscape of the remittance market. While the company continues to execute, pricing pressure from competitors is a key theme."
    },
    {
        ticker: '1910.HK',
        name: 'Samsonite International',
        price: 3.50, // In USD
        change: 0.08,
        changePercent: 2.34,
        marketCap: '5B',
        peRatio: 12.8,
        dividendYield: 2.1,
        week52High: 4.00,
        week52Low: 2.50,
        logo: 'https://picsum.photos/seed/SAMSONITE/100',
        about: 'Samsonite International S.A. is an American luggage manufacturer and retailer, with products ranging from large suitcases to small toiletries bags and briefcases.',
        analystRating: 'Buy',
        financials: adyenFinancials, // Using placeholder
        analystOutlook: {
            rating: { buy: 15, hold: 2, sell: 0 },
            priceTarget: { high: 5.00, low: 3.80, average: 4.50 },
            summary: "The consensus on Samsonite is positive, based on the strong rebound in global travel. Analysts believe the company is well-positioned to capitalize on increased tourism and business travel."
        },
        news: adyenNews, // Placeholder
        aiNewsSummary: "The news for Samsonite is broadly positive, linked to strong global travel data. Reports often focus on rebounding tourism numbers, which directly benefit the company."
    },
];

export const mockWatchlist = mockInternationalStocks;

export const mockHoldings: PortfolioHolding[] = [
    { stock: mockStocks[3], shares: 50, avgCost: 550.00, totalValue: 50 * mockStocks[3].price },
    { stock: mockStocks[0], shares: 100, avgCost: 170.00, totalValue: 100 * mockStocks[0].price },
    { stock: mockStocks[1], shares: 80, avgCost: 130.00, totalValue: 80 * mockStocks[1].price },
];

export const mockOrders: Order[] = [
    { id: '1', stock: mockStocks[3], type: 'Buy', shares: 10, price: 920.50, status: 'Executed', date: '2024-05-20' },
    { id: '2', stock: mockStocks[0], type: 'Buy', shares: 20, price: 188.00, status: 'Executed', date: '2024-05-18' },
    { id: '3', stock: mockStocks[2], type: 'Sell', shares: 15, price: 185.00, status: 'Pending', date: '2024-05-21' },
    { id: '4', stock: mockStocks[1], type: 'Buy', shares: 5, price: 175.00, status: 'Cancelled', date: '2024-05-15' },
];

export const mockAiPortfolios: AiPortfolio[] = [
    {
        id: '1',
        name: 'Global Robotics & AI',
        description: 'Invest in companies at the forefront of the AI and robotics revolution.',
        cagr: 25.5,
        risk: 'High'
    },
    {
        id: '2',
        name: 'Sustainable Energy Leaders',
        description: 'A portfolio of global leaders in renewable energy and green technology.',
        cagr: 18.2,
        risk: 'Medium'
    },
    {
        id: '3',
        name: 'Emerging Market Innovators',
        description: 'High-growth potential companies from rapidly developing economies.',
        cagr: 22.1,
        risk: 'High'
    },
    {
        id: '4',
        name: 'Global Dividend Payers',
        description: 'Stable companies from around the world with a strong history of paying dividends.',
        cagr: 8.9,
        risk: 'Low'
    }
];

export const mockAiInsights: AiInsight[] = [
    {
        id: '1',
        title: 'Diversify your EV Exposure',
        content: "Based on your interest in EV tech, consider diversifying with leading South Korean and German battery manufacturers.",
        rationale: "Your current holdings are concentrated in a single EV maker. While a strong company, this creates company-specific risk. Diversifying into key parts of the EV supply chain, like battery manufacturers, reduces this risk and captures value from the entire ecosystem's growth, not just one car brand.",
        timing: "The EV market is nearing an inflection point where battery technology and production scale are the key differentiators. Several governments have recently renewed green energy subsidies, creating tailwinds for the entire sector. Investing now positions you ahead of the next wave of EV adoption.",
        horizon: "Long-term (3-5 years)",
        relatedStocks: [mockInternationalStocks[1], mockStocks[2]]
    },
    {
        id: '2',
        title: 'Geographic Diversification',
        content: 'Your portfolio has a high concentration in US Tech. Consider diversifying geographically with European blue-chip stocks for stability.',
        rationale: "Over-concentration in a single country or sector can increase volatility. European blue-chip stocks, especially in sectors like industrial technology and payments, offer exposure to different economic cycles and can provide a stabilizing effect on your portfolio.",
        timing: "Recent economic data from the Eurozone shows signs of stabilization and potential recovery. With valuations still reasonable compared to their US counterparts, now presents an attractive entry point to gain exposure to high-quality European companies.",
        horizon: "Medium-term (1-3 years)",
        relatedStocks: [mockInternationalStocks[0], mockInternationalStocks[2]]
    },
    {
        id: '3',
        title: 'Luxury Sector Momentum',
        content: 'Based on recent market trends, the luxury goods sector is showing strong momentum. You might be interested in top European brands.',
        rationale: "The luxury goods market has shown remarkable resilience and pricing power, even in uncertain economic times. This sector benefits from strong brand loyalty and a growing global consumer base with high disposable income.",
        timing: "The resurgence of global travel and tourism is a major catalyst for the luxury sector. As international travel continues to recover to pre-pandemic levels, spending on high-end goods is expected to increase significantly.",
        horizon: "Medium-term (1-2 years)",
        relatedStocks: [mockInternationalStocks[4]]
    },
     {
        id: '4',
        title: 'High-Growth Payments',
        content: 'The digital payments sector continues to show strong growth. Explore leaders in the space that are expanding their global footprint.',
        rationale: "The global shift from cash to digital payments is a powerful secular trend. Companies with superior technology platforms that can serve large, global enterprise clients are best positioned to capture a disproportionate share of this market growth.",
        timing: "Many leading payment technology stocks have seen their valuations pull back from recent highs, despite continued strong fundamental growth. This creates a potential opportunity to invest in top-tier companies at more attractive prices.",
        horizon: "Long-term (5+ years)",
        relatedStocks: [mockInternationalStocks[0], mockInternationalStocks[3]]
    }
];