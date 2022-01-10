import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "/home/app/components/common/Layout";

export default function App() {
  const isMobile = useReactiveVar(isMobileVar);

  return <div className=" text-orange-500 font-bold text-2xl">서비스</div>;
}
