import { apiInstance, handleError, handleRequest } from "@/datasource/api/base.api";
import { objectToQueryString } from "@/lib/helpers/url_handler";
import { IGetTransaction, IGetTransactions, ISecureTransaction } from "@/lib/types/entity/transaction";
import { IPaginateResponse } from "@/lib/types/request/pagination";
import { toast } from "sonner";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TransactionData {
  isLoading: boolean;
  transaction?: ISecureTransaction;
  transactions: IPaginateResponse<ISecureTransaction>;
}

interface TransactionStore extends TransactionData {
    setLoading: (state: boolean) => void;
    
    getTransaction: (transaction: IGetTransaction) => Promise<void>;
    getTransactions: (transactions: IGetTransactions) => Promise<void>;
}

export const useTransaction = create<TransactionStore>()(devtools((set) => ({
  isLoading: false,
  transactions: {
    list: [],
    total: 0,
    has_next: false
  },
  
  getTransaction: async (request: IGetTransaction) => {
    try {
      set({ isLoading: true});
      const response = await apiInstance().get(`/transaction/${request.id}`)
        .then(handleRequest<ISecureTransaction>).catch(handleError);
      if (response.status) {
          set({ transaction: response.data });
          return;
      }
      toast("Uh oh! Something went wrong.", { description: `${response.message}` });
    } catch (e) {
      toast("Uh oh! Something went wrong.", { description: `${(e as any)?.message ?? e}` });
    }
  },

  getTransactions: async (request: IGetTransactions) => {
    try {
      set({ isLoading: true});
      console.log("getTransactions request: ", request);
      const response = await apiInstance().get(`/transaction${objectToQueryString(request)}`)
        .then(handleRequest<IPaginateResponse<ISecureTransaction>>).catch(handleError);
      console.log("getTransactions: ", response);
      if (response.status) {
          set({ transactions: response.data });
          return; 
      }
      toast("Uh oh! Something went wrong.", { description: `${response.message}` });
    } catch (e) {
        toast("Uh oh! Something went wrong.", { description: `${(e as any)?.message ?? e}` });
    }
  }
})));