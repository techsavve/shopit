"use client"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAccount } from "@/hooks/account/account"
import { useMerchant } from "@/hooks/merchant/merchant"
import * as React from "react"

export const CreateAccountSuccess = ({ onClose }: { onClose: () => void }) => {
  const { account, setOnboarding } = useAccount()
  const { getMe } = useMerchant()
  const [isSecretVisible, setIsSecretVisible] = React.useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const renderCredentials = (label: string, info: any, env: "production" | "sandbox") => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
      <p className="text-xs text-gray-500 italic">
        Use these credentials only in the <strong>{env}</strong> environment. Never expose them publicly or commit to version control.
      </p>

      <div>
        <label className="text-sm font-medium text-gray-700">Access Token</label>
        <div className="flex gap-2 mt-1">
          <Input value={info.access_token} readOnly className="flex-1" />
          <Button variant="outline" onClick={() => copyToClipboard(info.access_token)}>
            Copy
          </Button>
        </div>
        <p className="mt-1 text-xs text-yellow-600">
          ⚠️ Keep this access token safe. It authorizes access to your APIs.
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Secret Key</label>
        <div className="flex gap-2 mt-1">
          <Input
            type={isSecretVisible ? "text" : "password"}
            value={info.secret_key}
            readOnly
            className="flex-1"
          />
          <Button variant="outline" onClick={() => setIsSecretVisible(!isSecretVisible)}>
            {isSecretVisible ? "Hide" : "Show"}
          </Button>
          <Button variant="outline" onClick={() => copyToClipboard(info.secret_key)}>
            Copy
          </Button>
        </div>
        <p className="mt-1 text-xs text-red-600">
          ⚠️ This secret key is shown only once. Store it securely in a secret manager or `.env` file. Never share or expose this key.
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Webhook URL</label>
        <div className="flex gap-2 mt-1">
          <Input value={info.webhook_url} readOnly className="flex-1" />
          <Button variant="outline" onClick={() => copyToClipboard(info.webhook_url)}>
            Copy
          </Button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          🔗 This is the callback URL where your application receives event notifications (e.g., payments, updates).
        </p>
      </div>
    </div>
  )

  return (
    <div>
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Account Created Successfully!</h2>
        <p className="mt-1 text-sm text-gray-600">
          Save your credentials now. Secret keys are only shown once and cannot be retrieved later.
        </p>
        <p className="mt-1 text-xs text-red-500">
          ⚠️ Never commit these credentials to source control or expose them publicly.
        </p>
      </div>

      <div className="space-y-8 py-4 h-[445px] overflow-y-auto">
        {renderCredentials("🔐 Production Credentials", account?.api_info, "production")}
        {renderCredentials("🧪 Sandbox Credentials", account?.sandbox_info, "sandbox")}
      </div>

      <DialogFooter className="mt-4">
        <Button onClick={() => getMe().then(() => setOnboarding(undefined))}>Done</Button>
      </DialogFooter>
    </div>
  )
}
