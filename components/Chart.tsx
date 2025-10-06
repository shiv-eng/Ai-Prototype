
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartProps {
    data: { name: string; value: number }[];
    isPositive: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, isPositive }) => {
    const color = isPositive ? '#10B981' : '#EF4444';
    const gradientColor = isPositive ? '#34D399' : '#F87171';
    
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={gradientColor} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #e0e0e0',
                            borderRadius: '0.5rem',
                        }}
                        labelStyle={{ fontWeight: 'bold' }}
                        formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} hide />
                    <YAxis domain={['dataMin', 'dataMax']} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} hide />
                    <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} strokeWidth={2} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
