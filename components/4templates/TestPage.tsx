import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOCAL_SAVED_MEMVER_ID } from "../common/ExternalBoot";
import useConversionApi from "../hooks/useConversionApi";

export default function App() {
  const conversionApiMutation = useConversionApi();
  return (
    <>
      <div className="flex">
        <div
          className="m-4 p-4 border cursor-pointer "
          onClick={() => {
            console.log("click");
            conversionApiMutation({
              variables: {
                input: {
                  event_name: "PageView",
                  event_id: "test event id",
                },
              },
            }).catch((e) => {
              console.log(e);
            });
          }}
        >
          버튼
        </div>
      </div>
    </>
  );
}
