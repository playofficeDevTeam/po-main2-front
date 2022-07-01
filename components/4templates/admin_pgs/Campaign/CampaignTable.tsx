import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import {
  createCampaign,
  createCampaignVariables,
} from "./__generated__/createCampaign";
import {
  deleteCampaign,
  deleteCampaignVariables,
} from "./__generated__/deleteCampaign";
import {
  editCampaign,
  editCampaignVariables,
} from "./__generated__/editCampaign";
import {
  findCampaigns,
  findCampaignsVariables,
} from "./__generated__/findCampaigns";
import { datePrettier } from "../../../3organisms/Org_adminTable/fn_DatePrettier";
import { dateSmall } from "../../../3organisms/Org_adminTable/fn_DateSmall";
import { formSelector } from "../../../3organisms/Org_adminTable/fn_formSelector";
import Org_adminTable0 from "../../../3organisms/Org_adminTable0";
import {
  campaignColumnsData,
  campaignColumnsDefault,
} from "./Var_campaignForm";

export const FIND_CAMPAIGNS = gql`
  query findCampaigns($input: FindCampaignsInput!) {
    findCampaigns(input: $input) {
      ok
      error
      campaigns {
        id
        createdAt
        tags
        salesDate
        targetDate
        cumulativeOrder
        itemName
        keyword
        media
        service
        form
        plan
        price
        amount
        discountRate
        commisstion
        advertisingCost
        partner {
          nameId
        }
      }
    }
  }
`;

