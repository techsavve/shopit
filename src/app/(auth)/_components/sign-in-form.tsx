"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import { getSpecificError } from "@/lib/helpers/error_handler"
import { useAuth } from "@/hooks/merchant/auth"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { errors, isLoading, signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({ defaultValues: { email_address: '', password: '', remember_me: true } });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8">
          <form onSubmit={form.handleSubmit(signIn)}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center space-y-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back
                </h1>
                <p className="text-gray-600">
                  Sign in to your Zypay Inc account
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email_address"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                      {...form.register('email_address')}
                      error={getSpecificError('email_address',errors)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="pl-12 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                      {...form.register("password")}
                      error={getSpecificError('password',errors)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...form.register('remember_me')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                </div>
              </div>

              {/* Sign In Button */}
              <Button 
                disabled={isLoading} 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 border-gray-200 hover:bg-gray-50 rounded-lg"
                >
                  <Icons.google className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-gray-200 hover:bg-gray-50 rounded-lg"
                >
                  <Icons.apple className="w-5 h-5 mr-2" />
                  Apple
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <a 
                    href="sign-up" 
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sign up for free
                  </a>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Footer */}
      <div className="text-center text-xs text-gray-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-blue-600">
        By signing in, you agree to our{" "}
        <a href="#" className="font-medium">Terms of Service</a> and{" "}
        <a href="#" className="font-medium">Privacy Policy</a>.
      </div>
    </div>
  )
}
