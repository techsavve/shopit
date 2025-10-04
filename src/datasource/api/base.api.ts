import IResponse from "@/lib/types/response";
import axios from "axios"

type Props = { isToken: boolean };
export const apiInstance = (request:Props = { isToken: false }) => {
    const token = typeof window !== "undefined" && localStorage.getItem("zypay_dashboard_access_token");
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
};

export const handleRequest = async <Response>(response: any) : Promise<IResponse<Response>>=> {
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
                return { status: false, error: [], message: error.message }
            }
            return { 
                status: false,
                no_token: data.no_token,
                error: data.error,
                message: data.message
            }
        }
        return { status: false, error: [], message: error.message }
    } catch (err) {
        return { status: false, error: [], message: `${err}` }
    }
}
