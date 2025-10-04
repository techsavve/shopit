import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {props.label && 
          <label htmlFor={props.name} className="block text-sm font-medium text-foreground/80">
            {props.label} { props.required && <span className={'*'}></span> }
          </label>}
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border border-input bg-white/50 dark:bg-transparent px-3.5 py-2 text-[15px] shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <p className='text-[#B92828] text-[12px]'>{props.error}</p>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
