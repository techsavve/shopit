"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import { useAccount } from "@/hooks/account/account"
import { ICreateAccountSetup, accountTypes, createAccountSetupSchema, packageTypes } from "@/lib/types/request/account"
import { cn } from "@/lib/utils"
import { CheckCircle2, CreditCard, Layers } from "lucide-react"

export const AccountSetupForm = ({ onClose }: { onClose: () => void }) => {
  const { onboarding, setOnboarding } = useAccount()

  const form = useForm<ICreateAccountSetup>({
    resolver: zodResolver(createAccountSetupSchema),
    defaultValues: {
      account_type: onboarding?.account_type ?? "one-time",
      package_type: onboarding?.package_type ?? "multiple",
    },
  })

  return (
    <div className="px-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
      <div className="max-w-4xl mx-auto">
        <form id="onboarding-form-account-setup" onSubmit={form.handleSubmit((data) => setOnboarding("packages", data))} className="space-y-8">
          
          {/* Header */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Configure your account
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose how you want to accept payments and structure your packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Account Type Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment Type
              </Label>
              <div className="space-y-3">
                {accountTypes.map((type) => (
                  <div
                    key={type.value}
                    className={cn(
                      "group relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                      form.watch("account_type") === type.value
                        ? "border-[#00BCD4] bg-[#00BCD4]/5 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 hover:border-[#00BCD4]/50 hover:bg-slate-50 dark:hover:bg-slate-900"
                    )}
                    onClick={() => form.setValue("account_type", type.value as "subscription" | "one-time")}
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={cn(
                        "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        form.watch("account_type") === type.value
                          ? "border-[#00BCD4]"
                          : "border-slate-300 dark:border-slate-600 group-hover:border-[#00BCD4]/50"
                      )}>
                        {form.watch("account_type") === type.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00BCD4]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-semibold transition-colors",
                          form.watch("account_type") === type.value
                            ? "text-[#00BCD4]"
                            : "text-slate-900 dark:text-slate-100"
                        )}>
                          {type.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    {form.watch("account_type") === type.value && (
                      <CheckCircle2 className="w-5 h-5 text-[#00BCD4] absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Package Type Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Package Structure
              </Label>
              <div className="space-y-3">
                {packageTypes.map((type) => (
                  <div
                    key={type.value}
                    className={cn(
                      "group relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                      form.watch("package_type") === type.value
                        ? "border-[#00BCD4] bg-[#00BCD4]/5 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 hover:border-[#00BCD4]/50 hover:bg-slate-50 dark:hover:bg-slate-900"
                    )}
                    onClick={() => form.setValue("package_type", type.value as "single" | "multiple")}
                  >
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={cn(
                        "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        form.watch("package_type") === type.value
                          ? "border-[#00BCD4]"
                          : "border-slate-300 dark:border-slate-600 group-hover:border-[#00BCD4]/50"
                      )}>
                        {form.watch("package_type") === type.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#00BCD4]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-semibold transition-colors",
                          form.watch("package_type") === type.value
                            ? "text-[#00BCD4]"
                            : "text-slate-900 dark:text-slate-100"
                        )}>
                          {type.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {type.description}
                        </p>
                      </div>
                    </div>
                    {form.watch("package_type") === type.value && (
                      <CheckCircle2 className="w-5 h-5 text-[#00BCD4] absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
