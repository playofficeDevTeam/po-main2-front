import { useRecoilState } from "recoil";
import { isMobileAtom } from "../common/DeviceDetect";

export default function App() {
  const [isMobile, setIsMobile] = useRecoilState(isMobileAtom);
  return isMobile;
}
