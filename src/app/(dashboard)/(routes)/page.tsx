'use client'

import { ArrowUpRight, ArrowDownRight, Clock, DollarSign, TrendingUp, Wallet, Plus, Download, FileText, HelpCircle, ChevronRight } from "lucide-react"
import { useTransaction } from "@/hooks/transaction/transaction"
import { useEffect, useRef } from "react"
import { useAccount } from "@/hooks/account/account"
import Link from "next/link"

export default function DashboardPage() {
  const { account } = useAccount()
  const { transactions, getTransactions } = useTransaction()
  const isTransactionsLoaded = useRef(false)
  const analytics = account?.analytics?.[0]

  useEffect(() => {
    if (isTransactionsLoaded.current || !account?.id) return
    getTransactions({ account_id: account.id, limit: 5, page: 1 })
    isTransactionsLoaded.current = true
  }, [account?.id, getTransactions])

  const stats = [
    {
      title: "Total Transactions",
      value: analytics?.total_transactions?.toLocaleString() || "0",
      icon: <Wallet className="h-5 w-5" />,
      trend: 0, // No transaction trend stored, could calculate from previous month
    },
    {
      title: "Success Rate",
      value: `${analytics?.success_rate?.toFixed(1) || 0}%`,
      icon: <TrendingUp className="h-5 w-5" />,
      trend: 0, // Could add success_rate_trend if needed
    },
    {
      title: "Total Revenue",
      value: `$${Number(analytics?.total_revenue || 0).toLocaleString()}`,
      icon: <DollarSign className="h-5 w-5" />,
      trend: analytics?.revenue_trend || 0,
    },
    {
      title: "Pending",
      value: `${analytics?.pending_transactions || 0}`,
      icon: <Clock className="h-5 w-5" />,
      trend: 0,
    },
  ]

  const quickActions = [
    { icon: <Plus className="h-4 w-4" />, label: "New Transaction", href: "/transactions/new" },
    { icon: <Download className="h-4 w-4" />, label: "Export", href: "/reports" },
    { icon: <FileText className="h-4 w-4" />, label: "Docs", href: "/docs" },
    { icon: <HelpCircle className="h-4 w-4" />, label: "Help", href: "/support" },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-100">
            Good {getGreeting()}, {account?.name || 'there'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's your business overview
          </p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <button className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                {action.icon}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Cards - Paper Style */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 dark:text-gray-500">{stat.icon}</span>
              <TrendBadge value={stat.trend} />
            </div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent Transactions - Paper Card */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h2 className="font-medium text-gray-900 dark:text-gray-100">Recent Transactions</h2>
            <Link href="/transactions" className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {transactions.list?.length > 0 ? (
              transactions.list.slice(0, 5).map((tx: any, index: number) => (
                <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(tx.status)}`} />
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {tx.customer?.name || tx.reference || 'Transaction'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(tx.created_at)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      ${Number(tx.amount || 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                <Wallet className="h-8 w-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No transactions yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity & Quick Actions - Paper Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <button className="w-full p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left">
                    <span className="text-gray-400 dark:text-gray-500 mb-2 block">{action.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
            <h2 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Account</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Plan</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{account?.plan || 'Free'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Balance</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">${Number(account?.total_balance || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function TrendBadge({ value }: { value: number }) {
  const positive = value >= 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}>
      {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {Math.abs(value)}%
    </span>
  )
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'success':
      return 'bg-green-500'
    case 'pending':
      return 'bg-yellow-500'
    case 'failed':
      return 'bg-red-500'
    default:
      return 'bg-gray-400'
  }
}

function formatDate(date: string) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
