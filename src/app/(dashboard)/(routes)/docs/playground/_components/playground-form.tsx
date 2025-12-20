"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Send, Loader2 } from "lucide-react"

const paymentFormSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    blockchain: z.enum(["BSC", "Ton"], {
        required_error: "Please select a blockchain",
    }),
    package_name: z.string().optional(),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

interface PlaygroundFormProps {
    onSubmit: (data: PaymentFormValues) => Promise<void>
    isLoading?: boolean
    packageType?: "single" | "multiple"
    packages?: Array<{ name: string; subscription_fee: number }>
}

export function PlaygroundForm({
    onSubmit,
    isLoading = false,
    packageType = "single",
    packages = []
}: PlaygroundFormProps) {
    const form = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            email: "",
            blockchain: undefined,
            package_name: "",
        },
    })

    const handleSubmit = async (data: PaymentFormValues) => {
        await onSubmit(data)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Payment Request
                </CardTitle>
                <CardDescription>
                    Configure and send a test payment transaction
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Customer Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="customer@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Email to identify the customer
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="blockchain"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blockchain</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select blockchain" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="BSC">BSC (BNB Smart Chain)</SelectItem>
                                            <SelectItem value="Ton">Ton Network</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Blockchain network for payment
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {packageType === "multiple" && packages.length > 0 && (
                            <FormField
                                control={form.control}
                                name="package_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Package</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select package" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {packages.map((pkg) => (
                                                    <SelectItem key={pkg.name} value={pkg.name}>
                                                        {pkg.name} - ${pkg.subscription_fee}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select a subscription package
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Payment Request
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
