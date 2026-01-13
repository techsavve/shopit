import { IBlockchainType } from "./wallet";

export type BlockchainType = IBlockchainType;

// Payout participant/wallet configuration
export interface IPayoutParticipant {
    id: string;
    email: string;
    destination_address: string;
    blockchain: BlockchainType;
    status: string;
    created_at: string;
}

// Payout activation status
export interface IPayoutActivationStatus {
    is_active: boolean;
    account_id: string;
    participants: IPayoutParticipant[];
}

// Request to activate payout (matches backend ActivatePayoutRequest)
export interface IActivatePayoutRequest {
    account_id: string;
    blockchain: BlockchainType;
}

// Request to add payout participant
export interface IAddPayoutParticipantRequest {
    account_id: string;
    destination_address: string;
    blockchain: BlockchainType;
    email: string;
}

// Single payout response
export interface IPayoutResponse {
    id: string;
    status: string;
    amount: number;
    blockchain: BlockchainType;
    destination_address: string;
    email: string;
    hash?: string;
    reference_id?: string;
    created_at: string;
}

// Request to create single payout
export interface ICreatePayoutRequest {
    account_id: string;
    email_address: string;
    amount: number;
    blockchain: BlockchainType;
    reference_id?: string;
    description?: string;
}

// Single recipient in bulk payout
export interface IBulkPayoutRecipient {
    email_address: string;
    amount: number;
    reference_id?: string;
}

// Request to create bulk payouts
export interface ICreateBulkPayoutRequest {
    account_id: string;
    blockchain: BlockchainType;
    recipients: IBulkPayoutRecipient[];
}

// Bulk payout result for single recipient
export interface IBulkPayoutResult {
    email: string;
    status: string;
    payout_id?: string;
    error?: string;
}

// Bulk payout response
export interface IBulkPayoutResponse {
    total_submitted: number;
    successful: number;
    failed: number;
    results: IBulkPayoutResult[];
}

// Paginated payout list response
export interface IPayoutListResponse {
    list: IPayoutResponse[];
    total: number;
    page: number;
    last_page: number;
}

// Query parameters for payout list
export interface IPayoutListQuery {
    account_id: string;
    page?: number;
    limit?: number;
    status?: string;
    blockchain?: BlockchainType;
}

// Request to cancel payout
export interface ICancelPayoutRequest {
    payout_id: string;
}
