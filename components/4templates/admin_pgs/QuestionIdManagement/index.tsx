import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
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
  CREATE_QUESTION_MANAGEMENT,
  EDIT_QUESTION_MANAGEMENT,
  DELETE_QUESTION_MANAGEMENT,
} from "../QuestionManagement/Gql_questionManagement";
import {
  questionManagementColumnsDefault,
  rawQuestionManagementColumnsData,
} from "../QuestionManagement/Var_questionManagementColumns";
import {
  createQuestionManagement,
  createQuestionManagementVariables,
} from "../QuestionManagement/__generated__/createQuestionManagement";
import {
  deleteQuestionManagement,
  deleteQuestionManagementVariables,
} from "../QuestionManagement/__generated__/deleteQuestionManagement";
import {
  editQuestionManagement,
  editQuestionManagementVariables,
} from "../QuestionManagement/__generated__/editQuestionManagement";
import {
  FIND_ID_QUESTION_MANAGEMENT,
  FIND_ONE_QUESTION,
} from "./Gql_QuestionIdManagement";
import {
  findIdQuestionManagement,
  findIdQuestionManagementVariables,
} from "./__generated__/findIdQuestionManagement";
import {
  findOneQuestion,
  findOneQuestionVariables,
} from "./__generated__/findOneQuestion";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //페이지 아이디 가져오기
  const router = useRouter();
  const { id } = router.query;
  const questionId = +(id + "");

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<
    findIdQuestionManagement,
    findIdQuestionManagementVariables
  >(FIND_ID_QUESTION_MANAGEMENT, {
    variables: {
      input: {
        fromDate: dateToInput(tableFromDateState),
        toDate: dateToInput(tableToDateState),
        QuestionId: questionId,
      },
    },
  });
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //쿼리 타이틀
  const query_title = useQuery<findOneQuestion, findOneQuestionVariables>(
    FIND_ONE_QUESTION,
    {
      variables: {
        input: {
          id: questionId,
        },
      },
    }
  );
  useEffect(() => {
    tokenCheck("query", query_title.refetch);
  }, [query_title.data]);

  const tableTitle = query_title.data?.findOneQuestion.question?.brandName;

  //쿼리데이터 가공
  const questionManagementData = useMemo(
    () =>
      query.data?.findIdQuestionManagement.questionManagements?.map(
        (val, idx) => ({
          ...val,
          rawMention: val.mention,
          brandName: val.question?.brandName,
          product: val.question?.product,
          serviceInquired: val.question?.serviceInquired,
        })
      ),
    [query.data]
  );

  //테이블 컬럼 가공
  const columns = useMemo(
    () =>
      questionManagementColumnsDefault.filter(
        (val) => val.accessor !== "newPage"
      ),
    []
  );

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
          // newPageLink: "/question-management",
          createFunction: true,
          shortCutHotkey: true,
          tableTitle: tableTitle,
          extraCreateInputObject: { questionId: questionId },
          extraEditInputObject: {},
        }}
      />
    );
  }
  return <></>;
}
