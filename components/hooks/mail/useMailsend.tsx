import axios from "axios";
import { useMutation } from "react-query";

type SendMailDto = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export const useMailsend = () => {
  const mutation = useMutation((sendMail: SendMailDto) => {
    return axios.post(process.env.NEXT_PUBLIC_API_HOST + "/mail", sendMail);
  });
  return mutation;
};
