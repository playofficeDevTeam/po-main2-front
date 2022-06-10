import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { datePrettier } from "../../../3organisms/Org_adminTable/fn_DatePrettier";
import { dateTime } from "../../../3organisms/Org_adminTable/fn_DateTime";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { formSelector } from "../../../3organisms/Org_adminTable/fn_formSelector";
import Modal_adminCreate, {
  isModal_adminCreateOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import Modal_adminEdit, {
  isModal_adminEditOpenAtom,
} from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import { ColumnIndeterminateCheckbox } from "../../../3organisms/Org_adminTable/tableOptions";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { nickNameAtom } from "../../../3organisms/Org_header/Org_adminSidebar";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  campaignParticipationExceptionDataInCreateForm,
  campaignParticipationExceptionDataInEditForm,
  campaignParticipationFocusId,
} from "./campaignParticipationControlData";
import {
  FIND_ALL_CAMPAIGN_PARTICIPATIONS,
  CREATE_CAMPAIGN_PARTICIPATION,
  EDIT_CAMPAIGN_PARTICIPATION,
  DELETE_CAMPAIGN_PARTICIPATION,
} from "./Gql_campaignParticipation";
import {
  campaignParticipationColumnsData,
  campaignParticipationColumnsDefault,
} from "./Var_campaignParticipationColumns";
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

