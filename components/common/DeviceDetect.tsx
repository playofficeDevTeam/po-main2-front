import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";
import { isMobile as isMobile_lib } from "react-device-detect";
import { isAdminAtom } from "./UserDetect";

export const isMobileAtom = atom({
  key: "isMobileAtom",
  default: false,
});
const MinWidth: any = styled.div`
  min-width: ${(props: { isMobile: boolean; isAdmin: boolean }) => {
    if (props.isAdmin) {
      return "10rem";
    }
    return props.isMobile ? "10rem" : "64rem";
  }};
`;
export default function DeviceDetect({ children }) {
  const [isMobile, setIsMolbile] = useRecoilState(isMobileAtom);
  const [deviceDetectSuccessed, setDeviceDetectSuccessed] = useState(false);

  const [isAdmin, setIsAdmin] = useRecoilState(isAdminAtom);
  useEffect(() => {
    setIsMolbile(isMobile_lib);
    setDeviceDetectSuccessed(true);
  }, [setIsMolbile, setDeviceDetectSuccessed]);
  return deviceDetectSuccessed ? (
    <>
      <MinWidth isMobile={isMobile} isAdmin={isAdmin}>
        {children}
      </MinWidth>
    </>
  ) : (
    <></>
  );
}
