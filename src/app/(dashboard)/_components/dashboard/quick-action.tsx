import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, DollarSign, BookOpen, LifeBuoy, Plus, Download, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";

export const QuickActions = () => (
  <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
    <CardHeader className="pb-4">
      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</CardTitle>
      <p className="text-sm text-muted-foreground">Common tasks and shortcuts</p>
    </CardHeader>
    <CardContent className="space-y-3">
      {[
        { 
          icon: <Plus className="h-5 w-5" />, 
          label: "New Transaction", 
          description: "Create a new payment",
          href: "/transactions/new",
          color: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
        },
        { 
          icon: <Download className="h-5 w-5" />, 
          label: "Generate Report", 
          description: "Download analytics",
          href: "/reports",
          color: "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
        },
        { 
          icon: <FileText className="h-5 w-5" />, 
          label: "View Docs", 
          description: "API documentation",
          href: "/docs",
          color: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
        },
        { 
          icon: <HelpCircle className="h-5 w-5" />, 
          label: "Support", 
          description: "Get help",
          href: "/support",
          color: "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800"
        },
      ].map((action) => (
        <Link key={action.label} href={action.href}>
          <Button
            variant="ghost"
            className="w-full h-auto p-4 justify-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-xl"
          >
            <div className={`rounded-lg p-2 border ${action.color}`}>
              {action.icon}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium text-sm text-gray-900 dark:text-white">{action.label}</div>
              <div className="text-xs text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        </Link>
      ))}
    </CardContent>
  </Card>
)