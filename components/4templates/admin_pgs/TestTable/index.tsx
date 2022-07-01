import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { datePrettier } from "../../../3organisms/Org_adminTable/fn_DatePrettier";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import {
  DELETE_QUESTION_FOR_ADMIN,
  FIND_QUESTIONS_FOR_ADMIN,
} from "../Question/Gql_question";
import { questionColumnsDefault } from "../Question/Var_questionColumns";
import {
  deleteQuestionForAdmin,
  deleteQuestionForAdminVariables,
} from "../Question/__generated__/deleteQuestionForAdmin";
import {
  findQuestionsForAdmin,
  findQuestionsForAdminVariables,
} from "../Question/__generated__/findQuestionsForAdmin";
import Table from "./Table";

export default function App() {
  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findQuestionsForAdminLoading,
    error: findQuestionsForAdminError,
    data: findQuestionsForAdminData,
    refetch,
  } = useQuery<findQuestionsForAdmin, findQuestionsForAdminVariables>(
    FIND_QUESTIONS_FOR_ADMIN,
    {
      variables: {
        input: {
          fromDate: dateToInput("2020-07-01"),
          toDate: dateToInput("2022-07-01"),
        },
      },
    }
  );
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findQuestionsForAdminData]);

  //쿼리데이터 가공
  const questionsData = useMemo(
    () =>
      findQuestionsForAdminData?.findQuestionsForAdmin.questions?.map(
        (val, idx) => ({
          ...val,
          createdAt: datePrettier(val.createdAt),
          isAgency: val.isAgency?.toString(),
          brandName_partner: val.user?.nameId,
        })
      ),
    [findQuestionsForAdminData]
  );

  //테이블 컬럼 가공
  const columns = useMemo(() => questionColumnsDefault, []);

  //삭제 뮤테이션
  const [
    deleteQuestionForAdminMutation,
    {
      loading: deleteQuestionForAdminLoading,
      data: deleteQuestionForAdminData,
    },
  ] = useMutation<deleteQuestionForAdmin, deleteQuestionForAdminVariables>(
    DELETE_QUESTION_FOR_ADMIN,
    {
      onCompleted: () => {
        refetch();
      },
    }
  );

  if (findQuestionsForAdminData) {
    return (
      <div>
        <Table
          columns={columns}
          data={questionsData}
          deleteMutation={deleteQuestionForAdminMutation}
        />
      </div>
    );
  }
  return <></>;
}
