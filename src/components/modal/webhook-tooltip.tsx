"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { duotoneSpace } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const webhookExamples: Record<string, string> = {
  nodejs: `// Node.js + Express
import crypto from 'crypto'
import express from 'express'
const app = express()
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }))
const secret = process.env.WEBHOOK_SECRET!
app.post('/webhook', (req, res) => {
  const sig = req.headers['x-webhook-signature']
  const digest = crypto.createHmac('sha256', secret).update(req.rawBody).digest('hex')
  if (sig !== digest) return res.status(401).send('Invalid signature')
  console.log('Webhook event:', req.body)
  res.send('OK')
})`,

  golang: `// Go
import (
  "crypto/hmac"
  "crypto/sha256"
  "encoding/hex"
  "io"
  "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
  body, _ := io.ReadAll(r.Body)
  sig := r.Header.Get("X-Webhook-Signature")
  mac := hmac.New(sha256.New, []byte("your-secret"))
  mac.Write(body)
  if hex.EncodeToString(mac.Sum(nil)) != sig {
    http.Error(w, "Invalid signature", 401)
    return
  }
  w.WriteHeader(http.StatusOK)
}`,

  laravel: `// Laravel
Route::post('/webhook', function (Request $request) {
  $sig = $request->header('X-Webhook-Signature');
  $computed = hash_hmac('sha256', $request->getContent(), env('WEBHOOK_SECRET'));
  if (!hash_equals($sig, $computed)) {
    return response('Invalid signature', 401);
  }
  Log::info('Webhook:', $request->all());
  return response('OK', 200);
});`,
}

const languageMap = {
  nodejs: "typescript",
  golang: "go",
  laravel: "php",
}

export function WebhookHoverCard() {
  const [language, setLanguage] = useState<"nodejs" | "golang" | "laravel">("nodejs")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookExamples[language])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button type="button" variant="link" className="text-xs p-0 h-auto">
          View Webhook Example
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[520px] space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {(["nodejs", "golang", "laravel"] as const).map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs font-medium ${
                  language === lang ? "underline text-foreground" : "text-muted-foreground"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="text-blue-600 text-xs flex items-center gap-1"
          >
            <Copy size={14} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <SyntaxHighlighter
          language={languageMap[language]}
          style={duotoneSpace}
          customStyle={{
            borderRadius: "6px",
            padding: "10px",
            fontSize: "11px",
            maxHeight: "280px",
            overflowX: "auto",
          }}
        >
          {webhookExamples[language]}
        </SyntaxHighlighter>
      </HoverCardContent>
    </HoverCard>
  )
}
