import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ConversionApiInput } from "../../__generated__/globalTypes";
import {
  ConversionApi,
  ConversionApiVariables,
} from "./__generated__/ConversionApi";
import crypto from "crypto";
import { useRouter } from "next/router";

export const CONVERSION_API = gql`
  mutation ConversionApi($input: ConversionApiInput!) {
    conversionApi(input: $input) {
      ok
      error
    }
  }
`;

//쿠키 가져오기 함수
export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || "";
  } else {
    return "";
  }
};

//crypto 이용해서 sha256 해싱 하는 함수
const hash = async (stringToHash: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(stringToHash);
  return hash.digest("hex");
};

export default function useConversionApi() {
  // useMutation (graphql)
  const [conversionApiMutation, { data, loading, error }] = useMutation<
    ConversionApi,
    ConversionApiVariables
  >(CONVERSION_API, {
    onCompleted: (data) => {
      console.log(data.conversionApi);
    },
  });
  const conversionApiMutation_dataAdded = async (input: ConversionApiInput) => {
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    const userFormData =
      JSON.parse(window.localStorage.getItem("userFormDataState") || "") || [];

    const hashed_email = await Promise.all(
      ([userFormData[3]] || []).map((value) => hash(value))
    );
    const hashed_phone = await Promise.all(
      ([userFormData[2]] || []).map((value) => hash(value))
    );
    const hashed_last_name = await hash(userFormData[1] || "");

    conversionApiMutation({
      variables: {
        input: {
          ...input,
          event_source_url: (window as any).location.href,
          // user_data_fbp: fbp,
          // user_data_fbc: fbc,
          user_data_email: hashed_email,
          user_data_phone: hashed_phone,
          user_data_last_name: hashed_last_name,
        },
      },
    }).catch((e) => {
      console.log(e);
    });
  };

  return conversionApiMutation_dataAdded;
}
