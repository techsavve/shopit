import { apiInstance, handleError, handleRequest } from "@/datasource/api/base.api";
import { IPaymentAccount } from "@/lib/types/entity/account/account";
import { IMerchant } from "@/lib/types/entity/merchant/merchant";
import IError from "@/lib/types/error";
import { ICreateAccount, IGetAccount, IUpdateAccount, IUpdateAccountWallet } from "@/lib/types/request/account";
import { toast } from "sonner";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type OnboardingStatus = 'start' | 'account-setup' | 'packages' | 'configure' | 'confirm' | 'success'

interface AccountData {
  isLoading: boolean;
  isProgressLoading: boolean;
  errors: IError[];
  account?: Omit<IPaymentAccount, 'user'>;

  onboardingStatus?: OnboardingStatus
  onboarding: ICreateAccount
}

interface AccountStore extends AccountData {
    createAccount: (request: ICreateAccount) => Promise<void>
    getCurrentAccount: (merchant: IMerchant, onSuccess?: () => void) => Promise<void>
    switchAccount: (request: IGetAccount) => Promise<void>
    updateAccount: (request: IUpdateAccount) => Promise<void>
    updateAccountWallet: (request: IUpdateAccountWallet) => Promise<void>

    setOnboarding: (status: OnboardingStatus, data?: Partial<ICreateAccount>) => void
    setOnboardingData: (data?: AccountData['onboarding']) => void,
}

export const useAccount = create<AccountStore>()(devtools((set, get) => ({
    isLoading: true,
    isProgressLoading: false,
    errors: [],
    onboardingStatus: 'start',
    onboarding: {
        name: "",
        description: "",
        account_type: "one-time",
        package_type: "multiple",
        interval: "daily",
        packages: [{ name: "pro", amount: 20 }],
        supported_chains: [],
        plan: "Free"
    },

    createAccount: async (request: ICreateAccount) => {
        try {
            set({ isProgressLoading: true });
            const response = await apiInstance().post("/account/onboard", request)
                .then(handleRequest<IPaymentAccount>).catch(handleError);

            console.log("response: ", response)
            if (response.status) {
                set({ account: response.data });
                set({ isProgressLoading: false, onboardingStatus: 'success' });
                return;
            }
            set({ errors: response.error, isProgressLoading: false });
            toast("Uh oh! Something went wrong.", { description: `${response.message}` });
        } catch (e) {
            console.log("e", e);
            set({ errors: [{ message: 'network error' }], isProgressLoading: false });
        }
    },

    getCurrentAccount: async (merchant: IMerchant, onSuccess?: () => void) => {
        try {
            const account_id = merchant?.setting?.accounts?.[0]?.id;
            if (!account_id) {
                toast("Uh oh!", { description: 'merchant do not have an account' });
                set({ isLoading: false });
                return;
            }
            const response = await apiInstance().get(`/account/onboard/${account_id}`).then(handleRequest<IPaymentAccount>).catch(handleError);
            console.log("getCurrentAccount: ", response)
            if (response.status) {
                set({ account: response.data, isLoading: false, onboardingStatus: undefined });
                onSuccess && onSuccess();
                return;
            }
            set({ errors: response.error, isLoading: false });
            toast("Uh oh! Something went wrong.", { description: `${response.message}` });
            return;
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        } finally {
            set({ isLoading: false });
        }
    },

    switchAccount: async ({ account_id }: IGetAccount) => {
        try {
            set({ isLoading: true });
            const response = await apiInstance().get(`/account/onboard/${account_id}`).then(handleRequest<IPaymentAccount>).catch(handleError);
            if (response.status) {
                set({ account: response.data, isLoading: false });
                return;
            }
            set({ errors: response.error });
            toast(`${response.message}`, { description: "Uh oh! Unable to get account." });
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        } finally {
            set({ isLoading: false });
        }
    },

    updateAccount: async (request: IUpdateAccount) => {
        try {
            const { account } = get()
            set({ isProgressLoading: true });
            const response = await apiInstance().put(`account/setting/${account?.id}`, request)
                .then(handleRequest<IPaymentAccount>).catch(handleError);

            console.log("response: ", response)
            if (response.status) {
                set({ account: response.data });
                set({ isProgressLoading: false, onboardingStatus: 'success' });
                return;
            }
            set({ errors: response.error, isProgressLoading: false });
            toast("Uh oh! Something went wrong.", { description: `${response.message}` });
        } catch (e) {
            console.log("e", e);
            set({ errors: [{ message: 'network error' }], isProgressLoading: false });
        }
    },

    updateAccountWallet: async (request: IUpdateAccountWallet) => {
        try {
            const { account } = get();
            set({ isProgressLoading: true });
            const response = await apiInstance().put(`account/setting/wallet/${account?.id}`, request)
                .then(handleRequest<IPaymentAccount>).catch(handleError);

            if (response.status) {
                set({ account: response.data });
                set({ isProgressLoading: false, onboardingStatus: 'success' });
                return;
            }
            set({ errors: response.error, isProgressLoading: false });
            toast("Uh oh! Something went wrong.", { description: `${response.message}` });
        } catch (e) {
            console.log("e", e);
            set({ errors: [{ message: 'network error' }], isProgressLoading: false });
        }
    },

    setOnboarding: (status?: OnboardingStatus, data?: Partial<ICreateAccount>) => {
        set({ onboardingStatus: status });
        data && set((prev) => ({ ...prev, onboarding: { ...prev.onboarding ,...data} }));
    },
    
    setOnboardingData: (data?: AccountData['onboarding']) => {
        set({ onboarding: data });
    }
})));