'use client';

import { UserGrowthData } from '@/app/types';
import { formatNumber } from '@/app/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface UserGrowthChartProps {
  data: UserGrowthData[];
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
};

export const UserGrowthChart = ({ data }: UserGrowthChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
          stroke="#888888"
        />
        <YAxis
          tickFormatter={formatNumber}
          stroke="#888888"
        />
        <Tooltip
          formatter={(value: number) => [formatNumber(value), '']}
          labelFormatter={(label: Date) => formatDate(label)}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalUsers"
          name="Total Users"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="activeUsers"
          name="Active Users"
          stroke="#16a34a"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}; 