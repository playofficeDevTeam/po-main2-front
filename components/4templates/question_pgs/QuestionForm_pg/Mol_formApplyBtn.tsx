import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { LOCAL_SAVED_MEMVER_ID } from "../../../common/ExternalBoot";
import { convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber } from "../../payment_pgs/OrderSheet_pg/Mol_formApplyBtn";
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
import ChannelService from "../../../common/ChannelService";

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
              (data.createQuestion.id ?? -1).toString()
            );
            router.push("/consulting/complete");
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

          //memberId 가져오기
          const memberId = window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID);

          const phoneNumber =
            convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber(
              userFormDataState[2].trim()
            );
          console.log(phoneNumber);
          if (["+821028983692"].includes(phoneNumber)) {
            throw Error("일시적인 오류로 문의를 제출하지 못했습니다.");
          }

          const channelTalk = new ChannelService();
          channelTalk.shutdown(); // 현재 채널톡 인스턴스를 셧다운합니다.
          channelTalk.boot({
            pluginKey: process.env.NEXT_PUBLIC_CHANNEL_IO_KEY,
            memberId: window.localStorage.getItem(LOCAL_SAVED_MEMVER_ID),
          });

          createQuestion({
            variables: {
              input: {
                memberId,
                brandName: userFormDataState[0].trim(),
                name: userFormDataState[1].trim(),
                phoneNumber:
                  convertKoreanPhoneNumberToInternationalPhoneNumberAndRemoveNonNumber(
                    userFormDataState[2].trim()
                  ),
                email: userFormDataState[3].trim(),
                budget: userDetail1FormDataState[0] + "",
                productLink: userDetail1FormDataState[1] + "",
                uniqueness: userDetail1FormDataState[2] + "",
                isAgency: userDetail1FormDataState[3] as boolean,
              },
            },
          });
        } catch (error) {
          alert(error);
        }
      }}
    >
      <div className="px-4 text-lg">콘텐츠 컨설팅 신청</div>
    </RoundedOrangeBtn>
  );
}
