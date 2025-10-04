"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Group, Tooltip } from "@mantine/core";
import { ShieldAlert } from "lucide-react";

export default function BillingForm() {
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress || !network || !amount) {
      alert("Please complete all required fields.");
      return;
    }

    setProcessing(true);
    try {
      // TODO: send payment request to backend or crypto payment API
      alert("Payment request submitted securely.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 shadow-xl rounded-2xl">
      <CardContent>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Crypto Billing</h2>
          <p className="text-sm text-muted-foreground">
            Enter the wallet details to initiate a crypto transaction. Ensure all information is accurate.
          </p>
        </div>

        <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md text-sm text-yellow-900 flex gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 mt-[2px]" />
          <div>
            <strong>Security Notice:</strong> Double-check recipient wallet addresses. Transactions are irreversible. Ensure you're operating in a secure environment.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="walletAddress">Recipient Wallet Address</Label>
            <Input
              id="walletAddress"
              placeholder="0xABC..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="network">Blockchain Network</Label>
            <Input
              id="network"
              placeholder="e.g. Ethereum, BSC, Polygon"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (in USDT)</Label>
            <Input
              id="amount"
              placeholder="e.g. 50.00"
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Payment Note (optional)</Label>
            <Textarea
              id="note"
              placeholder="What is this payment for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          <Separator className="my-4" />

          <div className="flex justify-end">
            <Button type="submit" disabled={processing} className="w-full md:w-auto">
                {processing ? "Processing..." : "Submit Crypto Payment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
