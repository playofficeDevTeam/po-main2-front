import axios from "axios";
import { useMutation } from "react-query";

type IPaymentApproval = {
  paymentId: number;
  paymentKey: string;
  orderId: string;
  amount: number;
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
