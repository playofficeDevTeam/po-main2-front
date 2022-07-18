import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { adminLoggedInVar } from "../../../common/apollo";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import LogedIn from "./LogedIn";
import LogedOut from "./LogedOut";

export default function App() {
  const adminLoggedInState = useReactiveVar(adminLoggedInVar);
  const route = useRouter();

  const tokenCheck = useTokenCheck();
  useEffect(() => {
    tokenCheck("query", () => {});
  }, []);

  const [errorMsgState, setErrorMsgState] = useState(false);

  useEffect(() => {
    if (route.query.error) {
      setErrorMsgState(true);
      if (!errorMsgState) {
        alert(route.query.error);
      }
    }
  }, [route]);

  if (adminLoggedInState) {
    return (
      <>
        <LogedIn />
      </>
    );
  }
  return (
    <>
      <LogedOut />
    </>
  );
}
