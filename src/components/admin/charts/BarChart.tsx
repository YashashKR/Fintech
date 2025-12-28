import React from 'react';

interface BarChartProps {
    data: Array<{ label: string; value: number; color?: string }>;
    title?: string;
    height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, title, height = 300 }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);
    const chartHeight = height - 60; // Reserve space for labels

    return (
        <div className="w-full">
            {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
            <div className="relative" style={{ height: `${height}px` }}>
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-12 flex flex-col justify-between text-xs text-slate-500">
                    <span>{maxValue}</span>
                    <span>{(maxValue * 0.75).toFixed(2)}</span>
                    <span>{(maxValue * 0.5).toFixed(2)}</span>
                    <span>{(maxValue * 0.25).toFixed(2)}</span>
                    <span>0</span>
                </div>

                {/* Chart area */}
                <div className="absolute left-12 right-0 top-0 bottom-12 flex items-end justify-around gap-4 border-l border-b border-slate-700/50">
                    {/* Horizontal grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} className="w-full border-t border-slate-700/30" />
                        ))}
                    </div>

                    {/* Bars */}
                    {data.map((item, index) => {
                        const barHeight = (item.value / maxValue) * chartHeight;
                        const barColor = item.color || '#3B82F6'; // Default blue

                        return (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                                    style={{
                                        height: `${barHeight}px`,
                                        backgroundColor: barColor,
                                        minHeight: item.value > 0 ? '4px' : '0px',
                                    }}
                                />
                                <span className="text-xs text-slate-400 text-center">{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
