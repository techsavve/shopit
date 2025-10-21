"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import { ICreateAccountDetails, accountTypes, createAccountDetailsSchema, packageTypes } from "@/lib/types/request/account"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAccount } from "@/hooks/account/account"
import { cn } from "@/lib/utils"
import { getSpecificError } from "@/lib/helpers/error_handler"

export const CreateAccountForm = ({ onClose }: { onClose: () => void }) => {
  const { errors, onboarding, setOnboarding } = useAccount()

  const form = useForm<ICreateAccountDetails>({
    resolver: zodResolver(createAccountDetailsSchema),
    defaultValues: {
      name: onboarding?.name ?? "",
      description: onboarding?.description ?? "",
      account_type: onboarding?.account_type ?? "one-time",
      package_type: onboarding?.package_type ?? "multiple",
    },
  })

  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto">
        <form id="onboarding-form-start" onSubmit={form.handleSubmit((data) => setOnboarding("packages", data))} className="space-y-6">
          {/* Account Information */}
          <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Account Information</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Basic details about your payment account</p>
                </div>
                
                <div className="space-y-4">
                  {/* Account Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Account Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="My Business Account"
                      className="h-8 text-sm"
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
                    )}
                    {getSpecificError("name", errors) && (
                      <p className="text-xs text-red-600">{getSpecificError("name", errors)}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the purpose of this account"
                      className="min-h-[80px] resize-none text-sm"
                      {...form.register("description")}
                    />
                    {form.formState.errors.description && (
                      <p className="text-xs text-red-600">{form.formState.errors.description.message}</p>
                    )}
                    {getSpecificError("description", errors) && (
                      <p className="text-xs text-red-600">{getSpecificError("description", errors)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Configuration */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Payment Configuration</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Choose how you want to accept payments</p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* Account Type Selection */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Payment Type
                    </Label>
                    <div className="space-y-2">
                      {accountTypes.map((type) => (
                        <div
                          key={type.value}
                          className={cn(
                            "relative flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all",
                            form.watch("account_type") === type.value
                              ? "border-[#00BCD4] bg-[#00BCD4]/5"
                              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          )}
                          onClick={() => form.setValue("account_type", type.value as "subscription" | "one-time")}
                        >
                          <div className="flex items-start space-x-2 flex-1">
                            <div className={cn(
                              "mt-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center",
                              form.watch("account_type") === type.value
                                ? "border-[#00BCD4]"
                                : "border-slate-300 dark:border-slate-600"
                            )}>
                              {form.watch("account_type") === type.value && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00BCD4]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
                                {type.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Package Type Selection */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Package Structure
                    </Label>
                    <div className="space-y-2">
                      {packageTypes.map((type) => (
                        <div
                          key={type.value}
                          className={cn(
                            "relative flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all",
                            form.watch("package_type") === type.value
                              ? "border-[#00BCD4] bg-[#00BCD4]/5"
                              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          )}
                          onClick={() => form.setValue("package_type", type.value as "single" | "multiple")}
                        >
                          <div className="flex items-start space-x-2 flex-1">
                            <div className={cn(
                              "mt-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center",
                              form.watch("package_type") === type.value
                                ? "border-[#00BCD4]"
                                : "border-slate-300 dark:border-slate-600"
                            )}>
                              {form.watch("package_type") === type.value && (
                                <div className="w-1.5 h-1.5 rounded-full bg-[#00BCD4]" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
                                {type.name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
        </form>
      </div>
    </div>
  )
}
