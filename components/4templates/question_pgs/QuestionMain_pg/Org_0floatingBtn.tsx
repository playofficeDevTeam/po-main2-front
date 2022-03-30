import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { headerFloatingBtnAtom } from "/home/app/components/3organisms/Org_header/Org_header";
import useIsMobile from "../../../hooks/useIsMobile";
import Mol_goToQuestionFormPg_Btn from "./Mol_goToQuestionFormPg_Btn";

export default function App({ trigger = false }) {
  const [headerFloatingBtnState, setHeaderFloatingBtnState] = useRecoilState(
    headerFloatingBtnAtom
  );
  // 피씨헤더
  useEffect(() => {
    setHeaderFloatingBtnState(
      <>
        <Mol_goToQuestionFormPg_Btn />
      </>
    );
    return () => {
      setHeaderFloatingBtnState(<></>);
    };
  }, [setHeaderFloatingBtnState]);

  const isMobile = useIsMobile();
  return isMobile ? (
    // 모바일
    // 모바일
    // 모바일
    <div className="w-full center">
      <div
        className="fixed z-50 "
        style={
          trigger
            ? {
                opacity: "100%",
                bottom: "1.75rem",
                transition: "bottom ease 0s 0s, opacity ease 0.2s",
              }
            : {
                opacity: "0%",
                bottom: "1000000rem",
                transition: " bottom ease 0s 0.2s,  opacity ease 0.2s",
              }
        }
      >
        <Mol_goToQuestionFormPg_Btn />
      </div>
    </div>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <></>
  );
}
