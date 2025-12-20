"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Copy, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface ApiKeyCardProps {
    label: string
    value: string
    description?: string
    isSecret?: boolean
    environment?: "sandbox" | "production"
    className?: string
}

export function ApiKeyCard({
    label,
    value,
    description,
    isSecret = false,
    environment,
    className
}: ApiKeyCardProps) {
    const [copied, setCopied] = useState(false)
    const [visible, setVisible] = useState(!isSecret)

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        toast.success(`${label} copied to clipboard`)
        setTimeout(() => setCopied(false), 2000)
    }

    const displayValue = visible ? value : value.replace(/./g, "•")

    return (
        <Card className={cn("group transition-all hover:shadow-md", className)}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{label}</CardTitle>
                    {environment && (
                        <Badge
                            variant={environment === "production" ? "default" : "secondary"}
                            className="text-xs"
                        >
                            {environment}
                        </Badge>
                    )}
                </div>
                {description && (
                    <CardDescription className="text-xs">{description}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted/50 px-3 py-2 rounded-md text-xs font-mono truncate">
                        {displayValue}
                    </code>
                    <div className="flex gap-1">
                        {isSecret && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setVisible(!visible)}
                            >
                                {visible ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        )}
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
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
