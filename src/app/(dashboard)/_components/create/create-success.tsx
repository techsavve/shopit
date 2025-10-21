"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAccount } from "@/hooks/account/account"
import { useMerchant } from "@/hooks/merchant/merchant"
import { Icons } from "@/components/icons"
import * as React from "react"
import { CheckCircle, Copy, Eye, EyeOff, Shield, AlertTriangle, ExternalLink, Download } from "lucide-react"
import { toast } from "sonner"

export const CreateAccountSuccess = ({ onClose }: { onClose: () => void }) => {
  const { account, setOnboarding } = useAccount()
  const { getMe } = useMerchant()
  const [isSecretVisible, setIsSecretVisible] = React.useState(false)
  const [copiedItems, setCopiedItems] = React.useState<Set<string>>(new Set())

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedItems(prev => new Set(prev).add(label))
    toast.success(`${label} copied to clipboard`)
    setTimeout(() => {
      setCopiedItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(label)
        return newSet
      })
    }, 2000)
  }

  const renderCredentials = (label: string, info: any, env: "production" | "sandbox", icon: React.ReactNode) => (
    <Card className="border border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5">
            {icon}
            <span className="font-semibold">{label}</span>
            <Badge variant={env === "production" ? "default" : "secondary"} className="text-[10px] py-0 px-1.5">
              {env === "production" ? "Live" : "Test"}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {/* Access Token */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">
            Access Token
          </Label>
          <div className="flex gap-1.5">
            <Input 
              value={info.access_token} 
              readOnly 
              className="flex-1 font-mono text-[10px] h-7" 
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(info.access_token, `${env} Access Token`)}
              className="h-7 w-7 p-0"
            >
              {copiedItems.has(`${env} Access Token`) ? (
                <CheckCircle className="w-2.5 h-2.5 text-green-600" />
              ) : (
                <Copy className="w-2.5 h-2.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Secret Key */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">
            Secret Key
          </Label>
          <div className="flex gap-1.5">
            <Input
              type={isSecretVisible ? "text" : "password"}
              value={info.secret_key}
              readOnly
              className="flex-1 font-mono text-[10px] h-7"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsSecretVisible(!isSecretVisible)}
              className="h-7 w-7 p-0"
            >
              {isSecretVisible ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(info.secret_key, `${env} Secret Key`)}
              className="h-7 w-7 p-0"
            >
              {copiedItems.has(`${env} Secret Key`) ? (
                <CheckCircle className="w-2.5 h-2.5 text-green-600" />
              ) : (
                <Copy className="w-2.5 h-2.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Webhook URL */}
        <div className="space-y-1">
          <Label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">
            Webhook URL
          </Label>
          <div className="flex gap-1.5">
            <Input 
              value={info.webhook_url} 
              readOnly 
              className="flex-1 font-mono text-[10px] h-7" 
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(info.webhook_url, `${env} Webhook URL`)}
              className="h-7 w-7 p-0"
            >
              {copiedItems.has(`${env} Webhook URL`) ? (
                <CheckCircle className="w-2.5 h-2.5 text-green-600" />
              ) : (
                <Copy className="w-2.5 h-2.5" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Account Created Successfully!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Your account has been set up. Save these credentials securely.
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Important: Save Your Credentials Now</p>
            <p>Secret keys are only shown once and cannot be retrieved later. Store them securely in environment variables or a secret manager.</p>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderCredentials(
            "Production", 
            account?.api_info, 
            "production",
            <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center">
              <Shield className="w-2.5 h-2.5 text-white" />
            </div>
          )}
          
          {renderCredentials(
            "Sandbox", 
            account?.sandbox_info, 
            "sandbox",
            <div className="w-5 h-5 bg-blue-500 rounded-md flex items-center justify-center">
              <Shield className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-center items-center pt-4">
          <Button
            onClick={() => getMe().then(() => setOnboarding(undefined))}
            className="h-8 px-6 text-sm bg-[#00BCD4] hover:bg-[#00BCD4]/90"
          >
            <CheckCircle className="w-3 h-3 mr-1.5" />
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  )
}
