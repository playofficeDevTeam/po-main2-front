import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { userLoggedInVar } from "../../../common/apollo";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import LogedIn from "./LogedIn";
import LogedOut from "./LogedOut";

export default function App() {
  const tokenCheck = useTokenCheck();
  useEffect(() => {
    tokenCheck("query", () => {});
  }, []);
  const userLogedInState = useReactiveVar(userLoggedInVar);
  return <>{userLogedInState ? <LogedIn /> : <LogedOut />}</>;
}
