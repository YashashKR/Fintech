import React from 'react';

interface DonutChartProps {
    data: Array<{ label: string; value: number; color: string }>;
    title?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-slate-500">No data available</p>
            </div>
        );
    }

    let currentAngle = -90; // Start from top
    const radius = 80;
    const innerRadius = 50;
    const centerX = 100;
    const centerY = 100;

    const segments = data.map(item => {
        const percentage = (item.value / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        currentAngle = endAngle;

        // Calculate path for donut segment
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);

        const x3 = centerX + innerRadius * Math.cos(endRad);
        const y3 = centerY + innerRadius * Math.sin(endRad);
        const x4 = centerX + innerRadius * Math.cos(startRad);
        const y4 = centerY + innerRadius * Math.sin(startRad);

        const largeArc = angle > 180 ? 1 : 0;

        const pathData = [
            `M ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            `L ${x3} ${y3}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
            'Z',
        ].join(' ');

        return {
            ...item,
            pathData,
            percentage: percentage.toFixed(1),
        };
    });

    return (
        <div className="w-full">
            {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
                {/* Donut Chart */}
                <svg width="200" height="200" viewBox="0 0 200 200" className="flex-shrink-0">
                    {segments.map((segment, index) => (
                        <path
                            key={index}
                            d={segment.pathData}
                            fill={segment.color}
                            className="transition-opacity hover:opacity-80"
                        />
                    ))}
                </svg>

                {/* Legend */}
                <div className="flex flex-col gap-3 w-full sm:w-auto">
                    {segments.map((segment, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: segment.color }}
                            />
                            <span className="text-sm text-slate-300">{segment.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
