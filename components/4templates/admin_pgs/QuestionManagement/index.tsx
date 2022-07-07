import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import Org_adminTable2 from "../../../3organisms/Org_adminTable2";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  FIND_ALL_QUESTION_MANAGEMENT,
  CREATE_QUESTION_MANAGEMENT,
  EDIT_QUESTION_MANAGEMENT,
  DELETE_QUESTION_MANAGEMENT,
} from "./Gql_questionManagement";
import {
  questionManagementColumnsDefault,
  rawQuestionManagementColumnsData,
} from "./Var_questionManagementColumns";
import {
  createQuestionManagement,
  createQuestionManagementVariables,
} from "./__generated__/createQuestionManagement";
import {
  deleteQuestionManagement,
  deleteQuestionManagementVariables,
} from "./__generated__/deleteQuestionManagement";
import {
  editQuestionManagement,
  editQuestionManagementVariables,
} from "./__generated__/editQuestionManagement";
import {
  findAllQuestionManagement,
  findAllQuestionManagementVariables,
} from "./__generated__/findAllQuestionManagement";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<
    findAllQuestionManagement,
    findAllQuestionManagementVariables
  >(FIND_ALL_QUESTION_MANAGEMENT, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //쿼리데이터 가공
  const questionManagementData = useMemo(
    () =>
      query.data?.findAllQuestionManagement.questionManagements?.map(
        (val, idx) => ({
          ...val,
          newPageId: val.questionId,
          rawMention: val.mention,
          brandName: val.question?.brandName,
          product: val.question?.product,
          serviceInquired: val.question?.serviceInquired,
          questionId: val.question?.id,
        })
      ),
    [query.data]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => questionManagementColumnsDefault, []);

  //생성 뮤테이션
  const createMutation = useMutation<
    createQuestionManagement,
    createQuestionManagementVariables
  >(CREATE_QUESTION_MANAGEMENT, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //수정 뮤테이션
  const editMutation = useMutation<
    editQuestionManagement,
    editQuestionManagementVariables
  >(EDIT_QUESTION_MANAGEMENT, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //삭제 뮤테이션
  const deleteMutation = useMutation<
    deleteQuestionManagement,
    deleteQuestionManagementVariables
  >(DELETE_QUESTION_MANAGEMENT, {
    onCompleted: () => {
      query.refetch();
    },
  });

  if (query.data) {
    return (
      <Org_adminTable2
        columns={columns}
        data={questionManagementData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawQuestionManagementColumnsData}
        options={{
          dateFilter: true,
          newPageLink: "/question-management",
          createFunction: false,
          shortCutHotkey: true,
        }}
      />
    );
  }
  return <></>;
}
