"use client"

import { Icons } from "@/components/icons"

const LoaderLogo = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            {/* Animated Logo */}
            <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                    <Icons.logo className="w-8 h-8 text-white" />
                </div>
                {/* Rotating Ring */}
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-2xl animate-spin"></div>
                {/* Pulsing Ring */}
                <div className="absolute inset-0 w-16 h-16 border-2 border-blue-300/30 rounded-2xl animate-ping"></div>
            </div>
            
            {/* Loading Text */}
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    Zypay Inc
                </h2>
                <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    )
}

export default LoaderLogo
