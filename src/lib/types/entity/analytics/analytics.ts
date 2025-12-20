export type IAnalyticsType = 'Sandbox' | 'Production';

export type IAnalytics = {
  analytics_type: IAnalyticsType;
  period_start: Date;
  period_end: Date;
  total_transactions: number;
  successful_transactions: number;
  failed_transactions: number;
  pending_transactions: number;
  success_rate: number;
  failed_rate: number;
  total_revenue: number;
  revenue_trend: number;
  created_at: Date;
  updated_at: Date;
}