import { useRef, useState } from "react";
import Modal from "react-modal";
import ScrollLock from "../../../effects/ScrollLock";
import useIsMobile from "../../../hooks/useIsMobile";

const defaultData = {
  button: <></>,
  modal: <></>,
};

export default function App({ data = defaultData }) {
  const isMobile = useIsMobile();
  Modal.setAppElement("#__next");
  const [isModalOpen, setisModalOpen] = useState(false);
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
          transitionDuration: "0.2s",
        },
      }
    : {
        content: {
          top: "51%",
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
          transitionDuration: "0.2s",
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

  const element1: any = useRef();

  return isMobile ? (
    <div className={`relative z-40`}>
      <span
        onClick={async () => {
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
          ref={element1}
          className="mo-max overflow-y-auto "
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
        <div className="h-0">
          <div className="h-20 bg-gradient-to-b from-white"></div>
        </div>
        <div className="flex justify-end mr-2 mt-2">
          <div onClick={closeModal} className=" cursor-pointer">
            <i className="far fa-times-circle text-xl text-gray-400"></i>
          </div>
        </div>
        <div
          className="pc-max overflow-y-auto"
          style={{ maxHeight: "30rem", width: "30rem" }}
        >
          <div className="p-4">
            <ScrollLock />
            {data.modal}
          </div>
        </div>
      </Modal>
    </div>
  );
}
