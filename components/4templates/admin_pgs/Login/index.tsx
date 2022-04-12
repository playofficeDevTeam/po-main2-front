import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { adminLoggedInVar } from "../../../common/apollo";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import LogedIn from "./LogedIn";
import LogedOut from "./LogedOut";

export default function App() {
  const adminLoggedInState = useReactiveVar(adminLoggedInVar);

  const tokenCheck = useTokenCheck();
  useEffect(() => {
    tokenCheck("query", () => {});
  }, []);

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
