export type IBlockchainType = 'Ton' | 'BSC';

export interface IGeneralWallet {
  id: string;
  address: string;
  blockchain: IBlockchainType;
  type: 'forwarder' | 'payout';
}

export interface IWallet {
  id: string;
  address: string;
  blockchain: IBlockchainType;
  type: 'forwarder' | 'payout';
  merchant_address: string;
  developer_address: string;
}