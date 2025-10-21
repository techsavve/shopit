'use client';

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateAccountSchema, IUpdateAccount, accountTypes, packageTypes, allAccountPackageOptions, accountIntervals } from "@/lib/types/request/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAccount } from "@/hooks/account/account";
import { useEffect } from "react";
import { Select, Textarea, Tooltip } from "@mantine/core";
import { getSpecificError } from "@/lib/helpers/error_handler";
import { Trash } from "lucide-react";
import { Icons } from "@/components/icons";

export function AccountForm() {
  const { isProgressLoading, account, errors, updateAccount } = useAccount();
  
  const form = useForm<IUpdateAccount>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name: "",
      description: "",
      account_type: "subscription",
      package_type: "single",
      interval: "monthly",
      packages: [
        { name: "basic", amount: 0 },
      ],
      duration: "",
    },
  });

  const selectedNames = form.watch("packages")?.map(p => p.name)
  const { fields, append, remove } = useFieldArray({ control: form.control, name: "packages" });

  useEffect(() => {
    form.reset({
      name: account?.name,
      description: account?.description,
      account_type: account?.details.account_type,
      package_type: account?.details.package_type,
      interval: account?.details.interval,
      packages: account?.details.packages.map((p) => ({
        name: p.name,
        amount: p.subscription_fee
      })),
      duration: account?.details.duration,
    })
  }, [account, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateAccount)} className="space-y-6">
      <div>
          <Tooltip label="This is the display name for your crypto payment account. It’s visible to users.">
            <Input
              label="Account Name"
              placeholder="e.g., Zypay Premium Subscriptions"
              {...form.register("name")}
              error={form.formState.errors.name?.message ?? getSpecificError("name", errors)}
              required
            />
          </Tooltip>
        </div>

        <div>
          <Tooltip label="Provide a short description of what this payment account is used for.">
            <Textarea
              label="Description"
              placeholder="e.g., This account is for managing payments for our online course subscriptions."
              autosize
              minRows={3}
              {...form.register("description")}
              error={form.formState.errors.description?.message ?? getSpecificError("description", errors)}
              required
            />
          </Tooltip>
        </div>

        <div>
          <Controller
            name="account_type"
            control={form.control}
            render={({ field }) => (
              <Tooltip
                label={
                  accountTypes.find((t) => t.value === field.value)?.description ??
                  "Choose how users will pay: one-time or recurring."
                }
                withArrow
                position="top-start"
              >
                <Select
                  label="Account Type"
                  placeholder="Select account type"
                  data={accountTypes.map((t) => ({
                    value: t.value,
                    label: t.name,
                  }))}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={form.formState.errors.account_type?.message ?? getSpecificError("account_type", errors)}
                  required
                />
              </Tooltip>
            )}
          />
        </div>

        <div>
          <Controller
            name="package_type"
            control={form.control}
            render={({ field }) => (
              <Tooltip
                label={
                  packageTypes.find((t) => t.value === field.value)?.description ??
                  "Choose whether to offer one or multiple pricing packages."
                }
                withArrow
                position="top-start"
              >
                <Select
                  label="Package Type"
                  placeholder="Select package type"
                  data={packageTypes.map((t) => ({
                    value: t.value,
                    label: t.name,
                  }))}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={form.formState.errors.package_type?.message ?? getSpecificError("package_type", errors)}
                  required
                />
              </Tooltip>
            )}
          />
        </div>

        {form.watch('package_type') === "multiple" ? (
          <>
            {fields.map((field, index) => {
              const availableOptions = allAccountPackageOptions.filter(
                (opt) => !selectedNames.includes(opt.value) || opt.value === form.watch(`packages.${index}.name`)
              )

              return (
                <div key={field.id} className="border p-3 rounded-md space-y-3 relative bg-gray-50">
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <Controller
                      name={`packages.${index}.name`}
                      control={form.control}
                      render={({ field }) => (
                        <Select
                          label="Package Name"
                          placeholder="Select a package"
                          data={availableOptions}
                          value={field.value}
                          onChange={field.onChange}
                          error={form.formState.errors.packages?.[index]?.name?.message}
                          required
                        />
                      )}
                    />
                    <Input
                      label="Amount (USD)"
                      type="number"
                      placeholder="e.g. 50"
                      {...form.register(`packages.${index}.amount`, { valueAsNumber: true })}
                      error={form.formState.errors.packages?.[index]?.amount?.message}
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
              {...form.register(`packages.0.amount`, { valueAsNumber: true })}
              error={form.formState.errors.packages?.[0]?.amount?.message}
              required
            />
            <p className="text-xs text-gray-500 -mt-2">
              💰 This is the only price users will be charged for this account.
            </p>
          </>
        )}

        {/* Interval (only for subscriptions) */}
        {form.watch('account_type') === "subscription" && (
          <>
            <Controller
              name="interval"
              control={form.control}
              render={({ field }) => (
                <Select
                  label="Billing Interval"
                  placeholder="Choose billing interval"
                  data={accountIntervals}
                  value={field.value}
                  onChange={field.onChange}
                  error={form.formState.errors.interval?.message}
                  required
                />
              )}
            />
            <p className="text-xs text-gray-500 -mt-2">
              🗖️ Determines how often users will be billed. E.g., &quot;Monthly&quot; means users are charged once per month.
            </p>
          </>
        )}

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 12 months" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4" disabled={isProgressLoading}>
          { !isProgressLoading && "Update Account"}
          {isProgressLoading && ( <><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Loading...</> )}
        </Button>
      </form>
    </Form>
  );
}
