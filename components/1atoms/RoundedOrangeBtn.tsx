import { useReactiveVar } from "@apollo/client";
import { isMobileVar } from "/home/app/components/common/Layout";

export default function App({ children = <>버튼</>, onClick = () => {} }) {
  const isMobile = useReactiveVar(isMobileVar);
  return (
    <div
      className="flex text-shadow-md bg-gradient-to-r from-orange-500 to-yellow-500 px-7 py-3 rounded-full cursor-pointer text-white w-max items-center "
      onClick={onClick}
    >
      {children}
    </div>
  );
}
