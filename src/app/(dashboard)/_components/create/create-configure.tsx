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
import { supportedChains, getTokensForChain, getDefaultToken, Token } from "@/lib/data/tokens"
import { ChevronDown, Check, Coins, Wallet, Link } from "lucide-react"

export function AccountConfigurationForm() {
  const { onboarding, isProgressLoading, setOnboarding, errors } = useAccount()

  const form = useForm<ICreateAccountConfiguration>({
    resolver: zodResolver(createAccountConfigurationSchema),
    defaultValues: {
      webhook_url: onboarding?.webhook_url ?? "",
      supported_chains: onboarding?.supported_chains ?? [],
      wallet_addresses: onboarding?.wallet_addresses,
      selected_tokens: onboarding?.selected_tokens,
    },
  })

  const { control, register, handleSubmit, formState, watch, setValue } = form
  const selectedChains = watch("supported_chains") || [] as ("BSC" | "Ton")[]
  const selectedTokens = watch("selected_tokens") || {}
  const webhookUrl = watch("webhook_url")

  // Track open dropdowns
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  // Auto-set default tokens when chains are selected
  React.useEffect(() => {
    selectedChains.forEach(chain => {
      if (!selectedTokens[chain]) {
        const defaultToken = getDefaultToken(chain)
        if (defaultToken) {
          setValue(`selected_tokens.${chain}`, {
            name: defaultToken.name,
            symbol: defaultToken.symbol,
            address: defaultToken.address,
          })
        }
      }
    })
  }, [selectedChains, selectedTokens, setValue])

  const handleTokenSelect = (chain: string, token: Token) => {
    setValue(`selected_tokens.${chain}`, {
      name: token.name,
      symbol: token.symbol,
      address: token.address,
    })
    setOpenDropdown(null)
  }

  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto">
        <form id="onboarding-form-configure" onSubmit={handleSubmit((data) => setOnboarding("confirm", data))} className="space-y-8">
          {/* Blockchain Networks Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                <Link className="w-4 h-4 text-cyan-500" />
                Blockchain Networks
              </h3>
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
                            {chain.description}
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

          {/* Token & Wallet Configuration Section */}
          {selectedChains.length > 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-cyan-500" />
                  Token & Wallet Configuration
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Select which token to accept and enter your wallet address for each network</p>
              </div>

              <div className="space-y-4">
                {selectedChains.map((chain) => {
                  const chainConfig = supportedChains.find(c => c.value === chain)
                  const availableTokens = getTokensForChain(chain)
                  const currentToken = selectedTokens[chain]
                  const isDropdownOpen = openDropdown === chain

                  return (
                    <div
                      key={chain}
                      className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-4"
                    >
                      {/* Chain Header */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{chainConfig?.icon}</span>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {chainConfig?.label}
                        </span>
                      </div>

                      {/* Token Selection */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Coins className="w-3.5 h-3.5" />
                          Select Token
                        </Label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setOpenDropdown(isDropdownOpen ? null : chain)}
                            className={cn(
                              "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200",
                              "bg-white dark:bg-slate-900",
                              isDropdownOpen
                                ? "border-cyan-500 ring-2 ring-cyan-500/20"
                                : "border-slate-200 dark:border-slate-700 hover:border-cyan-400"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {currentToken ? (
                                <>
                                  <span className="text-lg">
                                    {availableTokens.find(t => t.symbol === currentToken.symbol)?.icon || "🪙"}
                                  </span>
                                  <div className="text-left">
                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                      {currentToken.symbol}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                      {currentToken.name}
                                    </p>
                                  </div>
                                </>
                              ) : (
                                <span className="text-sm text-slate-400">Select a token...</span>
                              )}
                            </div>
                            <ChevronDown className={cn(
                              "w-4 h-4 text-slate-400 transition-transform duration-200",
                              isDropdownOpen && "rotate-180"
                            )} />
                          </button>

                          {/* Dropdown */}
                          {isDropdownOpen && (
                            <div className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl animate-in fade-in slide-in-from-top-2">
                              {availableTokens.map((token) => {
                                const isTokenSelected = currentToken?.symbol === token.symbol
                                return (
                                  <button
                                    key={token.address}
                                    type="button"
                                    onClick={() => handleTokenSelect(chain, token)}
                                    className={cn(
                                      "w-full flex items-center justify-between gap-3 px-4 py-3 transition-colors",
                                      isTokenSelected
                                        ? "bg-cyan-50 dark:bg-cyan-950/30"
                                        : "hover:bg-slate-50 dark:hover:bg-slate-800"
                                    )}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className="text-lg">{token.icon}</span>
                                      <div className="text-left">
                                        <p className={cn(
                                          "text-sm font-medium",
                                          isTokenSelected
                                            ? "text-cyan-700 dark:text-cyan-400"
                                            : "text-slate-900 dark:text-slate-100"
                                        )}>
                                          {token.symbol}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                          {token.name}
                                        </p>
                                      </div>
                                    </div>
                                    {isTokenSelected && (
                                      <Check className="w-4 h-4 text-cyan-500" />
                                    )}
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Wallet Address */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Wallet className="w-3.5 h-3.5" />
                          {currentToken?.symbol || "Token"} Wallet Address
                        </Label>
                        <Input
                          placeholder={`Enter your ${chain} wallet address`}
                          className="h-11 font-mono text-sm bg-white dark:bg-slate-900"
                          {...register(`wallet_addresses.${chain}`)}
                        />
                        {formState.errors.wallet_addresses?.[chain] && (
                          <p className="text-xs text-red-600">{formState.errors.wallet_addresses[chain]?.message}</p>
                        )}
                        {getSpecificError("wallet_addresses", errors) && (
                          <p className="text-xs text-red-600">{getSpecificError("wallet_addresses", errors)}</p>
                        )}
                        <p className="text-xs text-slate-400">
                          This is where you'll receive {currentToken?.symbol || "token"} payments
                        </p>
                      </div>
                    </div>
                  )
                })}
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
