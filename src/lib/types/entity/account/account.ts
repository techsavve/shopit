import { IAnalytics } from "../analytics/analytics";
import { IMerchant } from "../merchant/merchant";
import { IBlockchainType, IWallet } from "../wallet";

export type IPlanType = "free" | "standard" | "continuous";
export type IAccountType = 'subscription' | 'one-time';
export type IPackageType = 'single' | 'multiple';
export type IInterval = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type IPackageName = 'basic' | 'pro' | 'enterprise';


export type IAccountWallet = {
    id: string
    blockchain: IBlockchainType;
    merchant_address: string;
    balance: number;
    wallet: IWallet;
    account: IPaymentAccount;
}

export type IApiInfo = {
    access_token: string;
    public_key: string;
    secret_key: string;
    webhook_url: string;
}

export type IPackage = {
    name: IPackageName;
    description?: string;
    subscription_fee: number;
}

export type IAccountDetails = {
    account_type: IAccountType | 'flexible';
    package_type: IPackageType;
    interval?: IInterval;
    intervals?: IInterval[];
    packages: IPackage[];
    interval_packages?: Record<string, IPackage[]>;
    duration?: string;
}

export type IAccountSettings = {
    plan: IPlanType;
    balance: number;
    subscription_status: string;
    subscription_date: Date;
    subscription_expiry_date: Date,
}

export type IPaymentAccount = {
    id: string;
    name: string;
    description: string;
    plan: IPlanType;
    total_balance: number;
    details: IAccountDetails;
    created_at: Date;
    updated_at: Date;
    merchant: IMerchant;
    analytics: IAnalytics[];
    wallets: IAccountWallet[];
    sandbox_info: IApiInfo;
    api_info: IApiInfo;
    settings: IAccountSettings;
}