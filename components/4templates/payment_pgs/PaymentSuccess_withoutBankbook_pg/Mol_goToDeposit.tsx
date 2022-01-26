import { useState } from "react";
import { isMobile } from "react-device-detect";
import Modal1 from "../../../1atoms/Modal1";

const defaultData = {
  h1: <>은행 선택</>,
  p: isMobile ? (
    <>
      입금하실 은행을 선택하시면,
      <br />
      선택하신 은행 앱으로 이동됩니다.
    </>
  ) : (
    <>
      입금하실 은행을 선택하시면,
      <br />
      선택하신 은행 사이트로 이동됩니다.
    </>
  ),
  bankList: [
    {
      name: "기업은행",
      selected: false,
      link: "https://www.ibk.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.ibk.android.ionebank&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/i-one-bank-%EA%B0%9C%EC%9D%B8%EA%B3%A0%EA%B0%9D%EC%9A%A9/id1460543865",
    },
    {
      name: "국민은행",
      selected: false,
      link: "https://www.kbstar.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.kbstar.kbbank&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/kb%EC%8A%A4%ED%83%80%EB%B1%85%ED%82%B9/id373742138",
    },
    {
      name: "신한은행",
      selected: false,
      link: "https://www.shinhan.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.shinhan.sbanking&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%8B%A0%ED%95%9C-%EC%8F%A0-sol-%EC%8B%A0%ED%95%9C%EC%9D%80%ED%96%89-%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0%EB%B1%85%ED%82%B9/id357484932",
    },
    {
      name: "우리은행",
      selected: false,
      link: "https://www.wooribank.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.wooribank.smart.npib&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%9A%B0%EB%A6%AC-won-%EB%B1%85%ED%82%B9/id1470181651",
    },
    {
      name: "농협은행",
      selected: false,
      link: "https://banking.nonghyup.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=nh.smart.banking&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/nh%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%B1%85%ED%82%B9/id1444712671",
    },
    {
      name: "하나은행",
      selected: false,
      link: "https://www.kebhana.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.kebhana.hanapush&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%ED%95%98%EB%82%98%EC%9B%90%ED%81%90-%ED%95%98%EB%82%98%EC%9D%80%ED%96%89-%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EB%B1%85%ED%82%B9/id1362508015",
    },
    {
      name: "카카오뱅크",
      selected: false,
      link: "",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.kakaobank.channel&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%B1%85%ED%81%AC/id1258016944",
    },
    {
      name: "SC은행",
      selected: false,
      link: "https://www.standardchartered.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.scbank.ma30&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/sc%EC%A0%9C%EC%9D%BC%EC%9D%80%ED%96%89-%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%B1%85%ED%82%B9/id1457418899",
    },
    {
      name: "한국씨티은행",
      selected: false,
      link: "https://www.citibank.co.kr/ComMainCnts0100.act",
      androidLink:
        "https://play.google.com/store/apps/details?id=kr.co.citibank.citimobile&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%94%A8%ED%8B%B0%EB%AA%A8%EB%B0%94%EC%9D%BC/id1179759666",
    },
    {
      name: "우체국",
      selected: false,
      link: "https://www.epostbank.go.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=kr.go.epost.app.findZip&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%9A%B0%EC%B2%B4%EA%B5%AD/id435940000",
    },
    {
      name: "경남은행",
      selected: false,
      link: "https://www.knbank.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.knb.psb&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/bnk%EA%B2%BD%EB%82%A8%EC%9D%80%ED%96%89-%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%B1%85%ED%82%B9/id678852685",
    },
    {
      name: "광주은행",
      selected: false,
      link: "https://pib.kjbank.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.kjbank.smart.pbanking&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EA%B4%91%EC%A3%BC%EC%9D%80%ED%96%89-%EA%B0%9C%EC%9D%B8%EB%B1%85%ED%82%B9/id943338870",
    },
    {
      name: "대구은행",
      selected: false,
      link: "https://www.dgb.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=kr.co.dgb.dgbm&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/im%EB%B1%85%ED%81%AC/id1067748687",
    },
    {
      name: "부산은행",
      selected: false,
      link: "https://www.busanbank.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=kr.co.busanbank.mbp&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/bnk%EB%B6%80%EC%82%B0%EC%9D%80%ED%96%89%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%B1%85%ED%82%B9/id1445137607",
    },
    {
      name: "산업은행",
      selected: false,
      link: "https://www.kdb.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=co.kr.kdb.android.smartkdb&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%8A%A4%EB%A7%88%ED%8A%B8kdb/id392572957",
    },
    {
      name: "새마을금고",
      selected: false,
      link: "https://www.kfcc.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.smg.spbs&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/mg%EB%8D%94%EB%B1%85%ED%82%B9/id425089902",
    },
    {
      name: "수협",
      selected: false,
      link: "https://www.suhyup-bank.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.suhyup.psmb&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%88%98%ED%98%91-%ED%8C%8C%ED%8A%B8%EB%84%88%EB%B1%85%ED%81%AC-%EA%B0%9C%EC%9D%B8/id1229985989",
    },
    {
      name: "신협",
      selected: false,
      link: "http://www.cu.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=kr.co.cu.onbank&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%8B%A0%ED%98%91on%EB%B1%85%ED%81%AC/id1484456647",
    },
    {
      name: "전북은행",
      selected: false,
      link: "https://www.jbbank.co.kr/",
      androidLink:
        "https://play.google.com/store/apps/details?id=kr.co.jbbank.smartbank&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%A0%84%EB%B6%81%EC%9D%80%ED%96%89-%EB%89%B4%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%B1%85%ED%82%B9/id1071766252",
    },
    {
      name: "제주은행",
      selected: false,
      link: "https://www.e-jejubank.com/",
      androidLink:
        "https://play.google.com/store/apps/details?id=com.jejubank.jbank.android&hl=ko&gl=US",
      iosLink:
        "https://apps.apple.com/kr/app/%EC%A0%9C%EC%A3%BC%EB%AA%A8%EB%B0%94%EC%9D%BC%EB%B1%85%ED%82%B9-jbank/id1281912279",
    },
  ],
};

