"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAccount } from "@/hooks/account/account"
import { ICreateCompanyInfo, createCompanyInfoSchema } from "@/lib/types/request/account"
import { getSpecificError } from "@/lib/helpers/error_handler"
import { Building2, Globe, Laptop, MapPin } from "lucide-react"

import { countries } from "@/lib/data/countries"
import { industries } from "@/lib/data/industries"

export const CompanyInfoForm = ({ onClose }: { onClose: () => void }) => {
  const { errors, onboarding, setOnboarding } = useAccount()

  const form = useForm<ICreateCompanyInfo>({
    resolver: zodResolver(createCompanyInfoSchema),
    defaultValues: {
      name: onboarding?.name ?? "",
      description: onboarding?.description ?? "",
      country: onboarding?.country ?? "",
      website: onboarding?.website ?? "",
      industry: onboarding?.industry ?? "",
    },
  })

  return (
    <div className="px-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl mx-auto">
        <form 
          id="onboarding-form-start" 
          onSubmit={form.handleSubmit((data) => setOnboarding("account-setup", data))} 
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Tell us about your business
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We need a few details to set up your merchant profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5" />
                  Company Name
                </Label>
                <Input
                  id="name"
                  placeholder="Acme Corp"
                  className="h-10 transition-all focus:ring-2 focus:ring-[#00BCD4]/20 focus:border-[#00BCD4]"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-600">{form.formState.errors.name.message}</p>
                )}
                {getSpecificError("name", errors) && (
                  <p className="text-xs text-red-600">{getSpecificError("name", errors)}</p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Laptop className="w-3.5 h-3.5" />
                  Website <span className="text-slate-400 font-normal">(Optional)</span>
                </Label>
                <Input
                  id="website"
                  placeholder="https://acme.com"
                  className="h-10 transition-all focus:ring-2 focus:ring-[#00BCD4]/20 focus:border-[#00BCD4]"
                  {...form.register("website")}
                />
                {form.formState.errors.website && (
                  <p className="text-xs text-red-600">{form.formState.errors.website.message}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  Country
                </Label>
                <Select 
                  onValueChange={(value) => form.setValue("country", value)}
                  defaultValue={form.watch("country")}
                >
                  <SelectTrigger className="h-10 transition-all focus:ring-2 focus:ring-[#00BCD4]/20 focus:border-[#00BCD4]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.country && (
                  <p className="text-xs text-red-600">{form.formState.errors.country.message}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Industry */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  Industry <span className="text-slate-400 font-normal">(Optional)</span>
                </Label>
                <Select 
                  onValueChange={(value) => form.setValue("industry", value)}
                  defaultValue={form.watch("industry")}
                >
                  <SelectTrigger className="h-10 transition-all focus:ring-2 focus:ring-[#00BCD4]/20 focus:border-[#00BCD4]">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  About Company
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us a bit about what your company does..."
                  className="min-h-[120px] resize-none transition-all focus:ring-2 focus:ring-[#00BCD4]/20 focus:border-[#00BCD4]"
                  {...form.register("description")}
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-red-600">{form.formState.errors.description.message}</p>
                )}
                {getSpecificError("description", errors) && (
                  <p className="text-xs text-red-600">{getSpecificError("description", errors)}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
