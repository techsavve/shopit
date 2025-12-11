"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAccount } from "@/hooks/account/account"
import { ICreateAccountConfiguration, createAccountConfigurationSchema } from "@/lib/types/request/account"
import { getSpecificError } from "@/lib/helpers/error_handler"
import { WebhookSetupGuide } from "@/components/webhook/webhook-setup-guide"
import { cn } from "@/lib/utils"

const supportedChains = [
  { value: "BSC", label: "Binance Smart Chain", icon: "🔗" },
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

  const { control, register, handleSubmit, formState, watch, setValue } = form
  const selectedChains = watch("supported_chains") || [] as ("BSC" | "Ton")[]
  const webhookUrl = watch("webhook_url")

  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto">
        <form id="onboarding-form-configure" onSubmit={handleSubmit((data) => setOnboarding("confirm", data))} className="space-y-8">
          {/* Blockchain Networks Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Blockchain Networks</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select the networks you want to accept payments on</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                Supported Networks
              </Label>
              <div className="space-y-2">
                {supportedChains.map((chain) => {
                  const isSelected = selectedChains.includes(chain.value as "BSC")
                  return (
                    <div
                      key={chain.value}
                      className={cn(
                        "relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                        isSelected
                          ? "border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/20"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      )}
                      onClick={() => {
                        const newChains = isSelected
                          ? selectedChains.filter(c => c !== chain.value)
                          : [...selectedChains, chain.value as "BSC"]
                        form.setValue("supported_chains", newChains)
                      }}
                    >
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={cn(
                          "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected
                            ? "border-cyan-500 bg-cyan-500"
                            : "border-slate-300 dark:border-slate-600"
                        )}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xl">{chain.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-medium transition-colors",
                            isSelected ? "text-cyan-700 dark:text-cyan-400" : "text-slate-900 dark:text-slate-100"
                          )}>
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

          {/* Wallet Addresses Section */}
          {selectedChains.length > 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Wallet Addresses</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Enter your USDT wallet address for each network</p>
              </div>
              
              <div className="space-y-3">
                {selectedChains.map((chain) => (
                  <div key={chain} className="space-y-2">
                    <Label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center">
                      <span className="text-base mr-2">{supportedChains.find(c => c.value === chain)?.icon}</span>
                      {supportedChains.find(c => c.value === chain)?.label} USDT Wallet
                    </Label>
                    <Input
                      placeholder={`Enter ${chain} USDT wallet address`}
                      className="h-10 font-mono text-sm"
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

          {/* Webhook Configuration - Using WebhookSetupGuide */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Webhook Configuration</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Receive real-time payment notifications on your server</p>
            </div>
            
            <Controller
              name="webhook_url"
              control={control}
              render={({ field }) => (
                <WebhookSetupGuide
                  value={field.value}
                  onChange={field.onChange}
                  error={formState.errors.webhook_url?.message}
                />
              )}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
