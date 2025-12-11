'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster as SonnerToaster  } from "@/components/ui/sonner"
import { MantineProvider } from '@mantine/core';

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
        <MantineProvider defaultColorScheme="light">
          <SonnerToaster position='top-right' />
            {children}
        </MantineProvider>
      </NextThemesProvider>
    </>
  )
}