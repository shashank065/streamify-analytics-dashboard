'use client';

import { RevenueSource } from '@/app/types';
import { formatCurrency } from '@/app/lib/utils';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface RevenueDistributionChartProps {
  data: RevenueSource[];
}


const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#eab308', '#6366f1'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <p className="font-medium">{data.source}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Amount: {formatCurrency(data.amount)}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Percentage: {data.percentage}%
        </p>
      </div>
    );
  }
  return null;
};

export const RevenueDistributionChart = ({ data }: RevenueDistributionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="amount"
          nameKey="source"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}; 