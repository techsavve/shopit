import { StatCard } from "@/app/(dashboard)/_components/dashboard/stat-card"
import { RevenueOverview } from "@/app/(dashboard)/_components/dashboard/overview-graph"
import { TransactionsTable } from "@/app/(dashboard)/_components/dashboard/table"
import { QuickActions } from "@/app/(dashboard)/_components/dashboard/quick-action"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  // Mock data - replace with real data from your API
  const mockStats = [
    {
      title: "Total Revenue",
      value: "$24,567",
      icon: <DollarSign className="h-5 w-5" />,
      trend: 12.5,
      color: "green" as const
    },
    {
      title: "Transactions",
      value: "1,234",
      icon: <CreditCard className="h-5 w-5" />,
      trend: 8.2,
      color: "blue" as const
    },
    {
      title: "Active Users",
      value: "8,901",
      icon: <Users className="h-5 w-5" />,
      trend: -2.1,
      color: "purple" as const
    },
    {
      title: "Success Rate",
      value: "98.5%",
      icon: <TrendingUp className="h-5 w-5" />,
      trend: 0.8,
      color: "yellow" as const
    }
  ]

  const mockTransactions = [
    {
      id: "txn_123456789",
      amount: 299.99,
      status: "success",
      customer: "John Doe",
      created_at: "2024-01-15T10:30:00Z"
    },
    {
      id: "txn_123456790",
      amount: 149.99,
      status: "pending",
      customer: "Jane Smith",
      created_at: "2024-01-15T09:15:00Z"
    },
    {
      id: "txn_123456791",
      amount: 599.99,
      status: "success",
      customer: "Mike Johnson",
      created_at: "2024-01-14T16:45:00Z"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            color={stat.color}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <RevenueOverview analytics={[]} />
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
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Latest payment activities and their status
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <TransactionsTable transactions={mockTransactions} />
      </div>

      {/* Performance Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Credit Cards</span>
              <Badge variant="secondary">65%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">UPI</span>
              <Badge variant="secondary">25%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bank Transfer</span>
              <Badge variant="secondary">10%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Transaction Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Successful</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">98.5%</span>
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Failed</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">1.2%</span>
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">0.3%</span>
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top Performing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Peak Hours</span>
              <span className="text-sm font-medium">2-4 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Best Day</span>
              <span className="text-sm font-medium">Tuesday</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Avg. Amount</span>
              <span className="text-sm font-medium">$245</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}