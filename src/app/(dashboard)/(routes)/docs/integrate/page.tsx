"use client"

import { useState } from "react"
import { Stepper } from "@/components/ui/stepper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/ui/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiKeyCard } from "./_components/api-key-card"
import { useAccount } from "@/hooks/account/account"
import {
    Key,
    Download,
    Settings,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Sparkles,
    Terminal,
    Rocket
} from "lucide-react"
import Link from "next/link"

const steps = [
    { title: "Get API Keys", description: "Copy your credentials" },
    { title: "Install SDK", description: "Add to your project" },
    { title: "Configure", description: "Initialize & test" },
]

export default function IntegratePage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [environment, setEnvironment] = useState<"sandbox" | "production">("sandbox")
    const { account } = useAccount()

    const apiInfo = environment === "production" ? account?.api_info : account?.sandbox_info

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <Badge variant="outline" className="gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    Quick Integration
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Integrate <span className="text-primary">ZyPay SDK</span>
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    Follow these 3 simple steps to start accepting payments in your application
                </p>
            </div>

            {/* Stepper */}
            <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
                className="py-4"
            />

            {/* Step Content */}
            <div className="min-h-[400px]">
                {/* Step 1: API Keys */}
                {currentStep === 0 && (
                    <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Key className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Get Your API Keys</CardTitle>
                                    <CardDescription>
                                        Copy your credentials to authenticate SDK requests
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Environment Toggle */}
                            <Tabs value={environment} onValueChange={(v) => setEnvironment(v as "sandbox" | "production")}>
                                <TabsList className="grid w-full max-w-xs grid-cols-2">
                                    <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
                                    <TabsTrigger value="production">Production</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            {apiInfo ? (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <ApiKeyCard
                                        label="Access Token"
                                        value={apiInfo.access_token}
                                        description="Used for API authentication"
                                        environment={environment}
                                    />
                                    <ApiKeyCard
                                        label="Public Key"
                                        value={apiInfo.public_key}
                                        description="Safe to expose client-side"
                                        environment={environment}
                                    />
                                    <ApiKeyCard
                                        label="Secret Key"
                                        value={apiInfo.secret_key}
                                        description="Keep this secure on server-side"
                                        isSecret
                                        environment={environment}
                                        className="md:col-span-2"
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>Loading credentials...</p>
                                </div>
                            )}

                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    ⚠️ <strong>Security Notice:</strong> Never expose your secret key in client-side code.
                                    Use environment variables on your server.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Install SDK */}
                {currentStep === 1 && (
                    <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                    <Download className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <CardTitle>Install the SDK</CardTitle>
                                    <CardDescription>
                                        Add ZyPay SDK to your project using your preferred package manager
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Tabs defaultValue="npm">
                                <TabsList>
                                    <TabsTrigger value="npm">npm</TabsTrigger>
                                    <TabsTrigger value="yarn">yarn</TabsTrigger>
                                    <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                                    <TabsTrigger value="bun">bun</TabsTrigger>
                                </TabsList>
                                <TabsContent value="npm" className="mt-4">
                                    <CodeBlock language="bash" code="npm install @zypay/sdk" />
                                </TabsContent>
                                <TabsContent value="yarn" className="mt-4">
                                    <CodeBlock language="bash" code="yarn add @zypay/sdk" />
                                </TabsContent>
                                <TabsContent value="pnpm" className="mt-4">
                                    <CodeBlock language="bash" code="pnpm add @zypay/sdk" />
                                </TabsContent>
                                <TabsContent value="bun" className="mt-4">
                                    <CodeBlock language="bash" code="bun add @zypay/sdk" />
                                </TabsContent>
                            </Tabs>

                            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                                <Terminal className="h-5 w-5 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">TypeScript Support</p>
                                    <p className="text-sm text-muted-foreground">
                                        The SDK includes TypeScript definitions out of the box. No additional types package needed.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Step 3: Configure */}
                {currentStep === 2 && (
                    <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                    <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <CardTitle>Initialize & Configure</CardTitle>
                                    <CardDescription>
                                        Set up the SDK client and make your first payment request
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="font-medium mb-3">1. Initialize the SDK</h4>
                                <CodeBlock
                                    language="typescript"
                                    code={`import { ZyPaySDK } from '@zypay/sdk'

const zypay = new ZyPaySDK({
  accessToken: '${apiInfo?.access_token || 'your_access_token'}',
  publicKey: '${apiInfo?.public_key || 'your_public_key'}',
  environment: '${environment}',
})`}
                                />
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">2. Get Available Payment Options</h4>
                                <CodeBlock
                                    language="typescript"
                                    code={`// Get supported blockchains and packages
const options = await zypay.payments.getOptions()
console.log(options.blockchains) // ['BSC', 'Ton']
console.log(options.packages)    // Package details for 'multiple' type`}
                                />
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">3. Process a Payment</h4>
                                <CodeBlock
                                    language="typescript"
                                    code={`// Create a payment transaction
const payment = await zypay.payments.process({
  email: 'customer@example.com',
  blockchain: 'BSC',
  package_name: 'pro' // Required for 'multiple' package type
})

console.log('Payment ID:', payment.id)
console.log('Status:', payment.status)
console.log('Wallet Address:', payment.user.address)`}
                                />
                            </div>

                            {/* Success State */}
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                <h3 className="font-semibold text-lg mb-2">You&apos;re all set!</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Your integration is ready. Test it in the playground before going live.
                                </p>
                                <Button asChild>
                                    <Link href="/docs/playground">
                                        <Rocket className="mr-2 h-4 w-4" />
                                        Open Playground
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                {currentStep < steps.length - 1 ? (
                    <Button onClick={nextStep}>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button asChild>
                        <Link href="/docs/playground">
                            Test Integration
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}
