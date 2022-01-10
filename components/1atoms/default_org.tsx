import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "/home/app/components/common/Layout";

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);
  return <></>;
}
