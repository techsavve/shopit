import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type StatCardProps = {
  title: string
  value: string
  icon: React.ReactNode
  trend: number
  color: "blue" | "green" | "purple" | "yellow"
}

const colorMap = {
  blue: "from-blue-50 to-blue-100 text-blue-700",
  green: "from-green-50 to-green-100 text-green-700",
  purple: "from-purple-50 to-purple-100 text-purple-700",
  yellow: "from-yellow-50 to-yellow-100 text-yellow-700",
}

export const StatCard = ({ title, value, icon, trend, color }: StatCardProps) => {
  const positive = trend >= 0
  
  // Darken borders for specific cards
  const shouldDarkenBorder = ["Total Transactions", "Success Rate", "Total Revenue", "Pending Transactions"].includes(title)
  
  return (
    <Card className={`hover:shadow-lg transition-all duration-200 rounded-xl bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50 ${
      shouldDarkenBorder 
        ? 'border-2 border-gray-300 dark:border-gray-600' 
        : 'border border-gray-200 dark:border-gray-700'
    }`}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide">{title}</CardTitle>
        <div
          className={`rounded-lg p-2.5 bg-gradient-to-br ${colorMap[color]} shadow-sm`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">{value}</div>
        <p className="text-xs flex items-center gap-1.5">
          {positive ? (
            <ArrowUpRight className="h-3 w-3 text-green-600" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-600" />
          )}
          <span className={`font-medium ${positive ? "text-green-600" : "text-red-600"}`}>
            {positive ? `+${trend}%` : `${trend}%`}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </p>
      </CardContent>
    </Card>
  )
}
