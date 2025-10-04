import { apiInstance, handleError, handleRequest } from "@/datasource/api/base.api";
import { objectToQueryString } from "@/lib/helpers/url_handler";
import { IGetSubscriber, IGetSubscribers, IGeneralUserWallet } from "@/lib/types/entity/user";
import { IPaginateResponse } from "@/lib/types/request/pagination";
import { toast } from "sonner";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SubscriberData {
  isLoading: boolean;
  subscriber?: IGeneralUserWallet;
  subscribers: IPaginateResponse<IGeneralUserWallet>;
}

interface SubscriberStore extends SubscriberData {
    setLoading: (state: boolean) => void;
    
    getSubscriber: (subscriber: IGetSubscriber) => Promise<void>;
    getSubscribers: (subscribers: IGetSubscribers) => Promise<void>;
}

export const useSubscriber = create<SubscriberStore>()(devtools((set) => ({
  isLoading: false,
  subscribers: {
    list: [],
    total: 0,
    has_next: false
  },
  
  getSubscriber: async (request: IGetSubscriber) => {
    try {
      set({ isLoading: true});
      const response = await apiInstance().get(`/subscriber/${request.id}`)
        .then(handleRequest<IGeneralUserWallet>).catch(handleError);
      if (response.status) {
          set({ subscriber: response.data });
          return;
      }
      toast("Uh oh! Something went wrong.", { description: `${response.message}` });
    } catch (e) {
      toast("Uh oh! Something went wrong.", { description: `${(e as any)?.message ?? e}` });
    }
  },

  getSubscribers: async (request: IGetSubscribers) => {
    try {
      set({ isLoading: true});
      console.log("getSubscribers request: ", request);
      const response = await apiInstance().get(`/subscriber${objectToQueryString(request)}`)
        .then(handleRequest<IPaginateResponse<IGeneralUserWallet>>).catch(handleError);
      console.log("getSubscribers: ", response);
      if (response.status) {
          set({ subscribers: response.data });
          return; 
      }
      toast("Uh oh! Something went wrong.", { description: `${response.message}` });
    } catch (e) {
        toast("Uh oh! Something went wrong.", { description: `${(e as any)?.message ?? e}` });
    }
  }
})));