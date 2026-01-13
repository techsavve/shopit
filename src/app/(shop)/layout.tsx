import { ReactNode } from "react";

interface ShopLayoutProps {
    children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header/Navbar will go here */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <a href="/" className="text-2xl font-bold">StoreIt</a>
                        <div className="flex items-center gap-6">
                            <a href="/products" className="hover:text-primary">Products</a>
                            <a href="/cart" className="hover:text-primary">Cart</a>
                            <a href="/login" className="hover:text-primary">Login</a>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t py-8">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>© 2024 StoreIt. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
