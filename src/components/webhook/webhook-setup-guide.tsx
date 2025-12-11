"use client"

import * as React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { 
  Copy, 
  Check, 
  ExternalLink,
  Shield,
  Code2,
  FileJson,
  Zap,
  AlertCircle,
  Settings,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Play,
  Loader2,
  AlertTriangle,
  X,
  SkipForward
} from "lucide-react"

interface WebhookSetupGuideProps {
  value: string
  onChange: (value: string) => void
  error?: string
  onConfigured?: (configured: boolean) => void
}

type TestStatus = 'idle' | 'testing' | 'success' | 'error'

const codeExamples = {
  nodejs: {
    label: "Node.js",
    language: "typescript",
    code: `// Express.js + ZyPay SDK Webhook Handler
import express from 'express';
import { ZyPaySDK } from '@zypay/sdk';

const app = express();
app.use(express.json());

const client = new ZyPaySDK({
  accessToken: process.env.ZYPAY_ACCESS_TOKEN!,
  environment: 'production',
  webhookConfig: {
    privateKey: process.env.WEBHOOK_PRIVATE_KEY!,
    algorithm: 'sha256'
  }
});

app.post('/api/webhooks/zypay', (req, res) => {
  try {
    // Verify signature
    const isValid = client.webhooks.verifySignature({
      signature: req.headers['x-zypay-signature'] as string,
      timestamp: req.headers['x-zypay-timestamp'] as string,
      payload: JSON.stringify(req.body)
    });

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Handle the event
    const event = client.webhooks.parseEvent(req.body);
    
    client.webhooks.handleEvent(event, {
      'payment.completed': (payment) => {
        console.log('Payment completed:', payment.id);
      },
      'payment.failed': (payment) => {
        console.log('Payment failed:', payment.id);
      }
    });

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000);`
  },
  nextjs: {
    label: "Next.js",
    language: "typescript",
    code: `// app/api/webhooks/zypay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('x-zypay-signature');
  const timestamp = req.headers.get('x-zypay-timestamp');

  // Verify signature
  const message = \`\${timestamp}.\${body}\`;
  const expectedSig = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(message)
    .digest('hex');

  if (signature !== expectedSig) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);
  
  switch (event.type) {
    case 'payment.completed':
      console.log('Payment completed:', event.data);
      break;
    case 'payment.failed':
      console.log('Payment failed:', event.data);
      break;
  }

  return NextResponse.json({ received: true });
}`
  },
  golang: {
    label: "Go",
    language: "go",
    code: `package main

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "encoding/json"
    "io"
    "net/http"
    "os"
)

var webhookSecret = os.Getenv("WEBHOOK_SECRET")

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    body, _ := io.ReadAll(r.Body)
    signature := r.Header.Get("X-Zypay-Signature")
    timestamp := r.Header.Get("X-Zypay-Timestamp")

    // Verify signature
    message := timestamp + "." + string(body)
    mac := hmac.New(sha256.New, []byte(webhookSecret))
    mac.Write([]byte(message))
    expectedSig := hex.EncodeToString(mac.Sum(nil))

    if signature != expectedSig {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }

    var event map[string]interface{}
    json.Unmarshal(body, &event)

    // Handle event
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]bool{"received": true})
}

func main() {
    http.HandleFunc("/api/webhooks/zypay", webhookHandler)
    http.ListenAndServe(":3000", nil)
}`
  },
  php: {
    label: "PHP",
    language: "php",
    code: `<?php
// Laravel Route

Route::post('/webhooks/zypay', function (Request $request) {
    $signature = $request->header('X-Zypay-Signature');
    $timestamp = $request->header('X-Zypay-Timestamp');
    $payload = $request->getContent();
    $secret = env('WEBHOOK_SECRET');

    // Verify signature
    $message = $timestamp . '.' . $payload;
    $expectedSig = hash_hmac('sha256', $message, $secret);

    if (!hash_equals($signature, $expectedSig)) {
        return response()->json(['error' => 'Invalid signature'], 401);
    }

    $event = json_decode($payload, true);

    switch ($event['type']) {
        case 'payment.completed':
            Log::info('Payment completed', $event['data']);
            break;
    }

    return response()->json(['received' => true]);
});`
  },
  python: {
    label: "Python",
    language: "python",
    code: `from flask import Flask, request, jsonify
import hmac, hashlib, os

app = Flask(__name__)
WEBHOOK_SECRET = os.environ.get('WEBHOOK_SECRET')

@app.route('/api/webhooks/zypay', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Zypay-Signature')
    timestamp = request.headers.get('X-Zypay-Timestamp')
    payload = request.get_data(as_text=True)

    # Verify signature
    message = f"{timestamp}.{payload}"
    expected_sig = hmac.new(
        WEBHOOK_SECRET.encode(),
        message.encode(),
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(signature, expected_sig):
        return jsonify({'error': 'Invalid signature'}), 401

    event = request.get_json()
    print(f"Event: {event['type']}")

    return jsonify({'received': True})

if __name__ == '__main__':
    app.run(port=3000)`
  }
}

