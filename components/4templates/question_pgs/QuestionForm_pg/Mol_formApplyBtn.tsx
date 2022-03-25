import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import {
  userFormData,
  userFormDataValidate,
} from "../../payment_pgs/OrderSheet_pg/Var_userFormData";
import { serviceDatasAtom } from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { CREATE_QUESTION } from "./Gql_question";
import {
  userDetail1FormData,
  userDetail1FormDataValidate,
} from "./Var_userDetail1FormData";
import {
  CreateQuestion,
  CreateQuestionVariables,
} from "./__generated__/CreateQuestion";

export default function App({ trigger = false }) {
  const router = useRouter();
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);
  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);
  const [userDetail1FormDataState, setUserDetail1FormDataState] =
    useRecoilState(userDetail1FormData);

  const [createQuestion] = useMutation<CreateQuestion, CreateQuestionVariables>(
    CREATE_QUESTION,
    {
      onCompleted: (data: CreateQuestion) => {
        try {
          if (data) {
            window.localStorage.setItem(
              "questionId",
              (data.createQuestion.questionId ?? -1).toString()
            );
            router.push("/question/complete");
          } else {
            throw "일시적인 오류로 문의사항을 제출하지 못했습니다. 우측하단 채널톡버튼으로 문의해주세요";
          }
        } catch (error) {
          alert(error);
        }
      },
    }
  );

  return (
    <RoundedOrangeBtn
      trigger={trigger}
      onClick={() => {
        try {
          userFormDataValidate.forEach((val, idx) => {
            if (!val.validateFunction(userFormDataState[idx])) {
              const error = val.validateError;
              throw error;
            }
          });
          userDetail1FormDataValidate.forEach((val, idx) => {
            if (!val.validateFunction(userDetail1FormDataState[idx])) {
              const error = val.validateError;
              throw error;
            }
          });
          window.localStorage.setItem(
            "serviceDataState",
            JSON.stringify(serviceDataState)
          );
          window.localStorage.setItem(
            "userFormDataState",
            JSON.stringify(userFormDataState)
          );
          window.localStorage.setItem(
            "userDetail1FormDataState",
            JSON.stringify(userDetail1FormDataState)
          );
          createQuestion({
            variables: {
              input: {
                brandName: userFormDataState[0],
                name: userFormDataState[1],
                phoneNumber: userFormDataState[2],
                email: userFormDataState[3],
                budget: userDetail1FormDataState[0] as string,
                productLink: userDetail1FormDataState[1] as string,
                uniqueness: userDetail1FormDataState[2] as string,
                isAgency: userDetail1FormDataState[3] as boolean,
              },
            },
          });
        } catch (error) {
          alert(error);
        }
      }}
    >
      <div className="px-4 text-lg">전문가 컨설팅 신청</div>
    </RoundedOrangeBtn>
  );
}
