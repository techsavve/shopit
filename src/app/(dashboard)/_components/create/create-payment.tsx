"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ICreateAccountPayment, createAccountPaymentSchema } from "@/lib/types/request/account"
import { useAccount } from "@/hooks/account/account"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const plans = [
  {
    name: "Free",
    value: "free" as const,
    price: "$0",
    description: "Free for up to 100 transactions",
    explanation: "Ideal for testing or small-scale projects. You can upgrade at any time.",
  },
  {
    name: "Pay as You Go",
    value: "continuous" as const,
    price: "$0.02",
    description: "Per successful transaction",
    explanation:
      "Perfect for unpredictable volumes. You only pay for what you use with no monthly fee.",
  },
  {
    name: "Standard",
    value: "standard" as const,
    price: "$20",
    description: "Per month, unlimited transactions",
    explanation:
      "Best for stable or high-volume platforms. Get access to advanced features and support.",
  },
]

const features = [
  "Customization Options",
  "Standard Customer Support",
  "Basic Reporting and Analytics",
]

export function PricingPlansForm() {
  const { onboarding, isProgressLoading, setOnboarding, createAccount } = useAccount()

  const form = useForm<ICreateAccountPayment>({
    resolver: zodResolver(createAccountPaymentSchema),
    defaultValues: {
      plan: onboarding?.plan ?? "free",
    },
  })

  const selected = form.watch("plan")

  const onSubmit = (data: ICreateAccountPayment) => {
    if (!onboarding) return
    if (selected === "free") {
      return createAccount({ ...onboarding, plan: selected })
    }
    // If it's a paid plan, continue to payment step
    setOnboarding("checkout", { ...onboarding, plan: selected })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="pb-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Choose your payment plan</h2>
        <p className="mt-1 text-sm text-gray-600">
          Select a plan that suits your current and future needs. You can upgrade anytime.
        </p>
      </div>

      <div className="space-y-3 py-4 h-[445px] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ul className="text-sm list-disc list-inside col-span-full text-muted-foreground">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <HoverCard key={plan.name}>
              <HoverCardTrigger asChild>
                <Card
                  className={cn(
                    "py-3 px-4 border rounded-xl cursor-pointer transition hover:shadow-md",
                    selected === plan.value ? "border-black" : "border-muted"
                  )}
                  onClick={() => form.setValue("plan", plan.value)}
                >
                  <CardContent>
                    <h3 className="text-md font-semibold">{plan.name}</h3>
                    <p className="text-lg font-bold">{plan.price}</p>
                    <p className="text-xs text-muted-foreground">{plan.description}</p>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm text-muted-foreground w-72">
                <strong>{plan.name}:</strong> {plan.explanation}
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setOnboarding("configure")} type="button">
          Prev
        </Button>
        <Button disabled={isProgressLoading} type="submit">
          {isProgressLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          {selected === "free" ? "Create" : "Continue to Payment"}
        </Button>
      </DialogFooter>
    </form>
  )
}