"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Copy, Check, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface ResponseViewerProps {
    response: Record<string, unknown> | null
    error?: string | null
    isLoading?: boolean
    className?: string
}

export function ResponseViewer({
    response,
    error,
    isLoading = false,
    className
}: ResponseViewerProps) {
    const [copied, setCopied] = useState(false)
    const [expanded, setExpanded] = useState(true)

    const copyToClipboard = async () => {
        if (!response) return
        await navigator.clipboard.writeText(JSON.stringify(response, null, 2))
        setCopied(true)
        toast.success("Response copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const hasStatus = response && "status" in response

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-base">Response</CardTitle>
                        {response && hasStatus && (
                            <Badge
                                variant={response.status ? "default" : "destructive"}
                                className="gap-1"
                            >
                                {response.status ? (
                                    <CheckCircle2 className="h-3 w-3" />
                                ) : (
                                    <AlertCircle className="h-3 w-3" />
                                )}
                                {response.status ? "Success" : "Error"}
                            </Badge>
                        )}
                        {error && (
                            <Badge variant="destructive" className="gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Error
                            </Badge>
                        )}
                    </div>
                    <div className="flex gap-1">
                        {response && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={copyToClipboard}
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>
                <CardDescription>
                    View the API response from your request
                </CardDescription>
            </CardHeader>

            {expanded && (
                <CardContent>
                    {isLoading ? (
                        <div className="h-32 flex items-center justify-center">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                <span>Waiting for response...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-sm text-red-800 dark:text-red-200">
                                {error}
                            </p>
                        </div>
                    ) : response ? (
                        <pre className="bg-slate-950 text-slate-50 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                            <code>{JSON.stringify(response, null, 2)}</code>
                        </pre>
                    ) : (
                        <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
                            <p className="text-muted-foreground text-sm">
                                Send a request to see the response here
                            </p>
                        </div>
                    )}
                </CardContent>
            )}
        </Card>
    )
}
