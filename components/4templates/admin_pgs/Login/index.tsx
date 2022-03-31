import { useRecoilState } from "recoil";
import LogedIn from "./LogedIn";
import LogedOut from "./LogedOut";
import { adminLogedInAtom } from "./Var_loginData";

export default function App() {
  // 로그인상태
  const [adminLogedInState, setAdminLogedInState] =
    useRecoilState(adminLogedInAtom);
  if (adminLogedInState) {
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
