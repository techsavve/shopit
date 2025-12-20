"use client"
import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CompanyInfoForm } from "./company-info"
import { AccountSetupForm } from "./account-setup"
import { CreateAccountSuccess } from "./create-success"
import { OnboardingStatus, useAccount } from "@/hooks/account/account"
import { ConfirmPlansForm } from "./create-confirm"
import { AccountConfigurationForm } from "./create-configure"
import { AccountPackageForm } from "./create-package"
import { Icons } from "@/components/icons"
import { X, Building2, Settings, Package, Sliders, CheckCircle, Sparkles, ChevronLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const stepConfig = {
  'start': { title: "Company Information", subtitle: "Tell us about your business", step: 1, total: 5, icon: Building2 },
  'account-setup': { title: "Account Setup", subtitle: "Configure your payment preferences", step: 2, total: 5, icon: Settings },
  'packages': { title: "Package Setup", subtitle: "Define your pricing tiers", step: 3, total: 5, icon: Package },
  'configure': { title: "Configuration", subtitle: "Set up blockchain networks", step: 4, total: 5, icon: Sliders },
  'confirm': { title: "Review & Confirm", subtitle: "Verify your settings", step: 5, total: 5, icon: CheckCircle },
  'success': { title: "Success", subtitle: "Your account is ready", step: 5, total: 5, icon: Sparkles },
}

const steps = ['start', 'account-setup', 'packages', 'configure', 'confirm'] as const;

export const CreateAccountModal = ({ isOpen = false, onClose = () => { } }: { isOpen?: boolean, onClose?: () => void }) => {
  const { onboardingStatus, account, isProgressLoading, setOnboarding, createAccount, onboarding } = useAccount();
  if (onboardingStatus === undefined) return;

  const currentStep = stepConfig[onboardingStatus] || stepConfig['start'];
  const StepIcon = currentStep.icon;

  const OnboardingFlow = () => {
    const Onboarding: Record<OnboardingStatus, ({ onClose }: { onClose: () => void }) => React.JSX.Element> = {
      'start': CompanyInfoForm,
      'account-setup': AccountSetupForm,
      'packages': AccountPackageForm,
      'configure': AccountConfigurationForm,
      'confirm': ConfirmPlansForm,
      'success': CreateAccountSuccess,
    }
    const Component = Onboarding[onboardingStatus] || Onboarding['start'];
    return <Component onClose={onClose} />;
  }

  const handleBack = () => {
    if (onboardingStatus === 'account-setup') setOnboarding('start');
    else if (onboardingStatus === 'packages') setOnboarding('account-setup');
    else if (onboardingStatus === 'configure') setOnboarding('packages');
    else if (onboardingStatus === 'confirm') setOnboarding('configure');
  }

  const handleContinue = () => {
    if (onboardingStatus === 'confirm' && onboarding) {
      createAccount({ ...onboarding, plan: "free" });
    }
  }

  const showBackButton = onboardingStatus !== 'start' && onboardingStatus !== 'success';
  const showCancelButton = onboardingStatus === 'start' && account;
  const showFooter = onboardingStatus !== 'success';
  const continueButtonText = onboardingStatus === 'confirm' ? 'Create Account' : 'Continue';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[96vh] w-[98vw] max-w-[1400px] p-0 overflow-hidden border-0 flex flex-col bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full" />
        </div>

        {/* Glassmorphism Header */}
        <div className="relative flex-shrink-0 border-b border-white/20 dark:border-slate-800/50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70">
          {/* Header Top Section */}
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              {/* Logo & Title */}
              <div className="flex items-center gap-4">
                {/* <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl blur-lg opacity-40" />
                  <div className="relative p-2.5 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl shadow-lg shadow-cyan-500/25">
                    <StepIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {currentStep.title}
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentStep.subtitle}
                  </p>
                </div> */}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="group p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300 hover:scale-105"
              >
                <X className="w-4 h-4 text-slate-500 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Step Indicator */}
          {onboardingStatus !== 'success' && (
            <div className="px-8 pb-5">
              <div className="flex items-center justify-between gap-3">
                {steps.map((step, index) => {
                  const config = stepConfig[step];
                  const Icon = config.icon;
                  const isActive = step === onboardingStatus;
                  const isCompleted = config.step < currentStep.step;
                  const isPending = config.step > currentStep.step;

                  return (
                    <React.Fragment key={step}>
                      {/* Step Circle */}
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500",
                            isActive && "bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/30 scale-110",
                            isCompleted && "bg-gradient-to-br from-emerald-500 to-green-500 shadow-md shadow-emerald-500/20",
                            isPending && "bg-slate-100 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700"
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <Icon className={cn(
                              "w-4 h-4 transition-colors",
                              isActive && "text-white",
                              isPending && "text-slate-400 dark:text-slate-500"
                            )} />
                          )}
                          {isActive && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-400 animate-ping opacity-20" />
                          )}
                        </div>
                        <span className={cn(
                          "text-xs font-medium hidden lg:block transition-colors",
                          isActive && "text-cyan-600 dark:text-cyan-400",
                          isCompleted && "text-emerald-600 dark:text-emerald-400",
                          isPending && "text-slate-400 dark:text-slate-500"
                        )}>
                          {config.title.split(' ')[0]}
                        </span>
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-0.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-700 ease-out",
                              isCompleted
                                ? "bg-gradient-to-r from-emerald-500 to-green-500 w-full"
                                : isActive
                                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 w-1/2"
                                  : "w-0"
                            )}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden touch-scroll touch-pan-y">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-4">
            <OnboardingFlow />
          </div>
        </div>

        {/* Premium Footer */}
        {showFooter && (
          <div className="relative flex-shrink-0 border-t border-white/20 dark:border-slate-800/50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 px-8 py-4">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              {/* Back/Cancel Button */}
              {showBackButton ? (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  type="button"
                  className="h-11 px-6 text-sm font-medium group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back
                </Button>
              ) : showCancelButton ? (
                <Button
                  variant="ghost"
                  onClick={onClose}
                  type="button"
                  className="h-11 px-6 text-sm font-medium hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all duration-300"
                >
                  Cancel
                </Button>
              ) : (
                <div />
              )}

              {/* Progress Text */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 animate-pulse" />
                Step {currentStep.step} of {currentStep.total}
              </div>

              {/* Continue Button */}
              <Button
                disabled={isProgressLoading}
                onClick={handleContinue}
                type="submit"
                form={`onboarding-form-${onboardingStatus}`}
                className={cn(
                  "h-11 px-8 text-sm font-semibold rounded-xl shadow-lg transition-all duration-300 group",
                  onboardingStatus === 'confirm'
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-emerald-500/25 hover:shadow-emerald-500/40"
                    : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-cyan-500/25 hover:shadow-cyan-500/40",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                )}
              >
                {isProgressLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {continueButtonText}
                {!isProgressLoading && (
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}