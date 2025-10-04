// components/charts/line-chart.tsx
'use client'

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function LineChart({ data }: { data: { month: string; value: number }[] }) {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1" // Tailwind indigo-500
            strokeWidth={2}
            dot={{ fill: '#6366f1' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}