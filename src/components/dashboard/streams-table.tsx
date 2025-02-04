"use client"

import { useDashboardStore } from "@/app/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export const StreamsTable = () => {
  const { recentStreams } = useDashboardStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Streams</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={recentStreams} />
      </CardContent>
    </Card>
  )
} 