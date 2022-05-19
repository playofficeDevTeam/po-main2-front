import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Org_adminTable from "../../../3organisms/Org_adminTable";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { datePrettier } from "../Question/fn_DatePrettier";
import { formSelector } from "../Question/fn_formSelector";
import {
  campaignParticipationFormData,
  campaignParticipationFormDefalut,
} from "./Var_campaignParticipationForm";
import { dateSmall } from "../QuestionManagement/fn_DateSmall";
import {
  createCampaignParticipation,
  createCampaignParticipationVariables,
} from "./__generated__/createCampaignParticipation";
import {
  deleteCampaignParticipation,
  deleteCampaignParticipationVariables,
} from "./__generated__/deleteCampaignParticipation";
import {
  editCampaignParticipation,
  editCampaignParticipationVariables,
} from "./__generated__/editCampaignParticipation";
import {
  findAllCampaignParticipations,
  findAllCampaignParticipationsVariables,
} from "./__generated__/findAllCampaignParticipations";
import { textToBoolean } from "./fn_textToBoolean";

export const FIND_ALL_CAMPAIGN_PARTICIPATIONS = gql`
  query findAllCampaignParticipations(
    $input: FindAllCampaignParticipationsInput!
  ) {
    findAllCampaignParticipations(input: $input) {
      ok
      error
      campaignParticipations {
        id
        createdAt
        user {
          nameId
        }
        campaign {
          partner {
            nameId
          }
          cumulativeOrder
          itemName
          keyword
        }
        manuscriptFee
        proposal
        consent
        guide
        plan
        isFileTaxes
      }
    }
  }
`;

