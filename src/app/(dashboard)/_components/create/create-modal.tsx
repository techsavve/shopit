"use client"
import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CreateAccountForm } from "./create-account"
import { CreateAccountSuccess } from "./create-success"
import { useAccount } from "@/hooks/account/account"
import { ConfirmPlansForm } from "./create-confirm"
import { AccountConfigurationForm } from "./create-configure"
import { AccountPackageForm } from "./create-package"
import { Icons } from "@/components/icons"
import { X } from "lucide-react"

const stepConfig = {
  'start': { title: "Account Details", step: 1, total: 4 },
  'packages': { title: "Package Setup", step: 2, total: 4 },
  'configure': { title: "Configuration", step: 3, total: 4 },
  'confirm': { title: "Review & Confirm", step: 4, total: 4 },
  'success': { title: "Success", step: 4, total: 4 },
}

export const CreateAccountModal = ({ isOpen = false, onClose = () => {} }: { isOpen?: boolean, onClose?: () => void }) => {
  const { onboardingStatus, account, isProgressLoading, setOnboarding, createAccount, onboarding } = useAccount();
  if (onboardingStatus === undefined) return;

  const currentStep = stepConfig[onboardingStatus];

  const OnboardingFlow = () => {
    const Onboarding: Record<typeof onboardingStatus, ({ onClose }: { onClose: () => void }) => React.JSX.Element>  = {
      'start': CreateAccountForm,
      'packages': AccountPackageForm,
      'configure': AccountConfigurationForm,
      'confirm': ConfirmPlansForm,
      'success': CreateAccountSuccess,
    }
    const Component = Onboarding[onboardingStatus];
    return <Component onClose={onClose}/>;
  }

  // Navigation handlers
  const handleBack = () => {
    if (onboardingStatus === 'packages') setOnboarding('start');
    else if (onboardingStatus === 'configure') setOnboarding('packages');
    else if (onboardingStatus === 'confirm') setOnboarding('configure');
  }

  const handleContinue = () => {
    if (onboardingStatus === 'confirm' && onboarding) {
      createAccount({ ...onboarding, plan: "free" });
    }
  }

  // Determine button states
  const showBackButton = onboardingStatus !== 'start' && onboardingStatus !== 'success';
  const showCancelButton = onboardingStatus === 'start' && account;
  const showFooter = onboardingStatus !== 'success';
  const continueButtonText = onboardingStatus === 'confirm' ? 'Create Account' : 'Continue';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[96vh] w-[98vw] max-w-[1400px] p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Compact Header with progress bar */}
        <div className="flex-shrink-0 px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Icons.logo className="w-5 h-5 text-[#00BCD4]" />
                <div>
                  <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {currentStep.title}
                  </h1>
                </div>
              </div>
              
              {/* Inline Progress indicator */}
              {onboardingStatus !== 'success' && (
                <div className="flex items-center space-x-2 ml-6">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Step {currentStep.step} of {currentStep.total}
                  </span>
                  <div className="w-40 bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                    <div 
                      className="bg-[#00BCD4] h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep.step / currentStep.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <OnboardingFlow/>
        </div>

        {/* Fixed Footer with Navigation Buttons */}
        {showFooter && (
          <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-12 py-3">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              {showBackButton ? (
                <Button 
                  variant="ghost" 
                  onClick={handleBack}
                  type="button" 
                  className="h-8 text-sm"
                >
                  Back
                </Button>
              ) : showCancelButton ? (
                <Button 
                  variant="ghost" 
                  onClick={onClose}
                  type="button" 
                  className="h-8 text-sm"
                >
                  Cancel
                </Button>
              ) : (
                <div />
              )}
              <Button
                disabled={isProgressLoading}
                onClick={handleContinue}
                type="submit"
                form={`onboarding-form-${onboardingStatus}`}
                className="h-8 px-5 text-sm bg-[#00BCD4] hover:bg-[#00BCD4]/90"
              >
                {isProgressLoading && <Icons.spinner className="mr-2 h-3 w-3 animate-spin" />}
                {continueButtonText}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}