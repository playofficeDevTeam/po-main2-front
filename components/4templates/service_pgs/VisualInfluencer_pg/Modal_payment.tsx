import { useReactiveVar } from "@apollo/client";
import { useRef, useState } from "react";
import Modal from "react-modal";
import { isMobileVar } from "../../../common/Layout";
import ScrollLock from "../../../effects/ScrollLock";
import { serviceDatasVar } from "./Var_serviceDatas";

const data1 = {
  button: <span>포케팅 서비스 이용약관 동의</span>,
  modal: <div>내용물</div>,
};

export default function App({ data = data1 }) {
  const isMobile = useReactiveVar(isMobileVar);
  Modal.setAppElement("#__next");
  const [modalIsOpen, setIsOpen] = useState(false);
  const customStyles = isMobile
    ? {
        content: {
          top: "auto",
          left: "50%",
          right: "auto",
          marginRight: "-50%",
          transform: "translate(-50%)",
          padding: 0,
          borderRadius: "0.5rem",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          bottom: "-2px",
          zindex: 1000,
        },
      }
    : {
        content: {
          top: "51%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: 0,
          borderRadius: "0.5rem",
          zindex: 1000,
        },
      };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const element1: any = useRef();

  const serviceReactiveVar = useReactiveVar(serviceDatasVar);
  const indexOfServiceReactiveVar = serviceReactiveVar
    .map((val, idx) => val.isClicked)
    .indexOf(true);
  const scrollToY =
    indexOfServiceReactiveVar === 0
      ? 0
      : indexOfServiceReactiveVar === 1
      ? 315
      : 1000;

  return isMobile ? (
    <div className="relative z-40 ">
      <span
        onClick={async () => {
          await openModal();
          await element1.current.scrollTo({ top: scrollToY });
        }}
        className="z-30"
      >
        {data.button}
      </span>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <div className="h-0 relative z-40">
          <div className="h-12 bg-gradient-to-b from-white"></div>
        </div>
        <div className="h-0 relative z-50 flex justify-end mr-2 mt-2 cursor-pointer">
          <div onClick={closeModal} className="h-10 cursor-pointer">
            <i className="far fa-times-circle text-xl text-gray-400"></i>
          </div>
        </div>
        <div
          ref={element1}
          className="overflow-y-scroll "
          style={{ height: "85vh", width: "94vw" }}
        >
          <div>
            <ScrollLock />
            {data.modal}
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div className="relative z-40 ">
      <span onClick={openModal} className="z-30">
        {data.button}
      </span>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal2"
      >
        <div className="h-0">
          <div className="h-20 bg-gradient-to-b from-white"></div>
        </div>
        <div className="flex justify-end mr-2 mt-2">
          <div onClick={closeModal} className=" cursor-pointer">
            <i className="far fa-times-circle text-xl text-gray-400"></i>
          </div>
        </div>
        <div className=" " style={{ width: "65rem" }}>
          <div className="p-4">
            <ScrollLock />
            {data.modal}
          </div>
        </div>
      </Modal>
    </div>
  );
}
