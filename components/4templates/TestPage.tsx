import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";

const SUBSCRIPTION_TEST = gql`
  subscription jong {
    jong
  }
`;

const MUTATION_TEST = gql`
  mutation jongStart($input: String!) {
    jongStart(input: $input)
  }
`;

export default function App() {
  const { data, loading } = useSubscription(SUBSCRIPTION_TEST, {
    variables: { channelId: "channelId232" },
  });

  // useMutation
  const [jongStart] = useMutation(MUTATION_TEST);

  //input state
  const [input, setInput] = useState("");

  return (
    <>
      <div className="">
        {loading && <div className="">loading</div>}
        <div>{data?.jong}</div>
        <input
          className="border border-gray-300 w-12"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className=" m-2 border border-gray-200 p-2"
          onClick={() => {
            console.log("clicked");
            jongStart({
              variables: {
                input: input,
              },
            });
          }}
        >
          제출 버튼
        </button>
      </div>
    </>
  );
}
