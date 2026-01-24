"use client"
import Link from "next/link";

export function Navbar() {
    return(
        <div>
            {/* Header/Navbar will go here */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href="/" className="text-2xl font-bold">StoreIt</Link>
                        <div className="flex items-center gap-6">
                            <Link href="/products" className="hover:text-primary">Products</Link>
                            <Link href="/cart" className="hover:text-primary">Cart</Link>
                            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
                            <Link href="/login" className="hover:text-primary" >Login</Link>
                        </div>
                    </nav>
                </div>
            </header>
        </div>    
    )

}