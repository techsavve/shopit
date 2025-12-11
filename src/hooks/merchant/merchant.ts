import { apiInstance, handleError, handleRequest } from "@/datasource/api/base.api";
import { IMerchant, IUpdateNotifications, IUpdateProfile } from "@/lib/types/entity/merchant/merchant";
import { toast } from "sonner";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface MerchantData {
  merchant?: IMerchant;
  isLoading: boolean
}

interface MerchantStore extends MerchantData {
    getMe: () => Promise<void>;
    updateMe: (merchant: Partial<IUpdateProfile>) => Promise<void>;
    updateNotification: (request: IUpdateNotifications) => Promise<void>;
    clear: () => Promise<void>;
    update: (merchant: Partial<IMerchant>) => Promise<void>;
}

export const useMerchant = create<MerchantStore>()(devtools((set) => ({
    isLoading: true,
    merchant: undefined,
    getMe: async () => {
        try {
            const response = await apiInstance().get("/personal/profile").then(handleRequest<IMerchant>).catch(handleError); 
            console.log("response: ", response);
            if (!localStorage.getItem('zypay_dashboard_access_token')) window.location.href = `/sign-in?redirect_url=${window.location.href}`;
            
            if (response.status) {
                set({ merchant: response.data, isLoading: false });
                return;
            }
            if (response.no_token) window.location.href = `/signin?redirect_url=${window.location.href}`;
            toast("Uh oh! Something went wrong.", { description: `${response.message}` });
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    updateMe: async (request: IUpdateProfile) => {
        try {
            const response = await apiInstance().put("/personal/profile", request).then(handleRequest<IMerchant>).catch(handleError); 
            console.log("response: ", response);
            if (!localStorage.getItem('zypay_dashboard_access_token')) window.location.href = `/sign-in?redirect_url=${window.location.href}`;
            
            if (response.status) {
                set({ merchant: response.data });
                return;
            }
            if (response.no_token) window.location.href = `/signin?redirect_url=${window.location.href}`;
            toast("Uh oh! Something went wrong.", { description: `${response.message}` });
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    updateNotification: async (request: IUpdateNotifications) => {
        try {
            const response = await apiInstance().put("/personal/profile/notification", request).then(handleRequest<IMerchant>).catch(handleError); 
            console.log("response: ", response);
            if (!localStorage.getItem('zypay_dashboard_access_token')) window.location.href = `/sign-in?redirect_url=${window.location.href}`;
            
            if (response.status) {
                set({ merchant: response.data });
                return;
            }
            if (response.no_token) window.location.href = `/signin?redirect_url=${window.location.href}`;
            toast("Uh oh! Something went wrong.", { description: `${response.message}` });
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    clear: () => set((state) => ({ ...state, merchant: undefined })),
    update: (merchant: Partial<IMerchant>) => set((state) => ({ 
        ...state,
        merchant: { ...(state.merchant as IMerchant), ...merchant },
    })),
})));