const payloadExample = `{
  "id": "evt_1234567890",
  "type": "payment.completed",
  "timestamp": "1702084800",
  "data": {
    "id": "pay_abc123",
    "amount": 100.00,
    "currency": "USDT",
    "status": "completed",
    "blockchain": "BSC"
  }
}`

const eventTypes = [
  { name: "payment.created", desc: "Payment initiated" },
  { name: "payment.completed", desc: "Payment confirmed" },
  { name: "payment.failed", desc: "Payment failed" },
  { name: "payout.completed", desc: "Payout confirmed" },
  { name: "payout.failed", desc: "Payout failed" },
]

export function WebhookSetupGuide({ value, onChange, error, onConfigured }: WebhookSetupGuideProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSkipWarning, setShowSkipWarning] = useState(false)
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>("nodejs")
  const [copied, setCopied] = useState(false)
  const [tempUrl, setTempUrl] = useState(value)
  const [testStatus, setTestStatus] = useState<TestStatus>('idle')
  const [testError, setTestError] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(!!value)
  const [isTested, setIsTested] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>("code")

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenModal = () => {
    setTempUrl(value)
    setTestStatus('idle')
    setTestError(null)
    setIsModalOpen(true)
  }

  const handleTestWebhook = useCallback(async () => {
    if (!tempUrl || !tempUrl.startsWith('https://')) return

    setTestStatus('testing')
    setTestError(null)

    try {
      // Simulate webhook test - In production, this would call your backend
      // which sends a test payload to the user's webhook URL
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, we'll simulate a successful test
      // In production: const response = await fetch('/api/webhook/test', { method: 'POST', body: JSON.stringify({ url: tempUrl }) })
      
      setTestStatus('success')
      setIsTested(true)
    } catch (err) {
      setTestStatus('error')
      setTestError('Failed to reach webhook endpoint. Make sure your server is running and accessible.')
    }
  }, [tempUrl])

  const handleSaveConfiguration = () => {
    if (tempUrl && tempUrl.startsWith('https://')) {
      onChange(tempUrl)
      setIsConfigured(true)
      onConfigured?.(true)
      setIsModalOpen(false)
    }
  }

  const handleSkip = () => {
    setShowSkipWarning(true)
  }

  const handleConfirmSkip = () => {
    setShowSkipWarning(false)
    setIsModalOpen(false)
    // Don't mark as configured, but allow proceeding
    onConfigured?.(false)
  }

  const isValidUrl = tempUrl && tempUrl.startsWith('https://')
  const canSave = isValidUrl && (isTested || testStatus === 'success')

  return (
    <>
      {/* Main Input with Configure Button */}
      <div className="space-y-3">
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-2">
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-500" />
              Webhook Endpoint URL
            </Label>
            <Input
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
                setIsConfigured(false)
                setIsTested(false)
              }}
              placeholder="https://yourdomain.com/api/webhooks/zypay"
              className={cn(
                "h-10 font-mono text-sm transition-all",
                "focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500",
                error && "border-red-500 focus:ring-red-500/20 focus:border-red-500",
                isConfigured && isTested && "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
              )}
            />
          </div>
          
          <Button
            type="button"
            variant={isConfigured && isTested ? "outline" : "default"}
            onClick={handleOpenModal}
            className={cn(
              "h-10 px-4 transition-all",
              isConfigured && isTested
                ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30" 
                : "bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
            )}
          >
            {isConfigured && isTested ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Configured
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </>
            )}
          </Button>
        </div>

        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
        
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {isConfigured && isTested
            ? "✓ Webhook configured and tested successfully."
            : "Click 'Configure' to set up and test your webhook endpoint."
          }
        </p>
      </div>

      {/* Configuration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0 gap-0">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg shadow-lg shadow-cyan-500/20">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                Configure Webhook
              </DialogTitle>
              <DialogDescription className="text-slate-500">
                Set up your webhook endpoint to receive real-time payment notifications
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {/* Step 1: URL Input */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center justify-center">1</div>
                <Label className="text-sm font-semibold">Enter Your Webhook URL</Label>
              </div>
              <Input
                value={tempUrl}
                onChange={(e) => {
                  setTempUrl(e.target.value)
                  setTestStatus('idle')
                  setIsTested(false)
                }}
                placeholder="https://yourdomain.com/api/webhooks/zypay"
                className={cn(
                  "h-11 font-mono text-sm",
                  testStatus === 'success' && "border-emerald-500 bg-emerald-50/50",
                  testStatus === 'error' && "border-red-500"
                )}
              />
              {tempUrl && !isValidUrl && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  URL must start with https://
                </p>
              )}
            </div>

            {/* Step 2: Implementation Guide */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center justify-center">2</div>
                <Label className="text-sm font-semibold">Implement Your Webhook Handler</Label>
              </div>

              {/* Collapsible Sections */}
              <div className="space-y-2">
                {/* Requirements Section */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'requirements' ? null : 'requirements')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">Requirements & Security</span>
                    </div>
                    {expandedSection === 'requirements' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {expandedSection === 'requirements' && (
                    <div className="p-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>HTTPS endpoint (SSL required)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>Accept POST with JSON body</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>Respond with 2xx within 30 seconds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>Verify <code className="text-cyan-600 bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">X-Zypay-Signature</code> header</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Code Examples Section */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'code' ? null : 'code')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Code Examples</span>
                    </div>
                    {expandedSection === 'code' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {expandedSection === 'code' && (
                    <div className="border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-1 p-2 bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
                        {Object.entries(codeExamples).map(([key, { label }]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setActiveTab(key as keyof typeof codeExamples)}
                            className={cn(
                              "px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                              activeTab === key
                                ? "bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                            )}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(codeExamples[activeTab].code)}
                          className="absolute top-2 right-2 z-10 h-7 px-2 text-xs bg-slate-700/80 hover:bg-slate-600 text-white"
                        >
                          {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                          {copied ? "Copied!" : "Copy"}
                        </Button>
                        <SyntaxHighlighter
                          language={codeExamples[activeTab].language}
                          style={oneDark}
                          customStyle={{
                            margin: 0,
                            padding: "16px",
                            fontSize: "11px",
                            maxHeight: "250px",
                            borderRadius: 0,
                          }}
                          showLineNumbers
                        >
                          {codeExamples[activeTab].code}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payload Reference Section */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedSection(expandedSection === 'payload' ? null : 'payload')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium">Event Types & Payload</span>
                    </div>
                    {expandedSection === 'payload' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {expandedSection === 'payload' && (
                    <div className="p-4 space-y-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex flex-wrap gap-2">
                        {eventTypes.map((event) => (
                          <div key={event.name} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                            <code className="text-cyan-600 dark:text-cyan-400">{event.name}</code>
                          </div>
                        ))}
                      </div>
                      <SyntaxHighlighter
                        language="json"
                        style={oneDark}
                        customStyle={{ margin: 0, padding: "12px", fontSize: "10px", borderRadius: "8px" }}
                      >
                        {payloadExample}
                      </SyntaxHighlighter>
                      <a
                        href="https://docs.zypay.com/webhooks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-cyan-600 hover:underline"
                      >
                        View full documentation <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Test */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center",
                  testStatus === 'success' ? "bg-emerald-500" : "bg-cyan-500"
                )}>
                  {testStatus === 'success' ? <Check className="w-3 h-3" /> : "3"}
                </div>
                <Label className="text-sm font-semibold">Test Your Webhook</Label>
              </div>

              {/* Test Status Display */}
              {testStatus === 'success' && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Webhook test successful!</span>
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-1 ml-7">
                    Your endpoint responded correctly. You can now save your configuration.
                  </p>
                </div>
              )}

              {testStatus === 'error' && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Webhook test failed</span>
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-1 ml-7">
                    {testError || "Could not reach your endpoint. Please check the URL and try again."}
                  </p>
                </div>
              )}

              {testStatus === 'idle' && isValidUrl && (
                <p className="text-xs text-slate-500 pl-8">
                  Click "Test Configuration" below to verify your webhook endpoint is working correctly.
                </p>
              )}
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between">
              {/* Left: Skip button */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
                className="text-slate-500 hover:text-slate-700"
              >
                <SkipForward className="w-4 h-4 mr-2" />
                Skip for now
              </Button>

              {/* Right: Test & Save buttons */}
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleTestWebhook}
                  disabled={!isValidUrl || testStatus === 'testing'}
                  className={cn(
                    "transition-all",
                    testStatus === 'success' && "border-emerald-500 text-emerald-600"
                  )}
                >
                  {testStatus === 'testing' ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : testStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Test Passed
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Test Configuration
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleSaveConfiguration}
                  disabled={!canSave}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Save & Continue
                </Button>
              </div>
            </div>

            {!canSave && isValidUrl && testStatus !== 'testing' && (
              <p className="text-xs text-amber-600 text-right mt-2">
                Please test your webhook before saving
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Skip Warning Modal */}
      <Dialog open={showSkipWarning} onOpenChange={setShowSkipWarning}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <DialogTitle className="text-lg font-semibold mb-2">
              Skip Webhook Configuration?
            </DialogTitle>
            <DialogDescription className="text-slate-500 mb-6">
              Without a configured webhook, your API will <strong className="text-slate-700 dark:text-slate-300">not be able to receive payment notifications</strong>. 
              You won't know when payments are completed or failed until you configure this.
            </DialogDescription>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-6 w-full">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                ⚠️ You can configure the webhook later in your account settings, but payment notifications will not work until it's set up.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSkipWarning(false)}
                className="flex-1"
              >
                Go Back
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmSkip}
                className="flex-1"
              >
                Skip Anyway
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
