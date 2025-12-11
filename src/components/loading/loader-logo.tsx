"use client"

import Image from "next/image"
import { Icons } from "@/components/icons"

const LoaderLogo = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            {/* Animated Logo */}
            <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A202C] to-[#00BCD4] rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                    <Image src="/zypay.svg" alt="Logo" width={55} height={55} className="rounded-2xl" />
                </div>
                {/* Rotating Ring */}
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-[#00BCD4] border-r-[#1A202C] rounded-3xl animate-spin"></div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 w-20 h-20 border-2 border-[#00BCD4]/30 rounded-3xl animate-ping"></div>
                {/* Glow Effect */}
                <div className="absolute inset-0 w-20 h-20 rounded-3xl bg-[#00BCD4]/20 blur-xl animate-pulse"></div>
            </div>
            
            {/* Loading Text */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 bg-gradient-to-r from-[#1A202C] to-[#00BCD4] bg-clip-text text-transparent">
                    Zypay
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Secure Crypto Payments
                </p>
                <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-[#00BCD4] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#00BCD4] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#00BCD4] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    )
}

export default LoaderLogo