export const CREATE_CAMPAIGN = gql`
  mutation createCampaign($input: CreateCampaignInput!) {
    createCampaign(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_CAMPAIGN = gql`
  mutation editCampaign($input: EditCampaignInput!) {
    editCampaign(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_CAMPAIGN = gql`
  mutation deleteCampaign($input: DeleteCampaignInput!) {
    deleteCampaign(input: $input) {
      ok
      error
    }
  }
`;

export default function App() {
  const [campaignColumns, setCampaignColumns] =
    useRecoilState(campaignColumnsData);

  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  const columns = useMemo(
    () => [
      {
        Header: "생성일",
        accessor: "createdAt",
        width: 90,
        sortDescFirst: true,
      },
      {
        Header: "매출일",
        accessor: "salesDate",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "목표일",
        accessor: "targetDate",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "브랜드명(R)",
        accessor: "brandName_partner",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "누적차수",
        accessor: "cumulativeOrder",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "아이템명",
        accessor: "itemName",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "키워드",
        accessor: "keyword",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "매체", accessor: "media", width: 150, sortDescFirst: true },
      {
        Header: "서비스명",
        accessor: "service",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "형태", accessor: "form", width: 150, sortDescFirst: true },
      { Header: "플랜", accessor: "plan", width: 150, sortDescFirst: true },
      { Header: "가격", accessor: "price", width: 150, sortDescFirst: true },
      { Header: "수량", accessor: "amount", width: 150, sortDescFirst: true },
      {
        Header: "할인률",
        accessor: "discountRate",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "수수료",
        accessor: "commisstion",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "광고비",
        accessor: "advertisingCost",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "캠페인 담당자",
        accessor: "campaignManagers",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "판매 담당자",
        accessor: "salesManager",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "태그", accessor: "tags", width: 150, sortDescFirst: true },
      { Header: "dataId", accessor: "id", width: 0, sortDescFirst: true },
    ],
    []
  );

  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findCampaignsLoading,
    error: findCampaignsError,
    data: findCampaignsData,
    refetch,
  } = useQuery<findCampaigns, findCampaignsVariables>(FIND_CAMPAIGNS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findCampaignsData]);

  const campaignsData = useMemo(
    () =>
      findCampaignsData?.findCampaigns.campaigns?.map((val, idx) => ({
        ...val,
        createdAt: datePrettier(val.createdAt),
        salesDate: dateSmall(val.salesDate),
        targetDate: dateSmall(val.targetDate),
        brandName_partner: val.partner?.nameId,
      })),
    [findCampaignsData]
  );

  useEffect(() => {
    console.log(campaignsData);
  }, [findCampaignsData]);

  //뮤테이션
  const [
    createCampaignMutation,
    {
      loading: createCampaignLoading,
      error: createCampaignError,
      data: createCampaignData,
    },
  ] = useMutation<createCampaign, createCampaignVariables>(CREATE_CAMPAIGN, {
    onCompleted: () => {
      refetch();
    },
  });

  const [
    editCampaignMutation,
    { loading: editCampaignLoading, data: editCampaignData },
  ] = useMutation<editCampaign, editCampaignVariables>(EDIT_CAMPAIGN, {
    onCompleted: () => {
      refetch();
    },
  });

  const [
    deleteCampaignMutation,
    { loading: deleteCampaignLoading, data: deleteCampaignData },
  ] = useMutation<deleteCampaign, deleteCampaignVariables>(DELETE_CAMPAIGN, {
    onCompleted: () => {
      refetch();
    },
  });

  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminCreateOpenAtom
  );

  const [isEditModalOpen, setisEditModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );

  const {
    register: register_create,
    handleSubmit: handleSubmit_create,
    reset: reset_create,
    setFocus: setFocus_create,
    getValues: getValues_create,
    formState: { errors: errors_create },
    watch,
  } = useForm();
  console.log(watch());

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        if (data.salesDate === "") {
          throw "매출일을 입력해주세요";
        } else if (data.targetDate === "") {
          throw "목표일을 입력해주세요";
        }
        console.log(data);
        await createCampaignMutation({
          variables: {
            input: {
              tags: data.tags,
              salesDate: data.salesDate,
              targetDate: data.targetDate,
              cumulativeOrder: +data.cumulativeOrder,
              itemName: data.itemName,
              keyword: data.keyword,
              media: data.media,
              service: data.service,
              form: data.form,
              plan: data.plan,
              price: +data.price,
              amount: +data.amount,
              discountRate: +data.discountRate,
              commisstion: +data.commisstion,
              advertisingCost: +data.advertisingCost,
              brandName_partner: data.brandName_partner,
            },
          },
        });
        reset_create(
          campaignColumnsDefault.reduce(
            (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
            {}
          )
        );
        setisModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  const {
    register: register_edit,
    handleSubmit: handleSubmit_edit,
    reset: reset_edit,
    setFocus: setFocus_edit,
    getValues: getValues_edit,
    formState: { errors: errors_edit },
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", async () => {
      try {
        await editCampaignMutation({
          variables: {
            input: {
              tags: data.tags,
              salesDate: data.salesDate,
              targetDate: data.targetDate,
              cumulativeOrder: +data.cumulativeOrder,
              itemName: data.itemName,
              keyword: data.keyword,
              media: data.media,
              service: data.service,
              form: data.form,
              plan: data.plan,
              price: +data.price,
              amount: +data.amount,
              discountRate: +data.discountRate,
              commisstion: +data.commisstion,
              advertisingCost: +data.advertisingCost,
              brandName_partner: data.brandName_partner,
              id: +formSelector("id", campaignColumns),
            },
          },
        });
        reset_edit(
          campaignColumnsDefault.reduce(
            (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
            {}
          )
        );
        setisEditModalOpen(false);
      } catch (error) {
        const errorString: string = error + "";
        const pureError = errorString.replace("Error: ", "");
        alert(pureError);
      }
    });
  };

  if (findCampaignsError) {
    return (
      <>
        권한이 없습니다. <br />
        {findCampaignsError.message}
      </>
    );
  }
  if (findCampaignsLoading) {
    return <div className="">로딩중</div>;
  }
  return (
    <>
      <Org_adminTable0
        columns={columns}
        data={campaignsData}
        customOptions={{
          setCreateReset: reset_create,
          getValues_create,
          getValues_edit,
          openDetailPage: (selectedFlatRows) => {
            selectedFlatRows.forEach((val) => {
              window.open(
                window.location.href.replace(
                  "campaign",
                  "campaign-participation"
                ) +
                  "/" +
                  val.values.id
              );
            });
          },
          refetch: () => {
            tokenCheck("query", refetch);
          },
          deleteMutation: (ids) => {
            tokenCheck("mutation", () => {
              deleteCampaignMutation({
                variables: {
                  input: {
                    ids,
                  },
                },
              });
            });
          },
          setCreateFocus: () => {
            setFocus_create("brandName_partner");
          },
          setEditRecoil: setCampaignColumns,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          createForm: (
            <>
              <form onSubmit={handleSubmit_create(onSubmit_create)}>
                <ul>
                  {campaignColumns.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          {["salesDate", "targetDate"].includes(
                            val.accessor
                          ) ? (
                            <input
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`date`}
                            />
                          ) : (
                            <input
                              defaultValue={val.value}
                              {...register_create(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`text`}
                            />
                          )}
                        </li>
                      )
                  )}
                </ul>
                <div className="flex justify-end mt-2">
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      reset_create(
                        campaignColumnsDefault.reduce(
                          (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
                          {}
                        )
                      );

                      setTimeout(() => {
                        setFocus_create("brandName_partner");
                      }, 0);
                    }}
                  >
                    초기화
                  </div>
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      setisModalOpen(false);
                    }}
                  >
                    취소
                  </div>
                  <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
                    확인
                  </button>
                </div>
              </form>
            </>
          ),
          editForm: (
            <>
              <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
                <ul>
                  {campaignColumns.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) && (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          {["salesDate", "targetDate"].includes(
                            val.accessor
                          ) ? (
                            <input
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`date`}
                            />
                          ) : (
                            <input
                              defaultValue={val.value}
                              {...register_edit(val.accessor)}
                              className="border w-96 p-1 m-1"
                              type={`text`}
                            />
                          )}
                        </li>
                      )
                  )}
                </ul>
                <div className="flex justify-end mt-2">
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      setisEditModalOpen(false);
                    }}
                  >
                    취소
                  </div>
                  <button className="p-1 px-3 bg-orange-400 hover:bg-orange-500 rounded-md text-white cursor-pointer">
                    확인
                  </button>
                </div>
              </form>
            </>
          ),
        }}
      />
    </>
  );
}
