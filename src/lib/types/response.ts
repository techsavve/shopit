import IError from "./error";

type IResponse<T> = {
    status: true;
    data: T;
} | { 
    status: false;
    error: IError[];
    message: string,
    no_token?: boolean;
}
  
export default IResponse;