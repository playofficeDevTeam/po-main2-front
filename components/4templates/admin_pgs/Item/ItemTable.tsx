import { gql, useMutation, useQuery } from "@apollo/client";
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Org_adminTable from "../../../3organisms/Org_adminTable/tableOptions";
import { dateToInput } from "../../../3organisms/Org_adminTable/fn_dateToInput";
import { isModal_adminCreateOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminCreate";
import { isModal_adminEditOpenAtom } from "../../../3organisms/Org_adminTable/Modal_adminEdit";
import {
  tableFromDate,
  tableToDate,
} from "../../../3organisms/Org_adminTable/Var_tableInputDate";
import { useTokenCheck } from "../../../hooks/useTokenCheck";
import { datePrettier } from "../Question/fn_DatePrettier";
import { formSelector } from "../Question/fn_formSelector";

import { questionFormDefalut } from "../Question/Var_questionForm";
import { itemFormData, itemFormDefalut } from "./Var_ItemForm";
import { createItem, createItemVariables } from "./__generated__/createItem";
import { deleteItem, deleteItemVariables } from "./__generated__/deleteItem";
import { editItem, editItemVariables } from "./__generated__/editItem";
import { findAllItems } from "./__generated__/findAllItems";

export const FIND_ALL_ITEM = gql`
  query findAllItems {
    findAllItems {
      ok
      error
      items {
        id
        createdAt
        itemCategory1
        itemName
        detailInfo
        price
        discountRate
        type
      }
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_ITEM = gql`
  mutation editItem($input: EditItemInput!) {
    editItem(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($input: DeleteItemInput!) {
    deleteItem(input: $input) {
      ok
      error
    }
  }
`;

export default function App() {
  const [itemForm, setItemForm] = useRecoilState(itemFormData);

  const columns = useMemo(
    () => [
      {
        Header: "생성일",
        accessor: "createdAt",
        width: 90,
        sortDescFirst: true,
      },
      {
        Header: "카테고리1",
        accessor: "itemCategory1",
        width: 250,
        sortDescFirst: true,
      },
      {
        Header: "서비스명",
        accessor: "itemName",
        width: 200,
        sortDescFirst: true,
      },
      {
        Header: "상세정보",
        accessor: "detailInfo",
        width: 300,
        sortDescFirst: true,
      },
      { Header: "가격", accessor: "price", width: 150, sortDescFirst: true },
      {
        Header: "할인율",
        accessor: "discountRate",
        width: 90,
        sortDescFirst: true,
      },
      { Header: "유형", accessor: "type", width: 150, sortDescFirst: true },
      { Header: "dataId", accessor: "id", width: 0 },
    ],
    []
  );

  //토큰체크
  const tokenCheck = useTokenCheck();

  //쿼리
  const {
    loading: findAllItemsLoading,
    error: findAllItemsError,
    data: findAllItemsData,
    refetch,
  } = useQuery<findAllItems>(FIND_ALL_ITEM);
  useEffect(() => {
    tokenCheck("query", refetch);
  }, [findAllItemsData]);

  const itemData = useMemo(
    () =>
      findAllItemsData?.findAllItems.items?.map((val, idx) => ({
        ...val,
        createdAt: datePrettier(val.createdAt),
        detailInfo: val.detailInfo?.join(", "),
      })),
    [findAllItemsData]
  );

  //뮤테이션
  const [
    createItemMutation,
    {
      loading: createItemLoading,
      error: createItemError,
      data: createItemData,
    },
  ] = useMutation<createItem, createItemVariables>(CREATE_ITEM, {
    onCompleted: () => {
      refetch();
    },
  });

  const [editItemMutation, { loading: editItemLoading, data: editItemData }] =
    useMutation<editItem, editItemVariables>(EDIT_ITEM, {
      onCompleted: () => {
        refetch();
      },
    });

  const [
    deleteItemMutation,
    { loading: deleteItemLoading, data: deleteItemData },
  ] = useMutation<deleteItem, deleteItemVariables>(DELETE_ITEM, {
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
        await createItemMutation({
          variables: {
            input: {
              itemCategory1: data.itemCategory1,
              itemName: data.itemName,
              detailInfo: data.detailInfo.split(",").map((val) => val.trim()),
              price: +data.price,
              discountRate: +data.discountRate,
              type: data.type,
            },
          },
        });
        reset_create(
          itemFormDefalut.reduce(
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
        if (data.stateDate === "") {
          throw "스케쥴 날짜를 입력해주세요";
        }

        await editItemMutation({
          variables: {
            input: {
              itemCategory1: data.itemCategory1,
              itemName: data.itemName,
              detailInfo: data.detailInfo.split(",").map((val) => val.trim()),
              price: +data.price,
              discountRate: +data.discountRate,
              type: data.type,
              id: +formSelector("id", itemForm),
            },
          },
        });

        reset_edit(
          questionFormDefalut.reduce(
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

  if (findAllItemsError) {
    return (
      <>
        권한이 없습니다. <br /> {findAllItemsError.message}
      </>
    );
  }
  if (findAllItemsLoading) {
    return <div className="">로딩중</div>;
  }

  return (
    <>
      <Org_adminTable
        columns={columns}
        data={itemData}
        customOptions={{
          setCreateReset: reset_create,
          getValues_create,
          getValues_edit,
          openDetailPage: (selectedFlatRows) => {
            selectedFlatRows.forEach((val) => {
              window.open(window.location.href + "/" + val.values.relationId);
            });
          },
          refetch: () => {
            tokenCheck("query", refetch);
          },
          deleteMutation: (id) => {
            tokenCheck("mutation", () => {
              deleteItemMutation({
                variables: {
                  input: {
                    id,
                  },
                },
              });
            });
          },
          setCreateFocus: () => {
            setFocus_create("itemCategory1");
          },
          setEditRecoil: setItemForm,
          setEditReset: reset_edit,
          setEditFocus: setFocus_edit,
          createForm: (
            <>
              <form onSubmit={handleSubmit_create(onSubmit_create)}>
                <ul>
                  {itemForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) &&
                      (["detailInfo"].includes(val.accessor) ? (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          <textarea
                            defaultValue={val.value}
                            {...register_create(val.accessor)}
                            className="border w-96 p-1 m-1"
                          />
                        </li>
                      ) : (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          <input
                            defaultValue={val.value}
                            {...register_create(val.accessor)}
                            className="border w-96 p-1 m-1"
                            type={`text`}
                          />
                        </li>
                      ))
                  )}
                </ul>
                <div className="flex justify-end mt-2">
                  <div
                    className="p-1 px-3 bg-gray-200 hover:bg-gray-300 rounded-md  cursor-pointer mr-2"
                    onClick={() => {
                      reset_create(
                        itemFormDefalut.reduce(
                          (pre, cur) => ({ ...pre, [cur.accessor]: cur.value }),
                          {}
                        )
                      );

                      setTimeout(() => {
                        setFocus_create("itemCategory1");
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
                  {itemForm.map(
                    (val, idx) =>
                      !["id", "createdAt"].includes(val.accessor) &&
                      (["detailInfo"].includes(val.accessor) ? (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          <textarea
                            defaultValue={val.value}
                            {...register_edit(val.accessor)}
                            className="border w-96 p-1 m-1"
                          />
                        </li>
                      ) : (
                        <li key={idx} className="flex items-center">
                          <div className="w-28 flex pl-1">{val.Header}</div>
                          <input
                            defaultValue={val.value}
                            {...register_edit(val.accessor)}
                            className="border w-96 p-1 m-1"
                            type={`text`}
                          />
                        </li>
                      ))
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
