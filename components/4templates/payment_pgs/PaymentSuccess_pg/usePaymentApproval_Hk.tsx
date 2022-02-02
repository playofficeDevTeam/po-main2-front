import axios from "axios";
import { useMutation } from "react-query";

type IPaymentApproval = {
  paymentMethod: string;
  paymentKey: string;
  orderId: string;
  amount: string;
};

export const usePaymentApproval = () => {
  const mutation = useMutation((input: IPaymentApproval) => {
    return axios.post(
      process.env.NEXT_PUBLIC_API_HOST + "/payment/approval",
      input
    );
  });
  return mutation;
};
