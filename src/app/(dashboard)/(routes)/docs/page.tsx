// app/(dashboard)/(routes)/docs/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CodeBlock } from '@/components/ui/code-block'
import { 
  CreditCard, 
  Zap, 
  Webhook, 
  Shield, 
  Smartphone, 
  Globe, 
  ChevronRight,
  BookOpen,
  Code2,
  Settings,
  Users
} from 'lucide-react'
import Link from 'next/link'

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          ZyPay <span className="text-primary">Developer</span> Documentation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Build powerful payment solutions with our comprehensive API, SDKs, and developer tools
        </p>
        
        {/* Quick Start Code */}
        <div className="max-w-2xl mx-auto">
          <CodeBlock
            title="Quick Start"
            language="bash"
            code="npm install @zypay/sdk"
          />
        </div>
      </div>

      {/* Main Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DocSection
          icon={Zap}
          title="Getting Started"
          description="Quick setup and your first payment integration"
          href="/docs/getting-started"
          badge="Popular"
          color="blue"
        />
        
        <DocSection
          icon={CreditCard}
          title="Payment APIs"
          description="Process payments, subscriptions, and refunds"
          href="/docs/payments"
          color="green"
        />
        
        <DocSection
          icon={Smartphone}
          title="Mobile SDKs"
          description="iOS and Android integration guides"
          href="/docs/mobile"
          color="purple"
        />
        
        <DocSection
          icon={Webhook}
          title="Webhooks"
          description="Real-time event notifications and handling"
          href="/docs/webhooks"
          color="orange"
        />
        
        <DocSection
          icon={Shield}
          title="Security"
          description="Authentication, encryption, and compliance"
          href="/docs/security"
          color="red"
        />
        
        <DocSection
          icon={Globe}
          title="Web Integration"
          description="JavaScript SDK and payment forms"
          href="/docs/web"
          color="teal"
        />
      </div>

      {/* API Groups */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">API Groups</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ZyPay APIs work together like building blocks for any payment solution
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ApiGroup
            icon={CreditCard}
            title="Payments"
            description="Process payments on any device or platform"
            apis={[
              { name: "Payment API", description: "Create and manage payments" },
              { name: "Refund API", description: "Process refunds and voids" },
              { name: "Subscription API", description: "Recurring billing management" }
            ]}
          />
          
          <ApiGroup
            icon={Users}
            title="Customers"
            description="Manage customer data and relationships"
            apis={[
              { name: "Customer API", description: "Customer profiles and data" },
              { name: "Loyalty API", description: "Reward programs and points" },
              { name: "Gift Cards API", description: "Digital gift card management" }
            ]}
          />
        </div>
      </div>

      {/* Development Tools */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Development Tools</h2>
          <p className="text-muted-foreground">
            Get up and running faster with our developer tools
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ToolCard
            icon={Code2}
            title="API Explorer"
            description="Test and examine endpoint behaviors with our interactive API explorer"
            href="/docs/api-explorer"
          />
          
          <ToolCard
            icon={Settings}
            title="Developer Console"
            description="Manage your application settings, API keys, and webhook configurations"
            href="/docs/console"
          />
        </div>
      </div>
    </div>
  )
}

function DocSection({
  icon: Icon,
  title,
  description,
  href,
  badge,
  color = "blue"
}: {
  icon: any
  title: string
  description: string
  href: string
  badge?: string
  color?: "blue" | "green" | "purple" | "orange" | "red" | "teal"
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    teal: "bg-teal-100 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400"
  }

  return (
    <Link href={href}>
      <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
              <Icon className="h-6 w-6" />
            </div>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
            Get started
            <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function ApiGroup({
  icon: Icon,
  title,
  description,
  apis
}: {
  icon: any
  title: string
  description: string
  apis: Array<{ name: string; description: string }>
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {apis.map((api, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
              <div>
                <h4 className="font-medium text-sm">{api.name}</h4>
                <p className="text-xs text-muted-foreground">{api.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ToolCard({
  icon: Icon,
  title,
  description,
  href
}: {
  icon: any
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <Card className="group hover:shadow-lg transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {description}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}