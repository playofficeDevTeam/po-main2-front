import { useState } from "react";
import Modal from "react-modal";
import { atom, useRecoilState } from "recoil";
import ScrollLock from "../../effects/ScrollLock";
import useIsMobile from "../../hooks/useIsMobile";
import { FormStyle } from "./TableStyle";

const data1 = {
  button: <></>,
  modal: <></>,
};

export const isModal_adminEditOpenAtom = atom({
  key: "isModal_adminEditOpenAtom",
  default: false,
});

export default function App({ data = data1 }) {
  const isMobile = useIsMobile();
  Modal.setAppElement("#__next");
  const [isModalOpen, setisModalOpen] = useRecoilState(
    isModal_adminEditOpenAtom
  );
  const [isModalAnimated, setIsModalAnimated] = useState(false);

  const customStyles = isMobile
    ? {
        content: {
          top: "auto",
          left: "50%",
          right: "auto",
          marginRight: "-50%",
          padding: 0,
          borderRadius: "0.5rem",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          bottom: "-2px",
          zindex: 1000,
          transform: isModalAnimated
            ? "translate(-50%, 0%)"
            : "translate(-50%, 40%)",
          opacity: isModalAnimated ? 1 : 0,
          transitionDuration: "0.1s",
        },
      }
    : {
        content: {
          top: "49%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          padding: 0,
          borderRadius: "0.5rem",
          zindex: 1000,
          transform: isModalAnimated
            ? "translate(-50%, -50%)"
            : "translate(-50%, -48%)",
          opacity: isModalAnimated ? 1 : 0,
          transitionDuration: "0.1s",
        },
      };

  function openModal() {
    setisModalOpen(true);
  }

  function afterOpenModal() {
    setIsModalAnimated((val) => true);
  }

  function closeModal() {
    setIsModalAnimated((val) => false);
    setisModalOpen(false);
  }

  return isMobile ? (
    <div className={`relative z-40`}>
      <span
        onClick={() => {
          openModal();
        }}
        className="z-30"
      >
        {data.button}
      </span>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="modal"
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
          className="mo-max overflow-y-auto py-10  middle-scroll"
          style={{ maxHeight: "85vh", width: "94vw" }}
        >
          <div>
            <ScrollLock />
            {data.modal}
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    // 피씨
    // 피씨
    // 피씨
    <div className={`relative z-40`}>
      <span onClick={openModal} className="z-30">
        {data.button}
      </span>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="modal"
      >
        <div className="relative z-50 flex justify-end mr-2 mt-2 ">
          <div className="h-6">
            <i
              className="cursor-pointer far fa-times-circle text-xl text-gray-400"
              onClick={closeModal}
            ></i>
          </div>
        </div>
        <div
          className="pc-max overflow-y-auto middle-scroll"
          style={{ maxHeight: "80vh" }}
        >
          <div className="p-4">
            <ScrollLock />
            <FormStyle>{data.modal}</FormStyle>
          </div>
        </div>
      </Modal>
    </div>
  );
}
