'use client';

import { TopSong } from '@/app/types';
import { formatNumber } from '@/app/lib/utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface TopSongsChartProps {
  data: TopSong[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <p className="font-medium">{label}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Artist: {payload[0].payload.artist}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Streams: {formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export const TopSongsChart = ({ data }: TopSongsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
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
          dataKey="songName"
          stroke="#888888"
          angle={-45}
          textAnchor="end"
          height={70}
        />
        <YAxis
          tickFormatter={formatNumber}
          stroke="#888888"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="streams"
          name="Streams"
          fill="#2563eb"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}; 