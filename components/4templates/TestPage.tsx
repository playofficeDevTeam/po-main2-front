import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOCAL_SAVED_MEMVER_ID } from "../common/ExternalBoot";

const GTM_PUB = gql`
  mutation gtmPub($input: GtmPubInput!) {
    gtmPub(input: $input) {
      ok
      error
    }
  }
`;

export default function App() {
  // useMutation
  const [gtmPub] = useMutation(GTM_PUB);

  //input state
  const [input, setInput] = useState("");

  return (
    <>
      <div className="">
        <input
          className="border border-gray-300 w-12"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className=" m-2 border border-gray-200 p-2"
          onClick={() => {
            gtmPub({
              variables: {
                input: {
                  channelTalkMemberId: window.localStorage.getItem(
                    LOCAL_SAVED_MEMVER_ID
                  ),
                  event: input,
                  eventModel: "eventModel",
                },
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
