import { useRecoilState } from "recoil";
import { userFormData } from "../OrderSheet_pg/Var_userFormData";

export default function App({ onClick = () => {} }) {
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  return (
    <div
      className="flex font-medium px-10 py-1 rounded-lg cursor-pointer  w-max  border-2 text-gray-600"
      onClick={() => {
        window.localStorage.setItem(
          "userFormDataState",
          JSON.stringify(userFormDataState)
        );
        onClick();
      }}
    >
      수정완료
    </div>
  );
}
