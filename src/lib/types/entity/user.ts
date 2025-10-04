import { IBlockchainType, IGeneralWallet, IWallet } from "./wallet";

export type IGetSubscriber = { id: string; };

export type IGetSubscribers = { 
    account_id: string;
    from?: Date;
    to?: Date;
    amount_min?: number;
    amount_max?: number;
    page?: number;
    limit?: number;

};

export type IGeneralUserWallet = {
    id: string;
    email: string;
    account_id: string;
    type: 'sandbox' | 'production';
    wallet: IGeneralWallet;
    created_at: Date;
    updated_at: Date;
}

export type IGeneralUser = {
    id: string;
    email: string;
    wallets: IGeneralUserWallet[];
    created_at: Date;
    updated_at: Date;
}