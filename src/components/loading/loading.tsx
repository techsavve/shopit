"use client"

import LoaderLogo from "@/components/loading/loader-logo";

export const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 z-50 h-screen w-screen bg-white dark:bg-gray-700">
      <div className="flex h-full w-full items-center justify-center">
        <div className="">
          <LoaderLogo />
          {/* <div className="flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              Loading Zypay
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}