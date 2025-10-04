"use client"

import { useState } from "react"
import { CalendarIcon, FilterIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { DateRange } from "react-day-picker"
import { MultiSelect, RangeSlider, Select } from "@mantine/core"
import { format } from "date-fns"
import { IBlockchainType } from "@/lib/types/entity/wallet"

export type ITransactionFilters = {
  status?: string
  blockchain?: IBlockchainType[]
  amountRange?: [number, number]
  date?: DateRange
}

interface Props {
  onFilter: (filters: ITransactionFilters) => void
  defaultValues?: ITransactionFilters
}

export function TransactionFilters({ onFilter, defaultValues }: Props) {
  const [status, setStatus] = useState<string | undefined>(defaultValues?.status)
  const [blockchain, setBlockchain] = useState<IBlockchainType[]>(defaultValues?.blockchain ?? ["BSC", "Ton"])
  // const [amountRange, setAmountRange] = useState<[number, number]>(defaultValues?.amountRange || [0, 1000])
  const [date, setDate] = useState<DateRange | undefined>(defaultValues?.date)

  const applyFilters = () => {
    // console.log({ status, blockchain, amountRange, date })
    onFilter({ status, blockchain, date })
  }

  const clearFilters = () => {
    setStatus(undefined)
    setBlockchain(["BSC", "Ton"])
    setDate(undefined)
    onFilter({})
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <FilterIcon className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] space-y-4 p-4" align="end">
        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            data={[
              { label: "Success", value: "success" },
              { label: "Pending", value: "pending" },
              { label: "Failed", value: "failed" },
            ]}
            value={status}
            onChange={(value) => setStatus(value ?? undefined)}
            placeholder="Select status"
            searchable
            clearable
            maxDropdownHeight={160}
            classNames={{
              input: "focus-visible:ring-0 focus-visible:ring-offset-0",
            }}
          />
        </div>

        {/* Blockchain */}
        <div>
          <label className="block text-sm font-medium mb-1">Blockchain</label>
          <MultiSelect
            data={[
              { label: "Ton", value: "Ton" },
              { label: "Bsc", value: "BSC" },
            ]}
            value={blockchain}
            onChange={(blockchains) => setBlockchain(blockchains as IBlockchainType[])}
            placeholder="Select blockchain(s)"
            searchable
            clearable
            maxDropdownHeight={160}
            classNames={{
              input: "focus-visible:ring-0 focus-visible:ring-offset-0",
            }}
          />
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium mb-1">Date Range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  `${format(date.from, "PPP")} - ${date.to ? format(date.to, "PPP") : "..."}`
                ) : (
                  <span>Select range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 pt-2">
          <Button variant="ghost" className="w-full" onClick={clearFilters}>
            Clear
          </Button>
          <Button className="w-full" onClick={applyFilters}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
