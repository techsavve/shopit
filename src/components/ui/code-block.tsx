// components/ui/code-block.tsx
'use client'

import { cn } from "@/lib/utils"
import { Highlight, type Language } from "prism-react-renderer"
import { themes } from "prism-react-renderer"
import { CopyButton } from "./copy-button"

interface CodeBlockProps {
  code: string
  language?: Language
  className?: string
  showCopy?: boolean
  title?: string
}

export function CodeBlock({
  code,
  language = "typescript",
  className,
  showCopy = true,
  title,
}: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-lg border bg-slate-950 text-sm overflow-hidden", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
          <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
            {title}
          </span>
          {showCopy && <CopyButton value={code} />}
        </div>
      )}
      <div className="relative">
        {showCopy && !title && (
          <CopyButton value={code} className="right-3 top-3 bg-slate-800/80 hover:bg-slate-700/80" />
        )}
        <Highlight code={code} language={language} theme={themes.nightOwl}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(
                "overflow-x-auto p-4 font-mono text-sm leading-relaxed",
                title ? "pt-3" : "p-4",
                className
              )}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex">
                  <span className="text-slate-500 mr-4 select-none text-right w-6 shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}