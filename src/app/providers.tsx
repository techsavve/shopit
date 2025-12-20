'use client'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { MantineProvider } from '@mantine/core'
import { useEffect, useState } from 'react'

function MantineThemeSync({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setColorScheme(resolvedTheme === 'dark' ? 'dark' : 'light')
  }, [resolvedTheme])

  return (
    <MantineProvider forceColorScheme={colorScheme}>
      {children}
    </MantineProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        storageKey="zypay-theme"
      >
        <MantineThemeSync>
          <SonnerToaster position='top-right' />
          {children}
        </MantineThemeSync>
      </NextThemesProvider>
    </>
  )
}