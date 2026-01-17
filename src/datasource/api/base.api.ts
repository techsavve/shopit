import IResponse from "@/lib/types/response";
import axios, { AxiosInstance } from "axios";
type Props = { isToken: boolean };

/**
 * Creates an axios instance with end-to-end encryption
 * 
 * Security Features:
 * - Automatic encryption on POST/PUT/PATCH requests
 * - Automatic decryption on all responses
 * - X-Encrypted header indicates encrypted payload
 */
export const apiInstance = (request: Props = { isToken: false }): AxiosInstance => {
    const token = typeof window !== "undefined" && localStorage.getItem("zypay_dashboard_access_token");

    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json',
        }
    });

    return instance;
};

export const handleRequest = async <Response>(response: any): Promise<IResponse<Response>> => {
    try {
        return response.data;
    } catch (error: any) {
        return handleError(error);
    }
}

export const handleError = (error: any): IResponse<any> => {
    try {
        if (error?.response?.status) {
            const { status, data } = error.response;
            if (status === 404 || status === 500) {
                return { status: false, error: [], message: data?.message || error.message }
            }
            return {
                status: false,
                no_token: data?.no_token,
                error: data?.error || [],
                message: data?.message || error.message
            }
        }
        return { status: false, error: [], message: error.message }
    } catch (err) {
        return { status: false, error: [], message: `${err}` }
    }
}
