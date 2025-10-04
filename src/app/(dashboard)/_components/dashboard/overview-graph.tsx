"use client"

import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts"
import { IAnalytics } from "@/lib/types/entity/analytics/analytics"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  analytics?: IAnalytics[]
}

export function RevenueOverview({ analytics }: Props) {
  // Show loader if no data
  if (!analytics || analytics.length === 0) {
    return (
      <Card className="col-span-4 rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-12 rounded-md" />
            <Skeleton className="h-8 w-12 rounded-md" />
            <Skeleton className="h-8 w-12 rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-full w-full rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  // Transform analytics into chart data
  const data = analytics.map((a) => ({
    month: new Date(a.created_at).toLocaleString("default", { month: "short" }),
    value: a.total_revenue_value,
  }))

  const total = analytics.reduce((sum, a) => sum + a.total_revenue_value, 0).toLocaleString()
  const trend = analytics[analytics.length - 1]?.total_revenue_trend ?? 0

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Last {analytics.length} months performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="rounded-lg">6M</Button>
          <Button size="sm" variant="ghost" className="rounded-lg">1Y</Button>
          <Button size="sm" variant="ghost" className="rounded-lg">All</Button>
        </div>
      </CardHeader>

      <CardContent className="h-80">
        {/* Stat summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${total}</p>
          </div>
          <div
            className={`flex items-center ${
              trend >= 0 ? "text-green-600" : "text-red-600"
            } font-medium`}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend}% vs last period
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(val) => `$${val / 1000}k`} />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                backgroundColor: "white",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
