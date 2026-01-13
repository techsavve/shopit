export type IAnalyticsType = 'Sandbox' | 'Production';

// Transaction statistics for a specific origin (payment or payout)
export interface ITransactionStats {
  total_transactions: number;
  successful_transactions: number;
  failed_transactions: number;
  pending_transactions: number;
}

export type IAnalytics = {
  analytics_type: IAnalyticsType;
  period_start: Date;
  period_end: Date;
  total_transactions: number;
  successful_transactions: number;
  failed_transactions: number;
  pending_transactions: number;
  // Payment specific stats
  payment: ITransactionStats;
  // Payout specific stats
  payout: ITransactionStats;
  success_rate: number;
  failed_rate: number;
  total_revenue: number;
  total_outflow: number;
  revenue_trend: number;
  outflow_trend: number;
  created_at: Date;
  updated_at: Date;
}