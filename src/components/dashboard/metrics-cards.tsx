"use client"

import { useDashboardStore } from "@/app/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Music2, DollarSign, Trophy, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const MetricCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string
  value: string
  description: string
  icon: any
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)

export const MetricsCards = () => {
  const { keyMetrics } = useDashboardStore()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        title="Total Users"
        value={keyMetrics.totalUsers.toLocaleString()}
        description="Total registered users"
        icon={Users}
      />
      <MetricCard
        title="Active Users"
        value={keyMetrics.activeUsers.toLocaleString()}
        description="Active in last 30 days"
        icon={TrendingUp}
      />
      <MetricCard
        title="Total Streams"
        value={keyMetrics.totalStreams.toLocaleString()}
        description="Total song plays"
        icon={Music2}
      />
      <MetricCard
        title="Revenue"
        value={`$${keyMetrics.revenue.toLocaleString()}`}
        description="Total revenue"
        icon={DollarSign}
      />
      <MetricCard
        title="Top Artist"
        value={keyMetrics.topArtist}
        description="Most streamed artist"
        icon={Trophy}
      />
    </div>
  )
} 