export default function App({ data = defaultData }) {
  function checkMobile() {
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

    if (varUA.indexOf("android") > -1) {
      //안드로이드
      return "android";
    } else if (
      varUA.indexOf("iphone") > -1 ||
      varUA.indexOf("ipad") > -1 ||
      varUA.indexOf("ipod") > -1
    ) {
      //IOS
      return "ios";
    } else {
      //아이폰, 안드로이드 외
      return "other";
    }
  }

  const moBankList = data.bankList.filter(
    (val) => val.name !== "제주은행" && val.name !== "신협"
  );
  const pcBankList = data.bankList.filter((val) => val.name !== "카카오뱅크");
  const variableBankList = isMobile ? moBankList : pcBankList;
  const [bankList, setBankList] = useState(variableBankList);
  const bankListToggle = (id) => {
    const newBankList = [...bankList];
    const selectedNewBankList = newBankList.map((val, idx) => ({
      ...val,
      selected: idx === id ? true : false,
    }));
    setBankList(selectedNewBankList);
  };
  const [moreBank, setMoreBack] = useState(false);
  const moreBackToggle = () => {
    setMoreBack(!moreBank);
  };

  return (
    <Modal1
      data={{
        button: (
          <div className="flex  text-shadow-md bg-gradient-to-r from-orange-500 to-yellow-500 px-16 py-3 rounded-full cursor-pointer text-white w-max text-lg">
            입금 하러가기
          </div>
        ),
        modal: (
          <div className={`${isMobile ? "xs-max" : "pc-max w-96 px-4"}`}>
            <div className=" font-bold text-xl mb-4">{data.h1}</div>
            <div className="mb-4">{data.p}</div>
            <div className="grid grid-cols-2 gap-2  mb-4">
              {bankList.map((val, idx) =>
                idx < 7 ? (
                  <div
                    className={`border-2 rounded-md flex justify-center items-center py-2 cursor-pointer ${
                      val.selected ? " border-orange-500 " : ""
                    } `}
                    onClick={() => {
                      bankListToggle(idx);
                    }}
                  >
                    {val.name}
                  </div>
                ) : (
                  <></>
                )
              )}
              <div
                className={`border-2 rounded-md flex justify-center items-center py-2 cursor-pointer ${
                  moreBank ? " bg-gray-50" : ""
                } `}
                onClick={() => {
                  moreBackToggle();
                }}
              >
                더보기
              </div>
            </div>
            {moreBank ? (
              <div className="grid grid-cols-2 gap-2 border-2 bg-gray-50 py-4 mb-4">
                {bankList.map((val, idx) =>
                  idx > 6 ? (
                    <div
                      className={` flex justify-center items-center py-2 cursor-pointer ${
                        val.selected ? " text-orange-500 " : ""
                      } `}
                      onClick={() => {
                        bankListToggle(idx);
                      }}
                    >
                      {val.name}
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
            ) : (
              <></>
            )}
            {isMobile ? (
              // 모바일
              <div className="">
                <a
                  href={
                    checkMobile() === "android"
                      ? bankList.find((val) => val.selected === true)
                          ?.androidLink
                      : bankList.find((val) => val.selected === true)?.iosLink
                  }
                  target="_blank"
                  rel="noreferrer"
                  className=" bg-orange-500 rounded-md text-white text-shadow-sm font-bold mx-auto flex justify-center items-center py-2 text-lg mb-5 cursor-pointer"
                >
                  선택완료
                </a>
              </div>
            ) : (
              // 피씨
              <div className="">
                <a
                  href={bankList.find((val) => val.selected === true)?.link}
                  target="_blank"
                  rel="noreferrer"
                  className=" bg-orange-500 rounded-md text-white text-shadow-sm font-bold mx-auto flex justify-center items-center py-2 mb-5 cursor-pointer"
                >
                  선택완료
                </a>
              </div>
            )}
          </div>
        ),
      }}
    />
  );
}
