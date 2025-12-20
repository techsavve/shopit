"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepperProps {
    steps: {
        title: string
        description?: string
    }[]
    currentStep: number
    onStepClick?: (step: number) => void
    className?: string
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isActive = index === currentStep
                    const isClickable = onStepClick && index <= currentStep

                    return (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    onClick={() => isClickable && onStepClick?.(index)}
                                    disabled={!isClickable}
                                    className={cn(
                                        "relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300",
                                        isCompleted && "border-primary bg-primary text-primary-foreground",
                                        isActive && "border-primary bg-primary/10 text-primary",
                                        !isCompleted && !isActive && "border-muted-foreground/30 bg-muted/50 text-muted-foreground",
                                        isClickable && "cursor-pointer hover:scale-105",
                                        !isClickable && "cursor-default"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </button>
                                <div className="text-center max-w-[120px]">
                                    <p className={cn(
                                        "text-sm font-medium transition-colors",
                                        (isActive || isCompleted) ? "text-foreground" : "text-muted-foreground"
                                    )}>
                                        {step.title}
                                    </p>
                                    {step.description && (
                                        <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="flex-1 mx-4 h-0.5 relative">
                                    <div className="absolute inset-0 bg-muted-foreground/20 rounded-full" />
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-primary rounded-full transition-all duration-500 ease-out",
                                            index < currentStep ? "w-full" : "w-0"
                                        )}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
