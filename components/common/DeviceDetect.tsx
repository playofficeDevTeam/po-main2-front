import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";
import { isMobile as isMobile_lib } from "react-device-detect";

export const isMobileAtom = atom({
  key: "isMobileAtom",
  default: false,
});
const MinWidth: any = styled.div`
  min-width: ${(props: { isMobile: boolean }) =>
    props.isMobile ? "10rem" : "64rem"};
`;
export default function DeviceDetect({ children }) {
  const [isMobile, setIsMolbile] = useRecoilState(isMobileAtom);
  const [deviceDetectSuccessed, setDeviceDetectSuccessed] = useState(false);
  useEffect(() => {
    const asyncEffect = async () => {
      await setIsMolbile(isMobile_lib);
      await setDeviceDetectSuccessed(true);
    };
    asyncEffect();
  }, [setIsMolbile, setDeviceDetectSuccessed]);
  return deviceDetectSuccessed ? (
    <>
      <MinWidth isMobile={isMobile}>{children}</MinWidth>
    </>
  ) : (
    <></>
  );
}