export const CREATE_CAMPAIGN_PARTICIPATION = gql`
  mutation createCampaignParticipation(
    $input: CreateCampaignParticipationInput!
  ) {
    createCampaignParticipation(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_CAMPAIGN_PARTICIPATION = gql`
  mutation editCampaignParticipation($input: EditCampaignParticipationInput!) {
    editCampaignParticipation(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_CAMPAIGN_PARTICIPATION = gql`
  mutation deleteCampaignParticipation(
    $input: DeleteCampaignParticipationInput!
  ) {
    deleteCampaignParticipation(input: $input) {
      ok
      error
    }
  }
`;

export default function App() {
  const [campaignParticipationForm, setCampaignForm] = useRecoilState(
    campaignParticipationFormData
  );

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
      { Header: "dataId", accessor: "id", width: 0, sortDescFirst: true },

      {
        Header: "크리에이터명(R)",
        accessor: "creatorNameId",
        width: 150,
        sortDescFirst: true,
      },

      {
        Header: "원고료",
        accessor: "manuscriptFee",
        width: 150,
        sortDescFirst: true,
      },
      { Header: "제안", accessor: "proposal", width: 150, sortDescFirst: true },
      { Header: "승락", accessor: "consent", width: 150, sortDescFirst: true },
      { Header: "가이드", accessor: "guide", width: 150, sortDescFirst: true },
      { Header: "플랜", accessor: "plan", width: 150, sortDescFirst: true },
      {
        Header: "세금신고여부",
        accessor: "isFileTaxes",
        width: 150,
        sortDescFirst: true,
      },
      {
        Header: "브랜드명(R)",
        accessor: "brandName_Partner",
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
    ],
    []
  );

  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findAllCampaignParticipationsLoading,
    error: findAllCampaignParticipationsError,
    data: findAllCampaignParticipationsData,
    refetch,
  } = useQuery<
    findAllCampaignParticipations,
    findAllCampaignParticipationsVariables
  >(FIND_ALL_CAMPAIGN_PARTICIPATIONS, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findAllCampaignParticipationsData]);

  const campaignParticipationsData = useMemo(
    () =>
      findAllCampaignParticipationsData?.findAllCampaignParticipations.campaignParticipations?.map(
        (val, idx) => ({
          ...val,
          createdAt: datePrettier(val.createdAt),
          creatorNameId: val.user?.nameId,
          brandName_partner: val.campaign?.partner?.nameId,
          cumulativeOrder: val.campaign?.cumulativeOrder,
          itemName: val.campaign?.itemName,
          keyword: val.campaign?.keyword,
        })
      ),
    [findAllCampaignParticipationsData]
  );

  //뮤테이션
  const [
    createCampaignParticipationMutation,
    {
      loading: createCampaignParticipationLoading,
      error: createCampaignParticipationError,
      data: createCampaignParticipationData,
    },
  ] = useMutation<
    createCampaignParticipation,
    createCampaignParticipationVariables
  >(CREATE_CAMPAIGN_PARTICIPATION, {
    onCompleted: () => {
      refetch();
    },
  });

  const [
    editCampaignParticipationMutation,
    {
      loading: editCampaignParticipationLoading,
      data: editCampaignParticipationData,
    },
  ] = useMutation<
    editCampaignParticipation,
    editCampaignParticipationVariables
  >(EDIT_CAMPAIGN_PARTICIPATION, {
    onCompleted: () => {
      refetch();
    },
  });

  const [
    deleteCampaignParticipationMutation,
    {
      loading: deleteCampaignParticipationLoading,
      data: deleteCampaignParticipationData,
    },
  ] = useMutation<
    deleteCampaignParticipation,
    deleteCampaignParticipationVariables
  >(DELETE_CAMPAIGN_PARTICIPATION, {
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
  } = useForm();

  const onSubmit_create = (data) => {
    tokenCheck("mutation", async () => {
      try {
        if (data.salesDate === "") {
          throw "매출일을 입력해주세요";
        } else if (data.targetDate === "") {
          throw "목표일을 입력해주세요";
        }
        console.log(data);
        await createCampaignParticipationMutation({
          variables: {
            input: {
              manuscriptFee: +data.manuscriptFee,
              proposal: data.proposal,
              consent: data.consent,
              guide: data.guide,
              plan: data.plan,
              isFileTaxes: data.isFileTaxes,
              creatorNameId: data.creatorNameId,
              brandName_partner: data.brandName_partner,
              cumulativeOrder: data.cumulativeOrder,
              itemName: data.itemName,
              keyword: data.keyword,
            },
          },
        });
        reset_create(
          campaignParticipationFormDefalut.reduce(
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
      console.log(formSelector("id", campaignParticipationForm));
      try {
        await editCampaignParticipationMutation({
          variables: {
            input: {
              manuscriptFee: +data.manuscriptFee,
              proposal: data.proposal,
              consent: data.consent,
              guide: data.guide,
              plan: data.plan,
              isFileTaxes: data.isFileTaxes,
              creatorNameId: data.creatorNameId,
              brandName_partner: data.brandName_partner,
              cumulativeOrder: data.cumulativeOrder,
              itemName: data.itemName,
              keyword: data.keyword,
              id: +formSelector("id", campaignParticipationForm),
            },
          },
        });
        reset_edit(
          campaignParticipationFormDefalut.reduce(
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

  if (findAllCampaignParticipationsError) {
    return (
      <>
        권한이 없습니다. <br />
        {findAllCampaignParticipationsError.message}
      </>
    );
  }
  if (findAllCampaignParticipationsLoading) {
    return <div className="">로딩중</div>;
  }
  return (
    <>
      <Org_adminTable
        columns={columns}
        data={campaignParticipationsData}
        customOptions={{
          setCreateReset: reset_create,
          getValues_create,
          getValues_edit,
          openDetailPage: (selectedFlatRows) => {
            selectedFlatRows.forEach((val) => {
              window.open(
                window.location.href.replace(
                  "campaignParticipation",
                  "campaignParticipation-participation"
                ) +
                  "/" +
                  val.values.id
              );
            });
          },
          refetch: () => {
            tokenCheck("query", refetch);
          },
          deleteMutation: (id) => {
            tokenCheck("mutation", () => {
              deleteCampaignParticipationMutation({
                variables: {
                  input: {
                    id,
                  },
                },
              });
            });
          },
          setCreateFocus: () => {
            setFocus_create("creatorNameId");
          },
          setEditRecoil: setCampaignForm,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          createForm: (
            <>
              <form onSubmit={handleSubmit_create(onSubmit_create)}>
                <ul>
                  {campaignParticipationForm.map(
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
                        campaignParticipationFormDefalut.reduce(
                          (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
                          {}
                        )
                      );

                      setTimeout(() => {
                        setFocus_create("creatorNameId");
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
                  {campaignParticipationForm.map(
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
