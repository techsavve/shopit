"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 1. Initial auth check
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // 2. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // 3. Cleanup
    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            StoreIt
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>

            <Link href="/cart" className="hover:text-primary">
              Cart
            </Link>


            {/* AUTH-AWARE SECTION */}
            {!user ? (
              <Link href="/signin" className="hover:text-primary">
                Login
              </Link>
            ) : (
              <>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="hover:text-destructive"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
