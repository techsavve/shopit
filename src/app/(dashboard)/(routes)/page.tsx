'use client'

import { ArrowUpRight, Clock, DollarSign, TrendingUp, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTransaction } from "@/hooks/transaction/transaction"
import { useEffect, useRef } from "react"
import { useAccount } from "@/hooks/account/account"
import { StatCard } from "../_components/dashboard/stat-card"
import { RevenueOverview } from "../_components/dashboard/overview-graph"
import { TransactionsTable } from "../_components/dashboard/table"
import { QuickActions } from "../_components/dashboard/quick-action"

export default function DashboardPage() {
  const { account } = useAccount()
  const { transactions, getTransactions } = useTransaction()
  const isTransactionsLoaded = useRef(false)
  const analytics = account?.analytics?.[0]

  useEffect(() => {
    if (isTransactionsLoaded.current || !account?.id) return
    getTransactions({ account_id: account.id, limit: 4, page: 1 })
    isTransactionsLoaded.current = true
  }, [ account?.id ])

  const stats = [
    {
      title: "Total Transactions",
      value: analytics?.total_transactions_value?.toLocaleString() || "0",
      icon: <Wallet className="h-4 w-4" />,
      trend: analytics?.total_transactions_trend || 0,
      color: "blue" as const,
    },
    {
      title: "Success Rate",
      value: `${analytics?.success_rate_value || 0}%`,
      icon: <TrendingUp className="h-4 w-4" />,
      trend: analytics?.success_rate_trend || 0,
      color: "green" as const,
    },
    {
      title: "Total Revenue",
      value: `$${Number(analytics?.total_revenue_value || 0).toLocaleString()}`,
      icon: <DollarSign className="h-4 w-4" />,
      trend: analytics?.total_revenue_trend || 0,
      color: "purple" as const,
    },
    {
      title: "Pending Transactions",
      value: `${analytics?.pending_transactions_value || 0}`,
      icon: <Clock className="h-4 w-4" />,
      trend: analytics?.pending_transactions_trend || 0,
      color: "yellow" as const,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <Button size="lg" className="rounded-xl shadow-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RevenueOverview analytics={account?.analytics}/>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground mt-1">Latest payment activities</p>
          </div>
        </div>
        <TransactionsTable transactions={transactions.list} />
      </div>
    </div>
  )
}
