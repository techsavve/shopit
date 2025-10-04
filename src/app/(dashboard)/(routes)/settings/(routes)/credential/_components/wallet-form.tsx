"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect, Tooltip } from "@mantine/core";
import { CopyIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAccount } from "@/hooks/account/account";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { IUpdateAccountWallet, updateAccountWalletSchema } from "@/lib/types/request/account";
import { getSpecificError } from "@/lib/helpers/error_handler";
import { VerificationModal } from "../../../_components/verification_modal";
import { Icons } from "@/components/icons";

export function WalletForm() {
  const { account, updateAccountWallet, errors, isProgressLoading } = useAccount();
  const [tab, setTab] = useState<"production" | "sandbox">("production");
  const [ modalOpen, setModalOpen ] = useState(false);

  const form = useForm<IUpdateAccountWallet>({
    resolver: zodResolver(updateAccountWalletSchema),
    defaultValues: {
      webhook_url: "",
      supported_chains: [],
      wallet_addresses: {},
      token: "",
    },
  });

  useEffect(() => {
    if (!account) return;
    const apiInfo = tab === "production" ? account.api_info : account.sandbox_info;

    const wallet_addresses = Object.fromEntries(
      account.wallets.map((wallet) => [wallet.blockchain, wallet.master_wallet_address])
    );

    form.reset({
      supported_chains: account.wallets.map((w) => w.blockchain),
      wallet_addresses,
      webhook_url: apiInfo.webhook_url || "",
    });
  }, [account, tab, form]);

  if (!account) return <p>Loading secure wallet config...</p>;

  const apiInfo = tab === "production" ? account.api_info : account.sandbox_info;

  const copyToClipboard = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    toast({ title: `${label} copied to clipboard` });
  };

  const handleSubmitRequest = () => {
    setModalOpen(true); // Trigger modal for verification
  };

  const handleVerified = (authCode: string) => {
    form.setValue('token', authCode)
    const data = form.getValues(); // Get current form values
    updateAccountWallet(data); // Proceed with API call
    setModalOpen(false);
  };

  return (
    <>
      <Tabs value={tab} onValueChange={(val) => setTab(val as "production" | "sandbox")} className="space-y-6">
        <TabsList>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitRequest)} className="space-y-6">
              <FormItem>
                <FormLabel>Blockchains</FormLabel>
                <Controller
                  control={form.control}
                  name="supported_chains"
                  render={({ field }) => (
                    <MultiSelect
                      data={[
                        { label: "Ton", value: "Ton" },
                        { label: "BSC", value: "BSC" },
                      ]}
                      placeholder="Select blockchains"
                      value={field.value}
                      onChange={field.onChange}
                      error={form.formState.errors.supported_chains?.message ?? getSpecificError("supported_chains", errors)}
                      searchable
                    />
                  )}
                />
                <FormMessage />
              </FormItem>

              {form.watch("supported_chains")?.map((chain) => (
                <div key={chain}>
                  <Tooltip
                    label={`This is the USDT wallet address where you want to receive payments on ${chain}.`}
                    withArrow
                    position="top-start"
                  >
                    <Input
                      label={`${chain} Wallet Address (USDT)`}
                      placeholder={`Enter your ${chain} wallet address`}
                      {...form.register(`wallet_addresses.${chain}` as const)}
                      error={
                        form.formState.errors.wallet_addresses?.[chain]?.message ??
                        getSpecificError(`wallet_addresses.${chain}`, errors)
                      }
                    />
                  </Tooltip>
                  <p className="text-xs text-muted-foreground mt-1">
                    Double-check this wallet is correct and supports USDT on {chain}.
                  </p>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FormLabel className="text-sm text-muted-foreground">Access Token</FormLabel>
                  <Input value={apiInfo.access_token} readOnly disabled />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-0 right-0 mt-7 mr-2"
                    onClick={() => copyToClipboard("Access Token", apiInfo.access_token)}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <FormLabel className="text-sm text-muted-foreground">Public Key</FormLabel>
                  <Input value={apiInfo.public_key} readOnly disabled />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-0 right-0 mt-7 mr-2"
                    onClick={() => copyToClipboard("Public Key", apiInfo.public_key)}
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="md:col-span-2 relative">
                  <FormLabel className="text-sm text-muted-foreground">Secret Key</FormLabel>
                  <Input
                    type="password"
                    value={apiInfo.secret_key.replace(/./g, "*")}
                    readOnly
                    disabled
                  />
                  <FormDescription>
                    🔐 Secret keys cannot be edited. Regenerate from your dashboard.
                  </FormDescription>
                </div>
              </div>

              <FormField
                control={form.control}
                name="webhook_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webhook URL ({tab})</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="https://..." />
                    </FormControl>
                    <FormDescription>
                      This must be a secure HTTPS endpoint that handles webhook events.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="bg-yellow-100 border border-yellow-300 text-sm text-yellow-900 p-4 rounded-md">
                ⚠️ <strong>Security Notice:</strong> Do not share API credentials. Only use them in secure server environments.
              </div>

              <Button type="submit" className="mt-4" disabled={isProgressLoading}>
                { !isProgressLoading && <>Save {tab === "production" ? "Production" : "Sandbox"} Settings</>}
                {isProgressLoading && ( <><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Loading...</> )}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      <VerificationModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onVerified={handleVerified}
      />
    </>
  );
}
