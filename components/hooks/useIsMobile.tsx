import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "../common/Layout";

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);
  return isMobile;
}
