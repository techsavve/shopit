"use client";

import { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ShieldAlert } from "lucide-react";
import { apiInstance, handleError, handleRequest } from "@/datasource/api/base.api";
import { IWebAuth } from "@/lib/types/entity/merchant/auth";
import { useMerchant } from "@/hooks/merchant/merchant";
import { verificationSchema } from "@/lib/types/request/user";
import IResponse from "@/lib/types/response";
import { Icons } from "@/components/icons";

type VerificationForm = {
  password?: string;
  code?: string;
};

interface VerificationModalProps {
  opened: boolean;
  onClose: () => void;
  onVerified: (authCode: string) => void;
}

export function VerificationModal({
  opened,
  onClose,
  onVerified,
}: VerificationModalProps) {
  const { merchant } = useMerchant();

  const [useEmail, setUseEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
  });

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const clear = () => {
    reset();
    setEmailSent(false);
    setResendCountdown(0);
  };

  const handlePasswordSubmit = async (data: VerificationForm) => {
    if (!data.password) {
      toast({ title: "Password is required." });
      return;
    }

    try {
      setLoading(true);
      const response: IResponse<IWebAuth> = await apiInstance()
        .post("/auth/verify/password", { password: data.password })
        .then(handleRequest<IWebAuth>)
        .catch(handleError);

      if (!response.status) {
        toast({ title: "Verification failed", description: "Invalid password." });
        response.error.map((error) => {
          if (!error.field) return;
          setError(error.field as any, { message: error.message })
        })
        setLoading(false);
        return;
      }

      onVerified(response.data.web_token);
      toast({ title: "Identity verified" });
      onClose();
      clear();
    } catch {
      toast({ title: "Network error", description: "Try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      const response = await apiInstance()
        .post("/auth/verify/email/send")
        .then(handleRequest<IWebAuth>)
        .catch(handleError);

      if (!response.status) {
        setLoading(false);
        response.error.map((error) => {
          if (!error.field) return;
          setError(error.field as any, { message: error.message })
        })
        toast({ title: "Failed to send code" });
        return;
      }

      toast({ title: "Verification code sent." });
      setEmailSent(true);
      setResendCountdown(60);
    } catch {
      toast({ title: "Error", description: "Could not send code." });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (data: VerificationForm) => {
    if (!data.code) {
      toast({ title: "Code is required." });
      return;
    }

    try {
      setLoading(true);
      const response = await apiInstance()
        .post("/auth/verify/email/verify", { code: data.code })
        .then(handleRequest<IWebAuth>)
        .catch(handleError);

      if (!response.status || !response.data?.authCode) {
        toast({ title: "Invalid code", description: "Code may be incorrect or expired." });
        return;
      }

      onVerified(response.data.web_token);
      toast({ title: "Identity verified" });
      onClose();
      clear();
    } catch {
      toast({ title: "Network error", description: "Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="🔐 Identity Verification" centered size="md">
      <div className="space-y-4 max-w-[480px]">
        <div className="bg-yellow-100 text-yellow-900 border border-yellow-300 p-4 rounded-md text-sm flex gap-2">
          <ShieldAlert className="w-5 h-5 mt-[2px]" />
          <div>
            <strong>Security Notice:</strong> You must verify your identity before editing sensitive information.
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {useEmail ? "Email Verification" : "Password Verification"}
          </p>
          <Button
            variant="link"
            className="text-xs"
            onClick={() => {
              setUseEmail((prev) => !prev);
              clear();
            }}
          >
            Switch to {useEmail ? "Password" : "Email"}
          </Button>
        </div>

        {useEmail ? (
          <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-2">
            <Input
              value={merchant?.personal.email_address ?? ""}
              readOnly
              placeholder="you@example.com"
              autoComplete="email"
              className="bg-gray-100 cursor-not-allowed"
            />

            {emailSent && (
              <>
                <Input
                  placeholder="Enter verification code"
                  {...register("code")}
                  autoComplete="one-time-code"
                />
                {errors.code && <p className="text-sm text-red-600">{errors.code.message}</p>}
              </>
            )}

            {!emailSent ? (
              <Button onClick={handleSendCode} disabled={loading}>
                {loading ? <><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> "Sending Code..."</> : "Send Verification Code"}
              </Button>
            ) : (
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  onClick={handleSendCode}
                  variant="ghost"
                  className="text-xs"
                  disabled={resendCountdown > 0 || loading}
                >
                  {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend Code"}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> "Verifying..."</> : "Verify & Continue"}
                </Button>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              autoComplete="current-password"
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Verify and Continue"}
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
}
