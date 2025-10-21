"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/merchant/auth"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/icons"
import { getSpecificError } from "@/lib/helpers/error_handler"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from "lucide-react"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { errors, isLoading, signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const form = useForm({ 
    defaultValues: { 
      first_name: '', 
      second_name: '', 
      email_address: '', 
      password: '', 
      remember_me: true 
    } 
  });

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
    form.setValue('password', password);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-5">
          <form onSubmit={form.handleSubmit(signUp)}>
            <div className="flex flex-col gap-3">
              {/* Header */}
              <div className="flex flex-col items-center text-center space-y-2">
                <h1 className="text-xl font-bold text-gray-900">
                  Create your account
                </h1>
                <p className="text-sm text-gray-600">
                  Join thousands of businesses using Zypay Inc
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="first_name" className="text-xs font-medium text-gray-700">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="first_name"
                        placeholder="John"
                        required
                        className="pl-10 h-10 text-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg"
                        {...form.register('first_name')}
                        error={getSpecificError('first_name', errors)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="second_name" className="text-xs font-medium text-gray-700">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="second_name"
                        placeholder="Doe"
                        className="pl-10 h-10 text-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg"
                        {...form.register('second_name')}
                        error={getSpecificError('second_name', errors)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-gray-700">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email_address"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="pl-10 h-10 text-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg"
                      {...form.register('email_address')}
                      error={getSpecificError('email_address', errors)}
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      required
                      className="pl-10 pr-10 h-10 text-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg"
                      onChange={handlePasswordChange}
                      error={getSpecificError('password', errors)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {form.watch('password') && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-gray-600">Password strength:</span>
                        <span className={`font-medium ${
                          passwordStrength <= 2 ? 'text-red-500' : 
                          passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {getPasswordStrengthText(passwordStrength)}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-0.5 flex-1 rounded-full ${
                              level <= passwordStrength 
                                ? getPasswordStrengthColor(passwordStrength)
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="space-y-1.5">
                  <p className="text-[10px] text-gray-600">Password requirements:</p>
                  <div className="space-y-1">
                    {[
                      { text: 'At least 8 characters', met: form.watch('password')?.length >= 8 },
                      { text: 'One uppercase letter', met: /[A-Z]/.test(form.watch('password') || '') },
                      { text: 'One lowercase letter', met: /[a-z]/.test(form.watch('password') || '') },
                      { text: 'One number', met: /[0-9]/.test(form.watch('password') || '') }
                    ].map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-[10px]">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                          req.met ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {req.met && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...form.register('remember_me')}
                    className="w-3.5 h-3.5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-xs text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                      Privacy Policy
                    </a>
                  </span>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button 
                disabled={isLoading} 
                type="submit" 
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm"
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  className="h-10 border-gray-200 hover:bg-gray-50 rounded-lg text-sm"
                >
                  <Icons.google className="w-4 h-4 mr-1.5" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-10 border-gray-200 hover:bg-gray-50 rounded-lg text-sm"
                >
                  <Icons.apple className="w-4 h-4 mr-1.5" />
                  Apple
                </Button>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-xs text-gray-600">
                  Already have an account?{" "}
                  <a 
                    href="sign-in" 
                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}