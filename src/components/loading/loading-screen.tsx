"use-client"

import { useAccount } from "@/hooks/account/account";
import { useMerchant } from "@/hooks/merchant/merchant";
import { LoadingOverlay } from "@mantine/core";
import { LoadingComponent } from "./loading";

export const LoadingScreen = () => {
    const profile = useMerchant();
    const account = useAccount();
    const isLoading = profile?.isLoading || account?.isLoading;
         
    return (
        <>
            <LoadingOverlay visible={isLoading} loaderProps={{ children: <LoadingComponent/>}} />
            
        </>
    )
}