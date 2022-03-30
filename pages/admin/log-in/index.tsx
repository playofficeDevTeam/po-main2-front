import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isVisibleHeaderAtom } from "../../../components/3organisms/Org_header/Org_header";
import Login from "../../../components/4templates/admin_pgs/Login";

export default function App() {
  return (
    <>
      <Login />
    </>
  );
}
