"use client"

import { useAccount } from "@/hooks/account/account"

export function EnvironmentToggle() {
    const { envMode, setEnvMode } = useAccount()

    return (
        <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
            <button
                onClick={() => setEnvMode('production')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${envMode === 'production'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${envMode === 'production' ? 'bg-white' : 'bg-green-500'}`} />
                Live
            </button>
            <button
                onClick={() => setEnvMode('sandbox')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${envMode === 'sandbox'
                        ? 'bg-yellow-500 text-white shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
            >
                <span className={`w-1.5 h-1.5 rounded-full ${envMode === 'sandbox' ? 'bg-white' : 'bg-yellow-500'}`} />
                Sandbox
            </button>
        </div>
    )
}
