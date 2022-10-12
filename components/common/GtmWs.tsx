import { gql, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { useGtm } from "../hooks/useGtm";
import { LOCAL_SAVED_MEMVER_ID } from "./ExternalBoot";

const GTM_SUB = gql`
  subscription gtmSub($input: GtmSubInput!) {
    gtmSub(input: $input) {
      ok
      error
      event
      eventModel
    }
  }
`;

export default function App() {
  const { data, loading, error } = useSubscription(GTM_SUB, {
    variables: {
      input: {
        channelTalkMemberId: window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID),
      },
    },
  });

  const sendGtm = useGtm();

  useEffect(() => {
    if (data) {
      sendGtm({
        event: data.gtmSub.event,
        eventModel: JSON.parse(data.gtmSub.eventModel),
      });
      console.log(data);
    }
  }, [data]);

  return <></>;
}
