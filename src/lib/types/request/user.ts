import { z } from "zod";

export type SignUpUserRequest = {
    first_name: string;
    second_name: string;
    email_address: string;
    password: string;
}

export type SignInUserRequest = {
    email_address: string;
    password: string;
}

export type SendConfirmationRequest = {
    email_address: string
}

export type IUserRequest = {
    email_address: string;
}

export type ConfirmCodeRequest = {
    email_address: string;
    code: string;
}

export type ChangePasswordRequest = {
    email_address?: string;
    code?: string;
    password: string;
    confirm_password: string;
}

export const verificationSchema = z.object({
    password: z.string().optional(),
    code: z.string().optional(), // required conditionally
});