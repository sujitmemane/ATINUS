import React, { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";

const EditBio = () => {
  const { handleCloseOnModal, handleCloseModal } = useContext(AppContext);
  return (
    <div className="bg-[#0f0f0f] border-[1px] border-[#262626]  p-4 text-white m-0 rounded-md shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] flex-col items-center justify-between p-4  overflow-hidden">
      <div className="my-2 text-md">
        <p>
          Front-end Web 🕸️ Developer 🏗️| Cinephile 🎥 | Shavite 🔱 | Blogger 📰
          | Twitterholic 🐦
        </p>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <button
          onClick={() => {
            handleCloseModal();
            handleCloseOnModal();
          }}
          className="py-2 bg-[#1e1e1e] text-white w-full text-md rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={handleCloseOnModal}
          className="py-2 bg-white text-gray-900 w-full text-md rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditBio;
