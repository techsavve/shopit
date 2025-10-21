"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { useAccount } from "@/hooks/account/account"
import { ICreateAccountConfiguration, createAccountConfigurationSchema } from "@/lib/types/request/account"
import { getSpecificError } from "@/lib/helpers/error_handler"
import { WebhookHoverCard } from "@/components/modal/webhook-tooltip"
import { Settings, Link, Wallet, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const supportedChains = [
  { value: "BSC", label: "Binance Smart Chain", icon: "🔗" },
  { value: "Ton", label: "TON", icon: "⚡" },
]

export function AccountConfigurationForm() {
  const { onboarding, isProgressLoading, setOnboarding, errors } = useAccount()

  const form = useForm<ICreateAccountConfiguration>({
    resolver: zodResolver(createAccountConfigurationSchema),
    defaultValues: {
      webhook_url: onboarding?.webhook_url ?? "",
      supported_chains: onboarding?.supported_chains ?? [],
      wallet_addresses: onboarding?.wallet_addresses,
    },
  })

  const { control, register, handleSubmit, formState, watch } = form
  const selectedChains = watch("supported_chains") || [] as ("BSC" | "Ton")[]

  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto">
        <form id="onboarding-form-configure" onSubmit={handleSubmit((data) => setOnboarding("confirm", data))} className="space-y-6">
          {/* Blockchain Networks */}
          <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Blockchain Networks</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Select the networks you want to accept payments on</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Supported Networks
                </Label>
                <div className="space-y-2">
                  {supportedChains.map((chain) => {
                    const isSelected = selectedChains.includes(chain.value as "BSC" | "Ton")
                    return (
                      <div
                        key={chain.value}
                        className={cn(
                          "relative flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all",
                          isSelected
                            ? "border-[#00BCD4] bg-[#00BCD4]/5"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        )}
                        onClick={() => {
                          const newChains = isSelected
                            ? selectedChains.filter(c => c !== chain.value)
                            : [...selectedChains, chain.value as "BSC" | "Ton"]
                          form.setValue("supported_chains", newChains)
                        }}
                      >
                        <div className="flex items-start space-x-2 flex-1">
                          <div className={cn(
                            "mt-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center",
                            isSelected
                              ? "border-[#00BCD4]"
                              : "border-slate-300 dark:border-slate-600"
                          )}>
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-[#00BCD4]" />
                            )}
                          </div>
                          <span className="text-lg">{chain.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
                              {chain.label}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Accept USDT payments on {chain.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {formState.errors.supported_chains && (
                  <p className="text-xs text-red-600">{formState.errors.supported_chains.message}</p>
                )}
              </div>
            </div>

            {/* Wallet Addresses */}
            {selectedChains.length > 0 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Wallet Addresses</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Enter your USDT wallet address for each network</p>
                </div>
                
                <div className="space-y-3">
                  {selectedChains.map((chain) => (
                    <div key={chain} className="space-y-1.5">
                      <Label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center">
                        <span className="text-sm mr-1.5">{supportedChains.find(c => c.value === chain)?.icon}</span>
                        {supportedChains.find(c => c.value === chain)?.label} Wallet Address
                      </Label>
                      <Input
                        placeholder={`Enter ${chain} USDT wallet address`}
                        className="h-8 font-mono text-xs"
                        {...register(`wallet_addresses.${chain}`)}
                      />
                      {formState.errors.wallet_addresses?.[chain] && (
                        <p className="text-xs text-red-600">{formState.errors.wallet_addresses[chain]?.message}</p>
                      )}
                      {getSpecificError("wallet_addresses", errors) && (
                        <p className="text-xs text-red-600">{getSpecificError("wallet_addresses", errors)}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Webhook Configuration */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Webhook Configuration</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receive real-time payment notifications</p>
              </div>
              
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Webhook URL
                </Label>
                <Input
                  placeholder="https://yourdomain.com/api/webhooks"
                  className="h-8 text-sm"
                  {...register("webhook_url")}
                />
                {formState.errors.webhook_url && (
                  <p className="text-xs text-red-600">{formState.errors.webhook_url.message}</p>
                )}
                <div className="pt-1">
                  <WebhookHoverCard />
                </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

