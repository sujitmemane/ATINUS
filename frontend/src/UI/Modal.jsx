import React, { useContext } from "react";
import { Modal } from "flowbite-react";
import { AppContext } from "../context/AppContextProvider";

const ModalComp = () => {
  const { isModalOpen, handleCloseModal, modalContent, modalSize } =
    useContext(AppContext);
  return (
    <Modal
      dismissible
      show={isModalOpen}
      position={"center"}
      onClose={handleCloseModal}
      size={modalSize}
      className="z-10"
    >
      <Modal.Body className="p-0  z-20">{modalContent}</Modal.Body>
    </Modal>
  );
};

export default ModalComp;
