import { SignUpForm } from "../../_components/signup-form";
import { Icons } from "@/components/icons";

export default function SignUpPage() {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Logo in top left */}
      <div className="relative z-10 p-5">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1A202C] to-[#00BCD4] rounded-xl flex items-center justify-center shadow-lg">
            <Icons.logo className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-base">Zypay</span>
            <span className="text-gray-300 text-xs">Secure Crypto Payments</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full">
        {/* Left side - Empty for form focus */}
        <div className="hidden lg:block lg:w-1/2"></div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center pt-0 pb-10 px-5 lg:px-10">
          <div className="w-full max-w-sm">
            <SignUpForm />
          </div>
        </div>
      </div>

      {/* Bottom Left Marketing Content */}
      <div className="absolute bottom-12 left-6 z-10 hidden lg:block">
        <div className="text-white max-w-md">
          <h1 className="text-2xl font-bold mb-3 leading-tight">
            Join Fast and Start Receiving Payments
          </h1>
          <p className="text-sm text-gray-200 mb-4 leading-relaxed">
            The fastest way to accept payments online. Get started in minutes and scale your business with our powerful payment platform.
          </p>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-200">Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-200">Accept 100+ payment methods</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-200">Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
