import { CardHeader, CardTitle, CardContent, Card } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TransactionsTable = ({ transactions }: { transactions: any[] }) => (
  <Card className="border-0 shadow-sm">
    <CardHeader className="pb-4">
      <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      {transactions.length > 0 ? (
        <div className="overflow-hidden">
        <Table>
          <TableHeader>
              <TableRow className="border-b border-slate-100 dark:border-slate-800">
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Transaction ID
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Customer
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                  Date
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {transactions.map((tx, index) => (
                <TableRow key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                    {tx.id}
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">
                    {tx.customer}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 dark:text-slate-100">
                    ${tx.amount}
                  </TableCell>
                <TableCell>
                    <Badge 
                      variant={
                        tx.status === "success" 
                          ? "default" 
                          : tx.status === "pending" 
                          ? "secondary" 
                          : "destructive"
                      }
                      className={
                      tx.status === "success"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                        : tx.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"
                          : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                      }
                  >
                    {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {new Date(tx.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuItem>Refund</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-slate-400 dark:text-slate-600 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">No recent transactions found.</p>
        </div>
      )}
    </CardContent>
  </Card>
)
