"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import { Select, Textarea, Tooltip } from "@mantine/core"
import { ICreateAccountDetails, accountTypes, createAccountDetailsSchema, packageTypes } from "@/lib/types/request/account"
import { zodResolver } from "@hookform/resolvers/zod"
import { getSpecificError } from "@/lib/helpers/error_handler"
import { useAccount } from "@/hooks/account/account"


export const CreateAccountForm = ({ onClose }: { onClose: () => void }) => {
  const { errors, account, isProgressLoading, onboarding, setOnboarding } = useAccount()

  const form = useForm<ICreateAccountDetails>({
    resolver: zodResolver(createAccountDetailsSchema),
    defaultValues: {
      name: onboarding?.name ?? "",
      description: onboarding?.description ?? "",
      account_type: onboarding?.account_type ?? "subscription",
      package_type: onboarding?.package_type ?? "multiple",
    },
  })

  return (
    <form onSubmit={form.handleSubmit((data) => setOnboarding("packages", data))}>
      <div className="pb-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Create Payment Account</h2>
        <p className="mt-1 text-sm text-gray-600">
          Set up your payment account details to begin receiving crypto payments.
        </p>
      </div>

      <div className="space-y-4 py-4 pb-6 h-[500px] overflow-y-auto pr-1">
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
      </div>

      <DialogFooter>
        {account && (
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
        )}
        <Button disabled={isProgressLoading} type="submit">
          {isProgressLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Next
        </Button>
      </DialogFooter>
    </form>
  )
}
