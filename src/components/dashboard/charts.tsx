"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDashboardStore } from "@/app/store"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Sector } from "recharts"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Stream } from "@/types"
import { generateMockData } from "@/lib/mock-data"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "@/components/ui/error-fallback"
import { DatePickerWithRange } from "@/components/dashboard/date-picker"
import { subMonths } from "date-fns"
import { DateRange } from "react-day-picker"
import { CustomPayload, ActiveShapeProps } from "@/app/types/dashboard"

// Chart configuration following shadcn patterns
const chartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "hsl(var(--primary))",
  },
  activeUsers: {
    label: "Active Users",
    color: "hsl(var(--secondary))",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--accent))",
  },
  advertisements: {
    label: "Advertisements",
    color: "hsl(var(--muted))",
  },
  streams: {
    label: "Streams",
    color: "hsl(var(--primary))",
  },
  revenue: {
    colors: [
      "hsl(var(--primary))", // Primary blue
      "hsl(var(--destructive))", // Red
      "hsl(var(--success))", // Green 
      "hsl(var(--warning))", // Yellow/Orange
      "hsl(var(--secondary))" // Purple/Secondary
    ],
    hoverColors: [
      "hsl(var(--primary)/.8)", // Slightly transparent versions
      "hsl(var(--destructive)/.8)",
      "hsl(var(--success)/.8)",
      "hsl(var(--warning)/.8)", 
      "hsl(var(--secondary)/.8)"
    ]
  }
}

// Add this renderActiveShape function for interactive pie chart
const renderActiveShape = (props: ActiveShapeProps) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value, name
  } = props;

  return (
    <g>
      <text 
        x={cx} 
        y={cy - 20} 
        textAnchor="middle" 
        className="text-base font-medium fill-foreground transition-colors duration-200"
      >
        {name}
      </text>
      <text 
        x={cx} 
        y={cy + 20} 
        textAnchor="middle" 
        className="text-sm fill-muted-foreground transition-colors duration-200"
      >
        {`$${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-200 ease-in-out"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        className="transition-all duration-200 ease-in-out"
      />
    </g>
  );
};

// Add CustomTooltip type and component
const CustomTooltip = ({ active, payload }: { 
  active?: boolean; 
  payload?: CustomPayload[] 
}) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <p className="text-sm font-medium">{payload[0]?.name}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mt-1">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <p className="text-xs text-muted-foreground">
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

// Update the chart heights and font sizes
const chartStyles = {
  height: 300,
  fontSize: {
    axis: 12,
    label: 14,
    tooltip: 12
  },
  padding: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  }
}

export const Charts = () => {
  const { userGrowthData, revenueSources, topSongs, setRecentStreams } = useDashboardStore()
  const [selectedRevenue, setSelectedRevenue] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Format data for charts
  const formattedUserGrowthData = userGrowthData.map(data => ({
    ...data,
    date: format(new Date(data.date), 'MMM yyyy'),
    totalUsers: Number(data.totalUsers),
    activeUsers: Number(data.activeUsers)
  }))

  const formattedRevenueSources = revenueSources.map(source => ({
    name: source.source,
    value: source.amount,
    percentage: source.percentage
  }))

  const formattedTopSongs = topSongs.map(song => ({
    name: `${song.songName} - ${song.artist}`,
    streams: song.streams
  }))

  // Custom formatters
  const valueFormatter = (number: number) => 
    `${Intl.NumberFormat("us").format(number).toString()}`
  
  const dollarFormatter = (number: number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`

  // Handle revenue source selection
  const handleRevenueSelect = (value: string) => {
    setSelectedRevenue(value === selectedRevenue ? null : value)
    if (value && value !== selectedRevenue) {
      const source = revenueSources.find(s => s.source === value)
      if (source) {
        setRecentStreams((prevStreams: Stream[]) => 
          prevStreams.filter(stream => 
            source.source === 'Subscriptions' 
              ? stream.streamCount > 100
              : stream.streamCount <= 100
          )
        )
      }
    } else {
      const mockData = generateMockData()
      setRecentStreams(mockData.recentStreams)
    }
  }

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Growth</CardTitle>
              <DatePickerWithRange 
                date={dateRange} 
                onChange={setDateRange}
              />
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer 
              width="100%" 
              height={chartStyles.height}
              className="mt-4"
            >
              <AreaChart data={formattedUserGrowthData}>
                <defs>
                  <linearGradient id="totalUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig.totalUsers.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartConfig.totalUsers.color} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="activeUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartConfig.activeUsers.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartConfig.activeUsers.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  stroke="currentColor" 
                  className="text-muted-foreground text-xs"
                />
                <YAxis 
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  tickFormatter={valueFormatter}
                  tick={{ fontSize: chartStyles.fontSize.axis }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="totalUsers"
                  name="Total Users"
                  stroke={chartConfig.totalUsers.color}
                  fill={`url(#totalUsers)`}
                />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  name="Active Users"
                  stroke={chartConfig.activeUsers.color}
                  fill={`url(#activeUsers)`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={(props: unknown) => renderActiveShape(props as ActiveShapeProps)}
                  data={formattedRevenueSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  onMouseEnter={(_, index) => {
                    setActiveIndex(index);
                    setHoveredIndex(index);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={(data) => handleRevenueSelect(data.name)}
                  className="cursor-pointer transition-transform duration-200 ease-in-out"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {formattedRevenueSources.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={hoveredIndex === index 
                        ? chartConfig.revenue.hoverColors[index % chartConfig.revenue.colors.length]
                        : chartConfig.revenue.colors[index % chartConfig.revenue.colors.length]
                      }
                      className={cn(
                        "stroke-background dark:stroke-background transition-all duration-200",
                        hoveredIndex === index && "scale-105"
                      )}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.[0]) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-all duration-200">
                        <p className="font-medium text-foreground">{data.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dollarFormatter(data.value)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {data.percentage}% of total
                        </p>
                      </div>
                    );
                  }}
                  wrapperStyle={{ outline: 'none' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Top 5 Streamed Songs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={formattedTopSongs}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="name" 
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  height={100}
                  tickFormatter={(value) => {
                    // Limit text length and add ellipsis if needed
                    return value.length > 20 ? value.substring(0, 20) + '...' : value;
                  }}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-muted-foreground text-xs"
                  tickFormatter={valueFormatter}
                  tick={{ fontSize: chartStyles.fontSize.axis }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="streams" 
                  fill={chartConfig.streams.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
} 