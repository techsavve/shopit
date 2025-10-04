"use client"
import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CreateAccountForm } from "./create-account"
import { CreateAccountSuccess } from "./create-success"
import { useAccount } from "@/hooks/account/account"
import { PricingPlansForm } from "./create-payment"
import { AccountConfigurationForm } from "./create-configure"
import { AccountPackageForm } from "./create-package"
import { CheckoutForm } from "./create-checkout"

export const CreateAccountModal = ({ isOpen = false, onClose = () => {} }: { isOpen?: boolean, onClose?: () => void }) => {
  const { onboardingStatus } = useAccount();
  if (onboardingStatus === undefined) return;

  const OnboardingFlow = () => {
    const Onboarding: Record<typeof onboardingStatus, ({ onClose }: { onClose: () => void }) => React.JSX.Element>  = {
      'start': CreateAccountForm,
      'packages': AccountPackageForm,
      'configure': AccountConfigurationForm,
      'pricing': PricingPlansForm,
      'checkout': CheckoutForm,
      'success': CreateAccountSuccess,
    }
    const Component = Onboarding[onboardingStatus];
    return <Component onClose={onClose}/>;
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[650px] max-w-[600px]">
        <OnboardingFlow/>
      </DialogContent>
    </Dialog>
  )
}