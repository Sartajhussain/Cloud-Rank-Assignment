import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import UserTable from './UserTable';
import calls from '../calls.json';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function PieChart() {
    const [selectedSegment, setSelectedSegment] = useState(null);
    const [territoryCounts, setTerritoryCounts] = useState({});

   
    useEffect(() => {
        
        const territoryCountsData = calls.reduce((acc, call) => {
            const territory = call.callType;
            acc[territory] = (acc[territory] || 0) + 1;
            return acc;
        }, {});

        setTerritoryCounts(territoryCountsData);
    }, []);

   
    const labels = Object.keys(territoryCounts);
    const dataValues = Object.values(territoryCounts);

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.5)',
                    'rgba(37, 99, 235, 0.5)',
                    'rgba(29, 78, 216, 0.5)',
                    'rgba(30, 64, 175, 0.5)',
                    'rgba(28, 53, 141, 0.5)',
                ],
                borderColor: [
                    'rgb(218, 224, 233)',
                    'rgba(192, 198, 211, 0.55)',
                    'rgb(201, 204, 212)',
                    'rgb(217, 220, 230)',
                    'rgb(213, 215, 224)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw;
                        const total = tooltipItem.dataset.data.reduce((sum, val) => sum + val, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
            datalabels: {
                formatter: (value, ctx) => {
                    const total = ctx.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                color: '#4B5563',
                font: {
                    size: 14,
                },
                anchor: 'center',
                align: 'center',
            },
        },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                const segment = data.labels[index];
                setSelectedSegment(segment); 
            }
        },
    };

    return (
        <div className="flex" style={{ gap: '10px' }}>
            <div
                className="w-1/2 h-50"
                style={{ backgroundColor: 'rgb(219, 234, 255)', padding: '30px', borderRadius: '10px' }}
            >
                <div style={{ width: '50%', height: '400px', margin: '0 auto' }}>
                    <Pie data={data} options={options} />
                </div>
            </div>
            {selectedSegment && (
                <div className='w-1/2 h-50'>

                    <UserTable segment={selectedSegment} /> 
                </div>
            )}
        </div>
    );
}

export default PieChart;
