import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Br_mo from "../../../1atoms/Br_mo";
import RoundedOrangeBtn from "../../../1atoms/RoundedOrangeBtn";
import { userFormData } from "../OrderSheet_pg/Var_userFormData";
import useIsMobile from "/home/app/components/hooks/useIsMobile";

export default function App({ trigger = false }) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const data = {
    title: (
      <>
        비주얼 인플루언서 콘텐츠 마케팅
        <br />
        신청 완료되었습니다!
      </>
    ),
    p: (
      <>
        캠페인 진행과 관련 된 안내 메일을
        <Br_mo />
        발송 해드렸습니다. <br />
        <span className="text-blue-500">
          📌메일 내 1. 가이드 확인 2. 요청 사항
          <Br_mo />
          입력을 꼭 완료해주세요.
        </span>
        <br /> [ {userFormDataState[0]} ]에 알맞는 전략을 통해 <br />
        빠르게 성장할 수 있도록
        <Br_mo />
        도와 드리겠습니다.
      </>
    ),
  };
  return isMobile ? (
    <section className="py-10">
      <div className="flex justify-center">
        <img src="/assets/결제/톱니체크.png" alt="톱니체크" />
      </div>
      <div className="mb-6"></div>
      <div className="w- 11/12 mx-auto text-center ">
        <div className="text-xl leading-normal mb-8 font-bold">
          {data.title}
        </div>
        <div className="text-lg font-bold">{data.p}</div>

        <div
          className={`mo-max my-4 transition duration-200 relative ${
            trigger ? "" : "translate-y-2 opacity-0"
          }`}
        >
          <div className=" max-w-xs mx-auto bg-indigo-400 text-white px-4 py-3 rounded-md text-shadow-sm mb-2">
            메일함에서 [
            <b>
              캠페인 진행과 관련된 <br /> 안내 메일
            </b>
            ]이 보이지 않는 경우! <br />
            <span className="text-yellow-100 font-bold">
              스팸 메일함을 확인해주세요. <br />
            </span>{" "}
            스팸 메일함에서도 보이지 않을 경우 <br /> 포케팅 홈페이지 하단의
            전화번호로 <br />
            연락 주시면 안내 도와드리겠습니다.
          </div>
        </div>

        <div className="mb-8"></div>
        <div className="center">
          <RoundedOrangeBtn
            onClick={() => {
              router.push("/service");
            }}
          >
            <div className="px-10">완료하기</div>
          </RoundedOrangeBtn>
        </div>
        <div className="mb-6"></div>
      </div>
    </section>
  ) : (
    <section className="pc-max border-2 px-10 py-8">
      <div className="flex justify-center">
        <img src="/assets/결제/톱니체크.png" alt="톱니체크" />
      </div>
      <div className="mb-6"></div>
      <div className="w- 11/12 mx-auto text-center ">
        <div className="text-xl leading-normal mb-8 font-bold">
          {data.title}
        </div>
        <div className="text-lg font-bold">{data.p}</div>

        <div
          className={` my-4 transition duration-200 relative ${
            trigger ? "" : "translate-y-2 opacity-0"
          }`}
        >
          <div className=" w-max  mx-auto bg-indigo-400 text-white px-4 py-3 rounded-md text-shadow-sm mb-2">
            메일함에서 [<b>캠페인 진행과 관련된 안내 메일</b>
            ]이 보이지 않는 경우! <br />
            <span className="text-yellow-100 font-bold">
              스팸 메일함을 확인해주세요. <br />
            </span>{" "}
            스팸 메일함에서도 보이지 않을 경우 <br /> 포케팅 홈페이지 하단의
            전화번호로 <br />
            연락 주시면 안내 도와드리겠습니다.
          </div>
        </div>

        <div className="mb-8"></div>
        <div className="center">
          <RoundedOrangeBtn
            onClick={() => {
              router.push("/service");
            }}
          >
            <div className="px-14">완료하기</div>
          </RoundedOrangeBtn>
        </div>
        <div className="mb-8"></div>
      </div>
    </section>
  );
}
