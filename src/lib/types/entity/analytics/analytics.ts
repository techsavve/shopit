export type IAnalytics = {
    total_transactions_value: number;
    total_transactions_trend: number;
    success_rate_value: number;
    success_rate_trend: number;
    failed_rate_value: number;
    failed_rate_trend: number;
    pending_transactions_value: number;
    pending_transactions_trend: number;
    total_revenue_value: number;
    total_revenue_trend: number;
    created_at: Date;
    updated_at: Date;
  }