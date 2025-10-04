"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MultiSelect, Tooltip } from "@mantine/core"
import { Icons } from "@/components/icons"
import { useAccount } from "@/hooks/account/account"
import { ICreateAccountConfiguration, createAccountConfigurationSchema } from "@/lib/types/request/account"
import { getSpecificError } from "@/lib/helpers/error_handler"
import { WebhookHoverCard } from "@/components/modal/webhook-tooltip"

const supportedChains = [
  { value: "BSC", label: "Binance Smart Chain" },
  { value: "Ton", label: "TON" },
]

export function AccountConfigurationForm() {
  const { onboarding, isProgressLoading, setOnboarding, errors } = useAccount()
  const [showExample, setShowExample] = React.useState(false)


  const form = useForm<ICreateAccountConfiguration>({
    resolver: zodResolver(createAccountConfigurationSchema),
    defaultValues: {
      webhook_url: onboarding?.webhook_url ?? "",
      supported_chains: onboarding?.supported_chains ?? [],
      wallet_addresses: onboarding?.wallet_addresses,
    },
  })

  const { control, register, handleSubmit, formState, watch } = form

  return (
    <form onSubmit={handleSubmit((data) => setOnboarding("pricing", data))}>
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Configure Your SDK</h2>
        <p className="mt-1 text-sm text-gray-600">
          Set up how your crypto payment SDK will handle events and route payments.
        </p>
      </div>

      <div className="space-y-4 py-4 h-[445px] overflow-y-auto pr-1">
        <div className="space-y-6">

          {/* Supported Chains */}
          <div>
            <Tooltip
              label="Choose the blockchain networks you want to accept USDT payments on."
              withArrow
              position="top-start"
            >
              <Controller
                name="supported_chains"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    label="Supported Chains"
                    placeholder="e.g., Binance Smart Chain, TON"
                    data={supportedChains}
                    value={field.value}
                    onChange={field.onChange}
                    error={formState.errors.supported_chains?.message ?? getSpecificError("supported_chains", errors)}
                    required
                  />
                )}
              />
            </Tooltip>
            <p className="text-xs text-muted-foreground mt-1">
              This determines which networks users can pay on.
            </p>
          </div>

          {/* Dynamic Wallet Addresses */}
          {watch("supported_chains")?.map((chain) => (
            <div key={chain}>
              <Tooltip
                label={`This is the USDT wallet address where you want to receive payments on ${chain}.`}
                withArrow
                position="top-start"
              >
                <Input
                  label={`${chain} Wallet Address (USDT)`}
                  placeholder={`Enter your ${chain} wallet address`}
                  {...register(`wallet_addresses.${chain}`)}
                  error={
                    formState.errors.wallet_addresses?.[chain]?.message ??
                    getSpecificError(`wallet_addresses.${chain}`, errors)
                  }
                />
              </Tooltip>
              <p className="text-xs text-muted-foreground mt-1">
                Double-check this wallet is correct and supports USDT on {chain}.
              </p>
            </div>
          ))}

          {/* Webhook URL */}
          <div>
            <Input
              label="Webhook URL"
              placeholder="https://yourdomain.com/webhook"
              {...register("webhook_url")}
              error={formState.errors.webhook_url?.message ?? getSpecificError("webhook_url", errors)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ensure your server is set up to handle POST requests securely at this URL.
            </p>
            <div className="mt-1">
              <WebhookHoverCard />
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setOnboarding("packages")} type="button">
          Prev
        </Button>

        <Button disabled={isProgressLoading} type="submit">
          {isProgressLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Next
        </Button>
      </DialogFooter>
    </form>
  )
}
