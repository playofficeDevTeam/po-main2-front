import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { headerFloatingBtnVar } from "../../../3organisms/Org_header";
import Mol_pricePlan_popup_Btn from "./Mol_pricePlan_popup_Btn";
import { isMobileVar } from "/home/app/components/common/Layout";

export default function App({ trigger = false }) {
  // 피씨헤더
  useEffect(() => {
    headerFloatingBtnVar(
      <>
        <Mol_pricePlan_popup_Btn />
      </>
    );
    return () => {
      headerFloatingBtnVar(<></>);
    };
  }, []);

  const isMobile = useReactiveVar(isMobileVar);
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
        <Mol_pricePlan_popup_Btn />
      </div>
    </div>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <></>
  );
}
