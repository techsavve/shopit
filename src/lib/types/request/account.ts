import { z } from "zod"


export const accountTypes = [
  {
    name: "One-Time Payment",
    value: "one-time",
    description: "Accept one-time crypto payments without recurring charges.",
  },
  {
    name: "Subscription",
    value: "subscription",
    description: "Set up recurring crypto payments on a weekly/monthly basis.",
  },
]

export const packageTypes = [
  {
    name: "Single package",
    value: "single",
    description: "Only one pricing package will be available to your users.",
  },
  {
    name: "Multiple package",
    value: "multiple",
    description: "Offer multiple pricing tiers or packages to your users.",
  },
]

export const accountIntervals = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

export const allAccountPackageOptions = [
  { label: "Basic", value: "basic" as "basic" },
  { label: "Pro", value: "pro" as "pro" },
  { label: "Enterprise", value: "enterprise" as "enterprise" },
]

export type IGetAccount = {
  account_id: string;
}

// Step 1: Company Information Schema
export const createCompanyInfoSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z.string(),
  country: z.string().min(1, "Please select a country"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  industry: z.string().optional(),
})

export type ICreateCompanyInfo = z.infer<typeof createCompanyInfoSchema>

// Step 2: Account Setup Schema
export const createAccountSetupSchema = z.object({
  account_type: z.enum(["subscription", "one-time"]),
  package_type: z.enum(["single", "multiple"]),
})

export type ICreateAccountSetup = z.infer<typeof createAccountSetupSchema>

// Combined details schema (for backwards compatibility)
export const createAccountDetailsSchema = createCompanyInfoSchema.merge(createAccountSetupSchema)

export type ICreateAccountDetails = z.infer<typeof createAccountDetailsSchema>

export const createAccountPackagesSchema = z.object({
  interval: z.enum(["daily", "weekly", "monthly", "yearly"]),
  packages: z.array(z.object({
    name: z.enum(["basic", "pro", "enterprise"]),
    description: z.string().optional(),
    amount: z.number(),
  })),
  duration: z.string().optional(), // could be number if it’s a time period
})

export type ICreateAccountPackages = z.infer<typeof createAccountPackagesSchema>

const walletAddressValidators = {
  BSC: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid BSC wallet address"),
  Ton: z.string().regex(/^[A-Za-z0-9\-_]{48}$/, "Invalid Ton wallet address"),
}

// Token info schema for wallet configuration
const tokenInfoSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: z.string(),
})

const createAccountFirstConfigurationSchema = z
  .object({
    webhook_url: z.string().url("Webhook URL must be a valid URL"),
    supported_chains: z
      .array(z.enum(["BSC", "Ton"]))
      .min(1, "Select at least one chain"),
    wallet_addresses: z.record(z.string()),
    selected_tokens: z.record(tokenInfoSchema).optional(),
  })

export const createAccountConfigurationSchema = createAccountFirstConfigurationSchema
  .superRefine((data, ctx) => {
    for (const chain of data.supported_chains) {
      const validator = walletAddressValidators[chain]
      const wallet = data.wallet_addresses?.[chain]
      const result = validator.safeParse(wallet)

      if (!result.success) {
        ctx.addIssue({
          path: ["wallet_addresses", chain],
          message: result.error.errors[0].message,
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })

export type ICreateAccountConfiguration = z.infer<typeof createAccountConfigurationSchema>

export const createAccountPaymentSchema = z.object({
  plan: z.enum(['free', 'standard', 'continuous'])
})

export type ICreateAccountPayment = z.infer<typeof createAccountPaymentSchema>

export const createAccountSchema = createAccountDetailsSchema
  .merge(createAccountPackagesSchema)
  .merge(createAccountFirstConfigurationSchema)
  .merge(createAccountPaymentSchema);

export type ICreateAccount = z.infer<typeof createAccountSchema>



export const updateAccountSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z.string(),
  account_type: z.enum(["subscription", "one-time"]),
  package_type: z.enum(["single", "multiple"]),
  interval: z.enum(["daily", "weekly", "monthly", "yearly"]),
  packages: z.array(z.object({
    name: z.enum(["basic", "pro", "enterprise"]),
    description: z.string().optional(),
    amount: z.number(),
  })),
  duration: z.string().optional(), // could be number if it’s a time period
})

export type IUpdateAccount = z.infer<typeof updateAccountSchema>



export const updateAccountWalletSchema = z
  .object({
    webhook_url: z.string().url("Webhook URL must be a valid URL"),
    supported_chains: z
      .array(z.enum(["BSC", "Ton"]))
      .min(1, "Select at least one chain"),
    wallet_addresses: z.record(z.string()),
    token: z.string().optional(), // ✅ add this
  }).superRefine((data, ctx) => {
    for (const chain of data.supported_chains) {
      const validator = walletAddressValidators[chain]
      const wallet = data.wallet_addresses?.[chain]
      const result = validator.safeParse(wallet)

      if (!result.success) {
        ctx.addIssue({
          path: ["wallet_addresses", chain],
          message: result.error.errors[0].message,
          code: z.ZodIssueCode.custom,
        })
      }
    }
  });


export type IUpdateAccountWallet = z.infer<typeof updateAccountWalletSchema>