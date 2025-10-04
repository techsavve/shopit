import { SignUpForm } from "../../_components/sign-up-form";
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
      <div className="relative z-10 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <Icons.logo className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-white font-bold text-xl">Zypay Inc</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full">
        {/* Left side - Empty for form focus */}
        <div className="hidden lg:block lg:w-1/2"></div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center pt-0 pb-12 px-6 lg:px-12">
          <div className="w-full max-w-md">
            <SignUpForm />
          </div>
        </div>
      </div>

      {/* Bottom Left Marketing Content */}
      <div className="absolute bottom-16 left-8 z-10 hidden lg:block">
        <div className="text-white max-w-lg">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            Join Fast and Start Receiving Payments
          </h1>
          <p className="text-base text-gray-200 mb-6 leading-relaxed">
            The fastest way to accept payments online. Get started in minutes and scale your business with our powerful payment platform.
          </p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-200">Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-200">Accept 100+ payment methods</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-200">Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
