"use client"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select } from "@mantine/core"
import { Icons } from "@/components/icons"
import { useAccount } from "@/hooks/account/account"
import { ICreateAccountPackages, accountIntervals, allAccountPackageOptions, createAccountPackagesSchema } from "@/lib/types/request/account"
import { Trash } from "lucide-react"


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
    <>
      <form onSubmit={handleSubmit((data) => setOnboarding("configure", data))}>
        <div className="pb-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Configure Your Payment Packages</h2>
          <p className="mt-1 text-sm text-gray-600">
            Define how your users will be billed. Add one or more pricing plans depending on your use case.
          </p>
        </div>

        <div className="space-y-4 py-4 h-[480px] overflow-y-auto">
          <div className="space-y-3 p-1 h-[700px]">

            {/* Multiple Packages */}
            {onboarding?.package_type === "multiple" ? (
              <>
                {fields.map((field, index) => {
                  const availableOptions = allAccountPackageOptions.filter(
                    (opt) => !selectedNames.includes(opt.value) || opt.value === watch(`packages.${index}.name`)
                  )

                  return (
                    <div key={field.id} className="border p-3 rounded-md space-y-3 relative bg-gray-50">
                      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                        <Controller
                          name={`packages.${index}.name`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              label="Package Name"
                              placeholder="Select a package"
                              data={availableOptions}
                              value={field.value}
                              onChange={field.onChange}
                              error={formState.errors.packages?.[index]?.name?.message}
                              required
                            />
                          )}
                        />
                        <Input
                          label="Amount (USD)"
                          type="number"
                          placeholder="e.g. 50"
                          {...register(`packages.${index}.amount`, { valueAsNumber: true })}
                          error={formState.errors.packages?.[index]?.amount?.message}
                          required
                        />
                        {fields.length > 1 && (
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700 self-end"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 -mt-2">
                        💡 This plan will be visible in your SDK integration. Choose a name and amount wisely.
                      </p>
                    </div>
                  )
                })}

                <div className="pt-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => append({ name: "" as any, description: "", amount: 0 })}
                    disabled={selectedNames.length >= allAccountPackageOptions.length}
                  >
                    Add Package
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    ➕ Add more pricing tiers for different user levels. Maximum: {allAccountPackageOptions.length}
                  </p>
                </div>
              </>
            ) : (
              <>
                <Input
                  label="Amount (USD)"
                  type="number"
                  placeholder="e.g. 50"
                  {...register(`packages.0.amount`, { valueAsNumber: true })}
                  error={formState.errors.packages?.[0]?.amount?.message}
                  required
                />
                <p className="text-xs text-gray-500 -mt-2">
                  💰 This is the only price users will be charged for this account.
                </p>
              </>
            )}

            {/* Interval (only for subscriptions) */}
            {onboarding?.account_type === "subscription" && (
              <>
                <Controller
                  name="interval"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Billing Interval"
                      placeholder="Choose billing interval"
                      data={accountIntervals}
                      value={field.value}
                      onChange={field.onChange}
                      error={formState.errors.interval?.message}
                      required
                    />
                  )}
                />
                <p className="text-xs text-gray-500 -mt-2">
                  🗖️ Determines how often users will be billed. E.g., "Monthly" means users are charged once per month.
                </p>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOnboarding("start")} type="button">
            Prev
          </Button>

          <Button disabled={isProgressLoading} type="submit">
            {isProgressLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Next
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
