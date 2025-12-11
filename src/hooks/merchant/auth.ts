import { apiInstance, handleError, handleRequest } from "@/datasource/api/base.api";
import { IAuth, IChangePassword, IConfirmCode, IConfirmCodeResponse, ILoginUser, IRegisterUser, ISendConfirmation, IWebAuth } from "@/lib/types/entity/merchant/auth";
import IError from "@/lib/types/error";
import { toast } from "sonner";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PasswordState = 'start' | 'confirm' | 'change';

interface AuthData {
    isLoading: boolean;
    errors: IError[];
    recoveryData: {
      email_address?: string;
      token?: string,
      passwordState: PasswordState;
    }
}

interface AuthStore extends AuthData {
    signIn: (request: ILoginUser & { remember_me: boolean }) => Promise<void>
    signUp: (request: IRegisterUser) => Promise<void>
    refreshToken: () => Promise<void>
    sendConfirmation: (request: ISendConfirmation) => Promise<void>
    confirmCode: (request: IConfirmCode) => Promise<void>
    changePassword: (request: IChangePassword) => Promise<void>
    signOut: () => Promise<void>
}

export const useAuth = create<AuthStore>()(devtools((set) => ({
    isLoading: false,
    errors: [],
    recoveryData: { passwordState: 'start' },
    signIn: async (request: ILoginUser & { remember_me: boolean }) => {
        try {
            set({ isLoading: true });
            const response = await apiInstance().post("/auth/signin", request)
                .then(handleRequest<IAuth>).catch(handleError);
            console.log("response: ", response);
            if (response.status) {
                localStorage.setItem('zypay_dashboard_access_token', response.data.access_token);
                if (request.remember_me)
                    localStorage.setItem('zypay_dashboard_refresh_token', response.data.refresh_token);

                var url = new URL(window.location.href);
                if (!url.searchParams.has('redirect_url')) {
                    window.location.href = `/`;
                } else {
                    const newUrl = new URL(url.searchParams.get('redirect_url')!);
                    url.host = newUrl.host;
                    url.pathname = newUrl.pathname;
                    window.location.href = newUrl.href;
                }
                return;
            }
            set({ isLoading: false });
            set({ errors: response.error });

            if (response.message) {
                toast("Uh oh! Something went wrong.", { description: `${response.message}` });
            }
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    signUp: async (request: IRegisterUser) => {
        try {
            const response = await apiInstance().post("/auth/signup", request).then(handleRequest<IAuth>).catch(handleError);
            if (response.status) {
                localStorage.setItem('zypay_dashboard_access_token', response.data.access_token);
                window.location.href = `/`;
                return;
            }
            set({ errors: response.error });
            if (response.message) {
                toast("Uh oh! Something went wrong.", { description: `${response.message}` });
            }
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    refreshToken: async () => {
        try {
            const response = await apiInstance().post("/auth/refresh-token", {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("bybu_app_refresh_token")}` }
            }).then(handleRequest<IAuth>).catch(handleError);
   
            if (response.status) {
                localStorage.setItem('zypay_dashboard_access_token', response.data.access_token);

                var url = new URL(window.location.href);
                if (!url.searchParams.has('redirect_url')) {
                    window.location.href = `/`;
                } else {
                    const newUrl = new URL(url.searchParams.get('redirect_url')!);
                    url.host = newUrl.host;
                    url.pathname = newUrl.pathname;
                    window.location.href = newUrl.href;
                }
                return;
            }
            set({ errors: response.error });
            if (response.message) {
                toast("Uh oh! Something went wrong.", { description: `${response.message}` });
            }
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },
    sendConfirmation: async (request: ISendConfirmation) => {
        try {
            const response = await apiInstance().post("/auth/password/send-code", request).then(handleRequest<string>).catch(handleError);
            console.log("response: ", response);
            if (response.status) {
                set({ recoveryData: {
                    email_address: request.email_address,
                    passwordState: 'confirm'
                }});
                return;
            }
            set({ errors: response.error });
            if (response.message) {
                toast("Uh oh! Something went wrong.", { description: `${response.message}` });
            }
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    confirmCode: async (request: IConfirmCode) => {
        try {
            const response = await apiInstance().post("/auth/password/confirm-code", request).then(handleRequest<IConfirmCodeResponse>).catch(handleError);
            if (response.status) {
                set({ recoveryData: {
                    email_address: request.email_address,
                    passwordState: 'change'
                }});
                return;
            }
            set({ errors: response.error });
            if (response.message) {
                toast("Uh oh! Something went wrong.", { description: `${response.message}` });
            }
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    changePassword: async (request: IChangePassword) => {
        try {
            const response = await apiInstance().post("/auth/password/change-password", request).then(handleRequest<string>).catch(handleError);

            if (response.status) {
                toast(response.data, { description: `${response.data}` });
                window.location.href = '/sign-in';
                return;
            }
            set({ errors: response.error });
            if (response.message) {
                toast("Uh oh! Something went wrong.", { description: `${response.message}` });
            }
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    },

    signOut: async () => {
        try{
            localStorage.removeItem('zypay_dashboard_access_token');
            localStorage.removeItem('zypay_dashboard_refresh_token');
            window.location.href = '/sign-in';
            return;
        } catch (error) {
            toast("Uh oh! Something went wrong.", { description: `${error}` });
        }
    }
})));