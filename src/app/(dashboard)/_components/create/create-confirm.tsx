"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { useAccount } from "@/hooks/account/account"
import { CheckCircle, Edit, Shield, DollarSign, Zap, Crown, CreditCard } from "lucide-react"

const plans = [
  {
    name: "Free",
    value: "free" as const,
    price: "$0",
    period: "/month",
    description: "Perfect for getting started",
    icon: Zap,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Pay as You Go",
    value: "continuous" as const,
    price: "$0.02",
    period: "/transaction",
    description: "Pay only for what you use",
    icon: CreditCard,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Standard",
    value: "standard" as const,
    price: "$20",
    period: "/month",
    description: "Best for growing businesses",
    icon: Crown,
    color: "from-purple-500 to-violet-600",
  },
]

export function ConfirmPlansForm() {
  const { onboarding, isProgressLoading, setOnboarding, createAccount } = useAccount()

  const onSubmit = () => {
    if (!onboarding) return
    // setOnboarding("confirm", onboarding)
    return createAccount({ ...onboarding, plan: "free" })
  }

  // const selectedPlan = plans.find(plan => plan.value === (onboarding?.plan || "free")) || plans[0]
  const selectedChains = onboarding?.supported_chains || []
  const accountType = onboarding?.account_type || "subscription"
  const packageType = onboarding?.package_type || "multiple"

  const formatAccountType = (type: string) => {
    return type === "subscription" ? "Recurring Payments" : "One-time Payments"
  }

  const formatPackageType = (type: string) => {
    return type === "multiple" ? "Multiple Packages" : "Single Package"
  }

  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <form id="onboarding-form-confirm" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div>
            <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Review Configuration</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Please review your account settings before proceeding</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Account Details */}
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Account Details</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOnboarding("start")}
                  className="h-6 text-xs text-[#00BCD4] hover:text-[#00BCD4]/80"
                >
                  <Edit className="w-2.5 h-2.5 mr-0.5" />
                  Edit
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Account Name</label>
                  <p className="text-xs text-slate-900 dark:text-slate-100 font-medium mt-0.5">{onboarding?.name || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Payment Type</label>
                  <p className="text-xs text-slate-900 dark:text-slate-100 mt-0.5">{formatAccountType(accountType)}</p>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Package Structure</label>
                  <p className="text-xs text-slate-900 dark:text-slate-100 mt-0.5">{formatPackageType(packageType)}</p>
                </div>
              </div>
            </div>

            {/* Package Configuration */}
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Pricing Configuration</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOnboarding("packages")}
                  className="h-6 text-xs text-[#00BCD4] hover:text-[#00BCD4]/80"
                >
                  <Edit className="w-2.5 h-2.5 mr-0.5" />
                  Edit
                </Button>
              </div>
              
              {onboarding?.packages && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Packages</label>
                  <div className="space-y-1.5 mt-0.5">
                    {onboarding.packages.map((pkg, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <span className="text-xs text-slate-900 dark:text-slate-100">
                          {pkg.name}
                        </span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">${pkg.amount}</span>
                      </div>
                    ))}
                  </div>
                  {accountType === "subscription" && (
                    <div className="mt-2">
                      <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Billing Frequency</label>
                      <p className="text-xs text-slate-900 dark:text-slate-100 mt-0.5 capitalize">{onboarding?.interval || "monthly"}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Blockchain Configuration */}
            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-100">Blockchain Configuration</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOnboarding("configure")}
                  className="h-6 text-xs text-[#00BCD4] hover:text-[#00BCD4]/80"
                >
                  <Edit className="w-2.5 h-2.5 mr-0.5" />
                  Edit
                </Button>
              </div>
              <div className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Supported Networks</label>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {selectedChains.length > 0 ? (
                      selectedChains.map((chain) => (
                        <Badge key={chain} variant="secondary" className="text-[10px] py-0 px-1.5">
                          {chain === "BSC" ? "🔗 BSC" : "⚡ TON"}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500">None selected</p>
                    )}
                  </div>
                </div>

                {onboarding?.wallet_addresses && selectedChains.length > 0 && (
                  <div>
                    <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Wallet Addresses</label>
                    <div className="space-y-1.5 mt-0.5">
                      {selectedChains.map((chain) => (
                        <div key={chain} className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="text-[10px] font-medium text-slate-900 dark:text-slate-100 mb-0.5">
                            {chain} USDT
                          </div>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono break-all">
                            {onboarding.wallet_addresses[chain] || "Not specified"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Webhook URL</label>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono break-all mt-0.5">
                    {onboarding?.webhook_url || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}