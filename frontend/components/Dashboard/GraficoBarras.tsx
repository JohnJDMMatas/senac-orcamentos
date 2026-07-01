'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Dataset {
    label: string;
    data: number[];
    backgroundColor: string;
}

interface GraficoBarrasProps {
    labels: string[];
    datasets: Dataset[];
}

export default function GraficoBarras({ labels, datasets }: GraficoBarrasProps) {
    const chartData = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            }
        },
    };

    return (
        <div style={{ position: 'relative', height: '300px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
}
