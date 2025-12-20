"use client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTransaction } from "@/hooks/transaction/transaction"
import { useAccount } from "@/hooks/account/account"
import { ITransactionFilters, TransactionFilters } from "../_components/transaction_filter"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const PER_PAGE = 5

export default function TransactionsPage() {
  const [filters, setFilters] = useState<ITransactionFilters>({})
  const [page, setPage] = useState(1)
  const { account } = useAccount();
  const { getTransactions, transactions } = useTransaction();

  useEffect(() => {
    if (!account?.id) return;
    getTransactions({
      account_id: account.id,
      limit: PER_PAGE,
      page,
      status: filters.status,
      blockchain: filters.blockchain,
      account: filters.date?.from,
      user: filters.date?.to,
    })
  }, [account?.id, filters, getTransactions, page]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          View and manage all your payment transactions
        </p>
        <TransactionFilters onFilter={setFilters} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {transactions.list.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((tx) => (
                <div key={tx.id} className="border p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-semibold">From: {tx?.account?.email}</p>
                      <p className="text-xs text-muted-foreground">{tx?.account?.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">To: {tx?.user?.wallet_address}</p>
                      <p className="text-xs text-muted-foreground">{tx?.blockchain}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Amount: <span className="font-medium">${tx?.package?.subscription_fee}</span></p>
                    <Badge variant={tx?.status === 'success' ? 'default' : tx?.status === 'pending' ? 'secondary' : 'destructive'}>
                      {tx?.status?.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Created: {format(tx?.created_at, 'PPpp')}</p>
                </div>
              ))}
              {transactions.list.length === 0 && (
                <p className="text-center text-muted-foreground">No transactions found</p>
              )}
            </div>
          </ScrollArea>
          {/* Pagination */}
          {transactions.total > PER_PAGE && (
            <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {[...Array(Math.ceil(transactions.total / PER_PAGE))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    onClick={() => setPage(pageNum)}
                    className="px-3"
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(transactions.total / PER_PAGE)))}
                disabled={page === Math.ceil(transactions.total / PER_PAGE)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}