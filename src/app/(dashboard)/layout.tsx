"use client"
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useMerchant } from "@/hooks/merchant/merchant";
import { useEffect, useRef } from "react";
import { LoadingScreen } from "@/components/loading/loading-screen";
import { Separator } from "@radix-ui/react-separator";
import { CreateAccountModal } from "./_components/create/create-modal";
import { useAccount } from "@/hooks/account/account";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUserLoaded = useRef(false);
  const isAccountLoaded = useRef(false);
  const { merchant, getMe } = useMerchant();
  const { onboardingStatus, setOnboarding, getCurrentAccount } = useAccount();

  useEffect(() => {
    if (!isUserLoaded.current) getMe();
    isUserLoaded.current = true;
  }, []);

  useEffect(() => {
    if (!merchant?.id) return;
    if (!isAccountLoaded.current) getCurrentAccount(merchant);
    isAccountLoaded.current = true;
  }, [merchant]);

  const onClose = () => {
    if (!merchant?.setting.accounts?.length) return;
    if (merchant?.setting.accounts?.length < 1) return;
    
    setOnboarding(undefined)
  }
  
  return (
    <>
      <LoadingScreen/>
      {<CreateAccountModal
        isOpen={onboardingStatus !== undefined}
        onClose={onClose}
      />}
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/60 dark:bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <div className="gap-2 px-4 pt-4 pb-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
