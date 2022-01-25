import { useRecoilState } from "recoil";
import { userFormData } from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import { userDetail1FormData } from "../QuestionForm_pg/Var_userDetail1FormData";

export default function App({ onClick = () => {} }) {
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);

  return (
    <div
      className="flex font-medium px-10 py-1 rounded-lg cursor-pointer  w-max  border-2 text-gray-600"
      onClick={() => {
        window.localStorage.setItem(
          "userFormDataState",
          JSON.stringify(userFormDataState)
        );
        window.localStorage.setItem(
          "userDetail1FormDataState",
          JSON.stringify(userDetail1FormDataState)
        );
        onClick();
      }}
    >
      수정완료
    </div>
  );
}
