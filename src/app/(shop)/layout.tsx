import { ReactNode } from "react";
import { TestControls } from "@/components/theme/ThemeToggle"
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ShopLayoutProps {
    children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
           
           <Navbar />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
            <>
            {/* existing content */}
            <TestControls />
            </>
        </div>
    );
}