//폼 컴포넌트
function Form({ getToggleHideAllColumnsProps, allColumns, selectedFlatRows }) {
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

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

  //쿼리가공
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

  //생성 뮤테이션
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

  //수정 뮤테이션
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
  //삭제 뮤테이션
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

  // 생성시 포커싱
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setFocus_create(campaignParticipationFocusId);
      }, 100);
    }
  }, [isModalOpen]);

  //수정시 테이블데이터 반영 및 포커싱
  const [campaignParticipationColumns, setCampaignParticipationColumns] =
    useRecoilState(campaignParticipationColumnsData);
  useEffect(() => {
    reset_edit(
      campaignParticipationColumns.reduce(
        (pre, cur) => ({
          ...pre,
          [cur.accessor]: cur.value,
        }),
        {}
      )
    );
    if (isEditModalOpen) {
      setTimeout(() => {
        setFocus_edit(
          campaignParticipationColumns.find((val) => val.selected)?.accessor ||
            ""
        );
      }, 100);
    }
  }, [campaignParticipationColumns]);

  //유즈폼 생성
  const {
    register: register_create,
    handleSubmit: handleSubmit_create,
    reset: reset_create,
    setFocus: setFocus_create,
    getValues: getValues_create,
    formState: { errors: errors_create },
    watch: watch_create,
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
          campaignParticipationColumnsDefault.reduce(
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

  //유즈폼 수정
  const {
    register: register_edit,
    handleSubmit: handleSubmit_edit,
    reset: reset_edit,
    setFocus: setFocus_edit,
    getValues: getValues_edit,
    formState: { errors: errors_edit },
    watch: watch_edit,
  } = useForm();

  const onSubmit_edit = (data) => {
    tokenCheck("mutation", async () => {
      console.log(formSelector("id", campaignParticipationColumns));
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
              id: +formSelector("id", campaignParticipationColumns),
            },
          },
        });
        reset_edit(
          campaignParticipationColumnsDefault.reduce(
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
  const [nickName, setNickName] = useRecoilState(nickNameAtom);

  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.shiftKey) {
          //시프트 c 누를때 생성
          if ([67].includes(e.keyCode)) {
            setisModalOpen(true);
          }
          //시프트 s/d누를때 닉네임/데이트 생성
          if ([83, 68].includes(e.keyCode)) {
            let newContent;

            if ([83].includes(e.keyCode)) {
              newContent = nickName;
            } else if ([68].includes(e.keyCode)) {
              const date = new Date();
              const prettyDate = dateTime(date);
              newContent = nickName + " " + prettyDate;
            }
            const focusedElement: any = document.activeElement;
            const getValue_create = getValues_create(focusedElement.name);
            setTimeout(() => {
              reset_create({
                [focusedElement.name]: getValue_create + newContent,
              });
            }, 0);
            const getValue_edit = getValues_edit(focusedElement.name);
            setTimeout(() => {
              reset_edit({
                [focusedElement.name]: getValue_edit + newContent,
              });
            }, 0);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [nickName]);

  const [columnPopupState, setColumnPopupState] = useState(false);

  return (
    <>
      {/* 메뉴 */}
      <div className="flex py-2">
        {/* 생성 */}
        <div className="mr-3 cursor-pointer">
          <Modal_adminCreate
            data={{
              button: (
                <>
                  <div className="center w-20 h-8 bg-orange-400 rounded-md text-white hover:bg-orange-500">
                    <i className="fas fa-plus mr-2 text-sm"></i> 생성
                  </div>
                </>
              ),
              modal: (
                <form onSubmit={handleSubmit_create(onSubmit_create)}>
                  <ul>
                    {campaignParticipationColumns.map(
                      (val, idx) =>
                        !campaignParticipationExceptionDataInCreateForm.includes(
                          val.accessor
                        ) && (
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
                          campaignParticipationColumnsDefault.reduce(
                            (pre, cur) => ({
                              ...pre,
                              [cur.accessor]: cur.value,
                            }),
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
              ),
            }}
          />
        </div>

        {/* 수정모달 */}
        <div className="">
          <Modal_adminEdit
            data={{
              button: <></>,
              modal: (
                <form onSubmit={handleSubmit_edit(onSubmit_edit)}>
                  <ul>
                    {campaignParticipationColumns.map(
                      (val, idx) =>
                        !campaignParticipationExceptionDataInEditForm.includes(
                          val.accessor
                        ) && (
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
              ),
            }}
          />
        </div>

        {/* 열선택 */}
        <div className="mr-3">
          <div
            className="center w-20 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300 cursor-pointer"
            onClick={() => {
              setColumnPopupState((state) => !state);
            }}
          >
            <i className="fas fa-columns mr-2"></i>
            <span className="mr-2">열</span>
            {columnPopupState ? (
              <i className="fas fa-caret-up"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}
          </div>

          {columnPopupState && (
            <div className="h-0 w-0 relative z-50 top-1">
              <div className="w-48 p-3 px-4 bg-white border rounded-md shadow-md">
                <div className="py-1 flex items-center">
                  <ColumnIndeterminateCheckbox
                    {...getToggleHideAllColumnsProps()}
                  />{" "}
                  <span className="ml-2">전체 선택</span>
                </div>
                {allColumns.map(
                  (column) =>
                    !["selection", "id"].includes(column.id) && (
                      <div key={column.id} className="py-1">
                        <label className="flex items-center cursor-pointer">
                          <input
                            className="w-4 h-4 mr-2"
                            type="checkbox"
                            {...column.getToggleHiddenProps()}
                          />{" "}
                          {column.Header}
                        </label>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>

        {/* 삭제 */}
        {selectedFlatRows.length !== 0 && (
          <div
            className="mr-3 cursor-pointer center w-14 h-8 bg-gray-200 rounded-md text-gray-900 hover:bg-gray-300 "
            onClick={() => {
              try {
                if (selectedFlatRows.length > 4) {
                  throw "5개 이상의 데이터를 한번에 지울 수 없습니다.";
                }
                const returnValue = confirm("정말로 삭제하시겠습니까?");
                if (returnValue) {
                  const selectedIds = selectedFlatRows.map(
                    (val) => val.original.id
                  );
                  tokenCheck("mutation", () => {
                    deleteCampaignParticipationMutation({
                      variables: {
                        input: {
                          ids: selectedIds,
                        },
                      },
                    });
                  });
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </div>
        )}
      </div>
    </>
  );
}
export default Form;
