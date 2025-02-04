'use client';

import { cn } from '@/app/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  icon,
  trend,
  className,
}: MetricCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        {icon && (
          <div className="text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold">{value}</p>
        {trend && (
          <span
            className={cn(
              "ml-2 text-sm font-medium",
              trend.isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}; 