import { IAccountWallet, IPackage } from "./account/account";
import { IBlockchainType } from "./wallet";

export type IGetTransaction = { id: string; };

export type IGetTransactions = { 
    account_id: string;
    status?: string;
    from?: Date;
    to?: Date;
    blockchain?: IBlockchainType[];
    amount_min?: number;
    amount_max?: number;
    page?: number;
    limit?: number;

};

export type ISecureTransaction = {
    id: string;
    errors: string[];
    from: {
        email: string;
        address: string
        // user_wallet: IUserWallet
    };
    to: { 
        wallet_address: string;
        account_wallet?: IAccountWallet
    };
    blockchain: 'Ton' | 'BSC';
    timeout: number;
    package: IPackage;
    status: 'success' | 'pending' | 'failed';
    created_at: Date;
    updated_at: Date;
}