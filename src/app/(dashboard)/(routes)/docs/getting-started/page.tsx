// app/(dashboard)/(routes)/docs/getting-started/page.tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { 
  Terminal, 
  Rocket, 
  Code, 
  Settings, 
  Zap, 
  CheckCircle,
  ExternalLink,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

export default function GetStartedPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-8">
        <Badge variant="outline" className="mb-4">
          <Rocket className="w-3 h-3 mr-2" />
          Getting Started
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-primary">ZyPay SDK</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Start integrating seamless payment processing into your application with our powerful SDK. 
          Get up and running in minutes.
        </p>
      </div>

      {/* Quick Start Steps */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Quick Start</h2>
        
        {/* Step 1 */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <CardTitle className="text-xl">Install the SDK</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Install the ZyPay SDK using your preferred package manager:
            </p>
            <div className="space-y-3">
              <CodeBlock
                title="npm"
                language="bash"
                code="npm install @zypay/sdk"
              />
              <CodeBlock
                title="yarn"
                language="bash"
                code="yarn add @zypay/sdk"
              />
              <CodeBlock
                title="pnpm"
                language="bash"
                code="pnpm add @zypay/sdk"
              />
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <CardTitle className="text-xl">Initialize the Client</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Create a new ZyPay client with your API credentials:
            </p>
            <CodeBlock
              title="JavaScript/TypeScript"
              language="typescript"
              code={`import { ZyPaySDK } from '@zypay/sdk'

const client = new ZyPaySDK({
  apiKey: 'your_api_key_here',
  environment: 'sandbox', // or 'production'
  webhookSecret: 'your_webhook_secret' // optional
})

// Test the connection
const health = await client.health.check()
console.log('SDK Status:', health.status)`}
            />
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <CardTitle className="text-xl">Make Your First Payment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Process a simple payment with just a few lines of code:
            </p>
            <CodeBlock
              title="Create Payment"
              language="typescript"
              code={`// Create a new payment
const payment = await client.payments.create({
  amount: {
    value: 1000, // $10.00 in cents
    currency: 'USD'
  },
  customer: {
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe'
  },
  description: 'Test payment',
  metadata: {
    orderId: 'order_123',
    source: 'website'
  }
})

console.log('Payment created:', payment.id)
console.log('Status:', payment.status)

// Handle payment completion
if (payment.status === 'completed') {
  console.log('Payment successful!')
}`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">What's Next?</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete documentation of all available methods, parameters, and responses
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/docs/api-reference">
                  Explore APIs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
                <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Set up real-time notifications for payment events and status changes
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/docs/webhooks">
                  Configure Webhooks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ready-to-use code snippets and integration examples for common scenarios
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                <Link href="/docs/examples">
                  View Examples
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Important Alerts */}
      <div className="space-y-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Production Credentials</AlertTitle>
          <AlertDescription>
            Remember to switch to production API keys before going live. Sandbox keys will not process real payments. 
            Test thoroughly in the sandbox environment first.
          </AlertDescription>
        </Alert>

        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Need Help?</AlertTitle>
          <AlertDescription>
            Join our <Link href="/support" className="font-medium text-primary hover:underline">developer community</Link> or 
            {' '}<Link href="/contact" className="font-medium text-primary hover:underline">contact support</Link> if you encounter any issues.
            Check out our <Link href="/docs/troubleshooting" className="font-medium text-primary hover:underline">troubleshooting guide</Link> for common solutions.
          </AlertDescription>
        </Alert>
      </div>

      {/* SDK Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">SDK Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold">TypeScript Support</h3>
              <p className="text-sm text-muted-foreground">Full TypeScript definitions for better development experience</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold">Error Handling</h3>
              <p className="text-sm text-muted-foreground">Comprehensive error handling with detailed error messages</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold">Retry Logic</h3>
              <p className="text-sm text-muted-foreground">Automatic retry for failed requests with exponential backoff</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold">Webhook Verification</h3>
              <p className="text-sm text-muted-foreground">Built-in webhook signature verification for security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}