import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { datePrettier } from "../../../3organisms/Org_adminTable/fn_DatePrettier";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import Org_adminTable2 from "../../../3organisms/Org_adminTable2";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  CREATE_QUESTION_FOR_ADMIN,
  DELETE_QUESTION_FOR_ADMIN,
  EDIT_QUESTION_FOR_ADMIN,
  FIND_QUESTIONS_FOR_ADMIN,
} from "../Question/Gql_question";
import {
  questionColumnsDefault,
  rawQuestionColumnsAtom,
} from "../Question/Var_questionColumns";
import {
  deleteQuestionForAdmin,
  deleteQuestionForAdminVariables,
} from "../Question/__generated__/deleteQuestionForAdmin";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "../Question/__generated__/findQuestionsForAdmin";
import {
  createQuestionForAdmin,
  createQuestionForAdminVariables,
} from "./__generated__/createQuestionForAdmin";
import {
  editQuestionForAdmin,
  editQuestionForAdminVariables,
} from "./__generated__/editQuestionForAdmin";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //데이트 스테이트
  const [tableFromDateState, setTableFromDateState] =
    useRecoilState(tableFromDate);
  const [tableToDateState, setTableToDateState] = useRecoilState(tableToDate);

  //쿼리
  const query = useQuery<findQuestionsForAdmin, findQuestionsForAdminVariables>(
    FIND_QUESTIONS_FOR_ADMIN,
    {
      variables: {
        input: {
          fromDate: dateToInput(tableFromDateState),
          toDate: dateToInput(tableToDateState),
        },
      },
    }
  );
  useEffect(() => {
    tokenCheck("query", query.refetch);
  }, [query.data]);

  //쿼리데이터 가공
  const questionsData = useMemo(
    () =>
      query.data?.findQuestionsForAdmin.questions?.map((val, idx) => ({
        ...val,
        newPageId: val.id,
        rawMention: val.mention,
        isAgency: val.isAgency?.toString(),
        brandName_partner: val.user?.nameId,
        contactPerson_nickname: val.contactPerson?.nickname,
      })),
    [query.data]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => questionColumnsDefault, []);

  //생성 뮤테이션
  const createMutation = useMutation<
    createQuestionForAdmin,
    createQuestionForAdminVariables
  >(CREATE_QUESTION_FOR_ADMIN, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //수정 뮤테이션
  const editMutation = useMutation<
    editQuestionForAdmin,
    editQuestionForAdminVariables
  >(EDIT_QUESTION_FOR_ADMIN, {
    onCompleted: () => {
      query.refetch();
    },
  });

  //삭제 뮤테이션
  const deleteMutation = useMutation<
    deleteQuestionForAdmin,
    deleteQuestionForAdminVariables
  >(DELETE_QUESTION_FOR_ADMIN, {
    onCompleted: () => {
      query.refetch();
    },
  });

  if (query.data) {
    return (
      <Org_adminTable2
        columns={columns}
        data={questionsData}
        createMutation={createMutation}
        editMutation={editMutation}
        deleteMutation={deleteMutation}
        rawColumnsAtom={rawQuestionColumnsAtom}
        options={{
          dateFilter: true,
          newPageLink: "/question-management",
          createFunction: true,
          shortCutHotkey: true,
        }}
      />
    );
  }
  return <></>;
}
