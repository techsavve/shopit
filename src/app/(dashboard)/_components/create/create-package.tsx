"use client"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { useAccount } from "@/hooks/account/account"
import { ICreateAccountPackages, accountIntervals, allAccountPackageOptions, createAccountPackagesSchema } from "@/lib/types/request/account"
import { Trash, Plus, DollarSign, Calendar } from "lucide-react"

export function AccountPackageForm() {
  const { onboarding, isProgressLoading, setOnboarding } = useAccount()

  const form = useForm<ICreateAccountPackages>({
    resolver: zodResolver(createAccountPackagesSchema),
    defaultValues: {
      packages: onboarding?.packages ?? [{ name: "pro", description: "", amount: 20 }],
      interval: onboarding?.interval ?? "monthly",
    },
  })

  const { control, register, handleSubmit, formState, watch } = form
  const { fields, append, remove } = useFieldArray({ control, name: "packages" })
  const selectedNames = watch("packages")?.map(p => p.name)

  return (
    <div className="px-12 py-8">
      <div className="max-w-4xl mx-auto">
        <form id="onboarding-form-packages" onSubmit={handleSubmit((data) => setOnboarding("configure", data))} className="space-y-6">
            {/* Package Pricing */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 dark:text-slate-100 mb-0.5">Package Pricing</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Set up your pricing packages and billing frequency</p>
              </div>
              
              <div className="space-y-3">
                {onboarding?.package_type === "multiple" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Packages</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ name: "" as any, description: "", amount: 0 })}
                        disabled={selectedNames.length >= allAccountPackageOptions.length}
                        className="h-7 text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Package
                      </Button>
                    </div>

                    <div className="space-y-2.5">
                      {fields.map((field, index) => {
                        const availableOptions = allAccountPackageOptions.filter(
                          (opt) => !selectedNames.includes(opt.value) || opt.value === watch(`packages.${index}.name`)
                        )

                        return (
                          <div key={field.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-medium text-slate-900 dark:text-slate-100">Package {index + 1}</span>
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => remove(index)}
                                  className="h-6 w-6 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Package Name</Label>
                                <Controller
                                  name={`packages.${index}.name`}
                                  control={control}
                                  render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                      <SelectTrigger className="h-8 text-sm">
                                        <SelectValue placeholder="Select package" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {availableOptions.map((option) => (
                                          <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  )}
                                />
                                {formState.errors.packages?.[index]?.name && (
                                  <p className="text-xs text-red-600">{formState.errors.packages[index]?.name?.message}</p>
                                )}
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Price (USD)</Label>
                                <Input
                                  type="number"
                                  placeholder="29.99"
                                  className="h-8 text-sm"
                                  {...register(`packages.${index}.amount`, { valueAsNumber: true })}
                                />
                                {formState.errors.packages?.[index]?.amount && (
                                  <p className="text-xs text-red-600">{formState.errors.packages[index]?.amount?.message}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Price (USD)</Label>
                    <Input
                      type="number"
                      placeholder="29.99"
                      className="h-8 text-sm"
                      {...register(`packages.0.amount`, { valueAsNumber: true })}
                    />
                    {formState.errors.packages?.[0]?.amount && (
                      <p className="text-xs text-red-600">{formState.errors.packages[0]?.amount?.message}</p>
                    )}
                  </div>
                )}

                {/* Billing Interval - Only for subscriptions */}
                {onboarding?.account_type === "subscription" && (
                  <div className="space-y-1.5 pt-3">
                    <Label className="text-xs font-medium text-slate-700 dark:text-slate-300">Billing Frequency</Label>
                    <Controller
                      name="interval"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Select billing frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            {accountIntervals.map((interval) => (
                              <SelectItem key={interval.value} value={interval.value}>
                                {interval.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {formState.errors.interval && (
                      <p className="text-xs text-red-600">{formState.errors.interval.message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </form>
      </div>
    </div>
  )
}
