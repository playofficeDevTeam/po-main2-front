import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  IItem,
  serviceDatas,
  serviceDatasAtom,
} from "../../service_pgs/VisualInfluencer_pg/Var_serviceDatas";
import { userFormData } from "../OrderSheet_pg/Var_userFormData";
import { CREATE_ITEM } from "./Gql_Item";
import { CreateItem, CreateItemVariables } from "./__generated__/CreateItem";

export default function App() {
  const [serviceDataState, setServiceDataState] =
    useRecoilState(serviceDatasAtom);

  const [userFormDataState, setUserFormDataState] =
    useRecoilState(userFormData);

  const router = useRouter();
  const urlParams = router.query;

  const customServiceData: IItem = {
    itemId: 0,
    hightlighted: false,
    itemCategory1: "",
    itemName: "",
    detailInfo: [""],
    price: 0,
    discountRate: 0,
    amountOfItems: 1,
    isClicked: true,
  };

  const [createItem] = useMutation<CreateItem, CreateItemVariables>(
    CREATE_ITEM,
    {
      onCompleted: (data: CreateItem) => {
        const itemId = data.createItem.itemId ?? 0;
        const customServiceDataIncludeId = {
          ...customServiceData,
          itemId,
          itemCategory1: urlParams.itemCategory1 as string,
          itemName: urlParams.itemName as string,
          detailInfo: [urlParams.detailInfo as string],
          price: +(urlParams.price as string),
          discountRate: +(urlParams.discountRate as string),
        };
        setServiceDataState((serviceData) => [
          ...serviceDatas.map((val) => ({ ...val, isClicked: false })),
          customServiceDataIncludeId,
        ]);
      },
    }
  );

  useEffect(() => {
    if (urlParams.itemCategory1) {
      const userFormData = JSON.parse(
        window.localStorage.getItem("userFormDataState") ||
          JSON.stringify(userFormDataState)
      );
      setUserFormDataState(userFormData);

      createItem({
        variables: {
          input: {
            itemCategory1: urlParams.itemCategory1 as string,
            itemName: urlParams.itemName as string,
            detailInfo: [urlParams.detailInfo as string],
            price: +(urlParams.price as string),
            discountRate: +(urlParams.discountRate as string),
            type: "CUSTOM",
          },
        },
      });
    }
  }, [router]);
  return <></>;
}
