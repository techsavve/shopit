import { IPaymentAccount } from "../account/account";
import z from 'zod'

export type ISubscription = {
  price_id: string;
  product_id: string;
  status: string;
  start_date: string;
  end_date: string;
};

export type ICustomSetting = {
  default_theme: string;
  is_accepting_request: boolean;
};

export type INotificationSetting = {
  communication_emails: boolean,
  marketing_emails: boolean,
  social_emails: boolean,
  security_emails: boolean,
};

export type ISettings = {
  custom_setting: ICustomSetting;
  subscription: ISubscription;
  notification: INotificationSetting
};

export interface IVerification {
  code: string;
  timeout: number;
}

export type IPersonal = {
  first_name: string;
  surname: string;
  email_address: string;
  profile_image?: string;
  dob?: Date,
  language?: string;
  display_email?: string;
  emails?: string[];
  bio?: string;
};

export type IMerchant = {
  id: string;
  personal: IPersonal;
  setting: ISettings;
  accounts: IPaymentAccount[]
  updated_at: Date;
  created_at: Date;
};

export interface IGeneralMerchant {
  personal: IPersonal;
  updated_at: Date;
  created_at: Date;
}


export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  surname: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  language: z.string({
    required_error: "Please select a language.",
  }),
  display_email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  emails: z.array(z
    .string({
      required_error: "Please select an email to display.",
    })
    .email()),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

export type IUpdateProfile = z.infer<typeof updateProfileSchema>


export const notificationsFormSchema = z.object({
  mobile: z.boolean().default(false).optional(),
  communication_emails: z.boolean().default(false).optional(),
  social_emails: z.boolean().default(false).optional(),
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
})

export type IUpdateNotifications = z.infer<typeof notificationsFormSchema>