"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaygroundForm } from "./_components/playground-form"
import { ResponseViewer } from "./_components/response-viewer"
import { useAccount } from "@/hooks/account/account"
import { CodeBlock } from "@/components/ui/code-block"
import {
    Beaker,
    Zap,
    BookOpen,
    ArrowLeft,
    Terminal,
    Wifi,
    WifiOff
} from "lucide-react"
import Link from "next/link"

interface PaymentResponse {
    status: boolean
    data?: {
        id: string
        status: string
        blockchain: string
        created_at: string
        user: {
            email: string
            address: string
        }
        account: {
            wallet_address: string
        }
    }
    message?: string
}

export default function PlaygroundPage() {
    const [environment, setEnvironment] = useState<"sandbox" | "production">("sandbox")
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<PaymentResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [lastRequest, setLastRequest] = useState<Record<string, unknown> | null>(null)
    const { account } = useAccount()

    const apiInfo = environment === "production" ? account?.api_info : account?.sandbox_info
    const baseUrl = environment === "production"
        ? "https://api.zypay.com"
        : "https://sandbox.api.zypay.com"

    const handleSubmit = async (data: { email: string; blockchain: "BSC" | "Ton"; package_name?: string }) => {
        setIsLoading(true)
        setError(null)
        setLastRequest(data as Record<string, unknown>)

        // Simulate API call for demo purposes
        // In production, this would call the actual SDK endpoint
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Mock response matching the actual API structure
            const mockResponse: PaymentResponse = {
                status: true,
                data: {
                    id: `tx_${Math.random().toString(36).substr(2, 9)}`,
                    status: "pending",
                    blockchain: data.blockchain,
                    created_at: new Date().toISOString(),
                    user: {
                        email: data.email,
                        address: `0x${Math.random().toString(16).substr(2, 40)}`,
                    },
                    account: {
                        wallet_address: `0x${Math.random().toString(16).substr(2, 40)}`,
                    },
                },
            }

            setResponse(mockResponse)
        } catch (err) {
            setError("Failed to process payment. Please try again.")
            setResponse(null)
        } finally {
            setIsLoading(false)
        }
    }

    const generatedCode = lastRequest ? `
const payment = await zypay.payments.process({
  email: '${lastRequest.email}',
  blockchain: '${lastRequest.blockchain}',${lastRequest.package_name ? `\n  package_name: '${lastRequest.package_name}',` : ''}
})

console.log('Transaction ID:', payment.id)
console.log('Status:', payment.status)
`.trim() : null

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1.5">
                            <Beaker className="h-3 w-3" />
                            Playground
                        </Badge>
                        <Badge
                            variant={environment === "sandbox" ? "secondary" : "default"}
                            className="gap-1.5"
                        >
                            {environment === "sandbox" ? (
                                <Wifi className="h-3 w-3" />
                            ) : (
                                <Zap className="h-3 w-3" />
                            )}
                            {environment}
                        </Badge>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        SDK Playground
                    </h1>
                    <p className="text-muted-foreground">
                        Test your SDK integration with live API requests
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/docs/integrate">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Setup
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/docs/api-reference">
                            <BookOpen className="mr-2 h-4 w-4" />
                            API Docs
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Environment Toggle */}
            <Tabs value={environment} onValueChange={(v) => setEnvironment(v as "sandbox" | "production")}>
                <TabsList>
                    <TabsTrigger value="sandbox" className="gap-2">
                        <Wifi className="h-4 w-4" />
                        Sandbox
                    </TabsTrigger>
                    <TabsTrigger value="production" className="gap-2">
                        <Zap className="h-4 w-4" />
                        Production
                    </TabsTrigger>
                </TabsList>
                <p className="text-xs text-muted-foreground mt-2">
                    {environment === "sandbox"
                        ? "Safe testing environment. No real transactions."
                        : "⚠️ Production mode. Real transactions will be processed."}
                </p>
            </Tabs>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Request Form */}
                <div className="space-y-6">
                    <PlaygroundForm
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        packageType={account?.details?.package_type}
                        packages={account?.details?.packages?.map(p => ({
                            name: p.name,
                            subscription_fee: p.subscription_fee
                        }))}
                    />

                    {/* Connection Status */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Terminal className="h-4 w-4" />
                                API Connection
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Endpoint</span>
                                    <code className="text-xs bg-muted px-2 py-0.5 rounded">{baseUrl}/sdk/payments/process</code>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Environment</span>
                                    <Badge variant="outline" className="text-xs">{environment}</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Status</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-green-600 dark:text-green-400 text-xs">Connected</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Response */}
                <div className="space-y-6">
                    <ResponseViewer
                        response={response as unknown as Record<string, unknown>}
                        error={error}
                        isLoading={isLoading}
                    />

                    {/* Generated Code */}
                    {generatedCode && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-medium">Generated Code</CardTitle>
                                <CardDescription>
                                    Copy this code to use in your application
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CodeBlock
                                    language="typescript"
                                    code={generatedCode}
                                />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Quick Tips */}
            <Card className="bg-muted/30">
                <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg h-fit">
                                <Beaker className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Sandbox Mode</h4>
                                <p className="text-xs text-muted-foreground">
                                    Test freely without real transactions
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg h-fit">
                                <Terminal className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Copy Code</h4>
                                <p className="text-xs text-muted-foreground">
                                    Get ready-to-use code snippets
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg h-fit">
                                <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Instant Feedback</h4>
                                <p className="text-xs text-muted-foreground">
                                    See responses in real-time
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
