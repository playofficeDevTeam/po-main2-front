import { gql, useMutation } from "@apollo/client";
import {
  ConversionApi,
  ConversionApiVariables,
} from "./__generated__/ConversionApi";

export const CONVERSION_API = gql`
  mutation ConversionApi($input: ConversionApiInput!) {
    conversionApi(input: $input) {
      ok
      error
    }
  }
`;

export default function useConversionApi() {
  // useMutation (graphql)
  const [conversionApiMutation, { data, loading, error }] = useMutation<
    ConversionApi,
    ConversionApiVariables
  >(CONVERSION_API, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  const conversionApiMutation_dataAdded = async (input) => {
    conversionApiMutation({
      variables: {
        input: { ...input, event_source_url: (window as any).location.href },
      },
    }).catch((e) => {
      console.log(e);
    });
  };

  return conversionApiMutation_dataAdded;
}
