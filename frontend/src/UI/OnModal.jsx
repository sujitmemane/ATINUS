import React, { useContext } from "react";
import { Modal } from "flowbite-react";
import { AppContext } from "../context/AppContextProvider";

const OnModal = () => {
  const { isOnModalOpen, handleCloseOnModal, onModalContent } =
    useContext(AppContext);
  return (
    <Modal
      show={isOnModalOpen}
      position={"center"}
      onClose={handleCloseOnModal}
      size={"2xl"}
      className="z-30" // Assign higher z-index
    >
      <Modal.Body className="p-0 z-40">{onModalContent}</Modal.Body>
    </Modal>
  );
};

export default OnModal;
