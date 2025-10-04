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

export type ISubscriberFilters = {
  amountRange?: [number, number]
  date?: DateRange
}

interface Props {
  onFilter: (filters: ISubscriberFilters) => void
  defaultValues?: ISubscriberFilters
}

export function SubscriberFilters({ onFilter, defaultValues }: Props) {
  // const [amountRange, setAmountRange] = useState<[number, number]>(defaultValues?.amountRange || [0, 1000])
  const [date, setDate] = useState<DateRange | undefined>(defaultValues?.date)

  const applyFilters = () => {
    // console.log({ status, blockchain, amountRange, date })
    onFilter({ date })
  }

  const clearFilters = () => {
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
