"use client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSubscriber } from "@/hooks/subscriber/subscriber"
import { useAccount } from "@/hooks/account/account"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ISubscriberFilters, SubscriberFilters } from "../../_components/subscriber_filter"
import { IGeneralUserWallet, IGetSubscribers } from "@/lib/types/entity/user"

// Types

const PER_PAGE = 5

export default function SubscribersPage() {
  const [filters, setFilters] = useState<ISubscriberFilters>({})
  const [page, setPage] = useState(1)
  const { account } = useAccount()
  const { getSubscribers, subscribers } = useSubscriber()

  useEffect(() => {
    if (!account?.id) return

    const payload: IGetSubscribers = {
      account_id: account.id,
      limit: PER_PAGE,
      page,
      account: filters.date?.from,
      user: filters.date?.to,
      amount_min: filters.amountRange?.[0] ? Number(filters.amountRange?.[0]) : undefined,
      amount_max: filters.amountRange?.[1] ? Number(filters.amountRange?.[1]) : undefined,
    }

    getSubscribers(payload)
  }, [ account?.id, filters, page, getSubscribers ])

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Manage your recurring payment subscribers
        </p>
        <SubscriberFilters onFilter={setFilters} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {subscribers.list.map((sub: IGeneralUserWallet) => (
                <div key={sub.id} className="border p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-semibold">Email: {sub.email}</p>
                      <p className="text-xs text-muted-foreground">Wallet ID: {sub.wallet?.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">Type: {sub.type}</p>
                      <p className="text-xs text-muted-foreground">Account: {sub.account_id}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      Wallet Address:{" "}
                      <span className="font-medium">{sub.wallet?.address || "N/A"}</span>
                    </p>
                    <Badge variant="secondary">ACTIVE</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Joined: {format(new Date(sub?.created_at), "PPpp")}
                  </p>
                </div>
              ))}
              {subscribers.list.length === 0 && (
                <p className="text-center text-muted-foreground">No subscribers found</p>
              )}
            </div>
          </ScrollArea>

          {/* Pagination */}
          {subscribers.total > PER_PAGE && (
            <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {[...Array(Math.ceil(subscribers.total / PER_PAGE))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    onClick={() => setPage(pageNum)}
                    className="px-3"
                  >
                    {pageNum}
                  </Button>
                )
              })}

              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.min(p + 1, Math.ceil(subscribers.total / PER_PAGE)))}
                disabled={page === Math.ceil(subscribers.total / PER_PAGE)}
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
