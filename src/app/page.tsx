'use client';

import { useEffect, useState } from 'react';
import { useDashboardStore } from '@/app/store';
import { generateMockData } from '@/lib/mock-data';
import { DashboardHeader } from "@/components/dashboard/header";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { Charts } from "@/components/dashboard/charts";
import { StreamsTable } from "@/components/dashboard/streams-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { 
    setKeyMetrics,
    setRevenueSources,
    setUserGrowthData,
    setTopSongs,
    setRecentStreams
  } = useDashboardStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const mockData = generateMockData();
        setKeyMetrics(mockData.metrics);
        setRevenueSources(mockData.revenueSources);
        setUserGrowthData(mockData.userGrowthData.map(data => ({
          ...data,
          date: new Date(data.date)
        })));
        setTopSongs(mockData.topSongs);
        setRecentStreams(mockData.recentStreams);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader />
      <MetricsCards />
      <Charts />
      <StreamsTable />
    </div>
  );
} 