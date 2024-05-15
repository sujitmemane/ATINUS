import { createContext, useState } from "react";
import NewPost from "../components/Post/NewPost";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isOnModalOpen, setIsOnModalOpen] = useState(false);
  const [onModalContent, setOnModalContent] = useState(null);
  
  const [modalSize, setModalSize] = useState("md");
  const handleCloseModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  const handleCloseOnModal = () => {
    setOnModalContent(null);
    setIsModalOpen(false);
  };
  const handleNewPostOpener = () => {
    setModalSize("2xl");
    setModalContent(<NewPost />);
    setIsModalOpen(true);
  };
  const values = {
    isModalOpen,
    setIsModalOpen,
    modalContent,
    setModalContent,
    handleCloseModal,
    modalSize,
    setModalSize,
    isOnModalOpen,
    setIsOnModalOpen,
    onModalContent,
    setOnModalContent,
    handleCloseOnModal,
    handleNewPostOpener,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
