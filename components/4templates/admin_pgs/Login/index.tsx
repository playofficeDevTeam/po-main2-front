import { useReactiveVar } from "@apollo/client";
import { adminLoggedInVar } from "../../../common/apollo";
import LogedIn from "./LogedIn";
import LogedOut from "./LogedOut";

export default function App() {
  const adminLoggedInState = useReactiveVar(adminLoggedInVar);
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
