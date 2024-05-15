import { FaImages } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { Bug, Images, X } from "lucide-react";
import axios from "axios";
import { Carousel, Spinner } from "keep-react";
import classNames from "embla-carousel-class-names";
import apiService from "../../services/api";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContextProvider";

const NewPost = () => {
  const { setIsModalOpen, setModalContent } = useContext(AppContext);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState([
    {
      text: "",
      type: "Main",

      images: [],
      poll: false,
      pollDetails: {
        options: [],
      },
      isLoading: false,
    },
  ]);

  const addPost = () => {
    setContents([
      ...contents,
      {
        text: "",
        type: "Comment",
        images: [],
        pollDetails: {
          options: [],
        },
      },
    ]);
  };

  const handleChangeTextarea = (event, index) => {
    setContents((prevContent) => {
      return prevContent.map((item, idx) => {
        if (idx === index) {
          return { ...item, text: event.target.value };
        }
        return item;
      });
    });
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleAddPollOption = (index) => {
    setContents((prevContent) => {
      return prevContent.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            pollDetails: { options: [...item?.pollDetails?.options, ""] },
          };
        }
        return item;
      });
    });
  };

  const handlePollInputOption = (e, index, optionIndex) => {
    const newContents = [...contents];
    newContents[index].pollDetails.options[optionIndex] = e.target.value;
    setContents(newContents);
  };

  const addPoll = (index) => {
    setContents((prevContent) => {
      return prevContent.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            poll: true,
            pollDetails: { options: ["Yes", "No"] },
          };
        }
        return item;
      });
    });
  };

  const handleRemovePoll = (index) => {
    setContents((prevContent) => {
      return prevContent.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            poll: false,
            pollDetails: { options: ["Yes", "No"] },
          };
        }
        return item;
      });
    });
  };

  const handleRemovePost = (index) => {
    setContents(contents.filter((_, pIndex) => index !== pIndex));
  };

  const handleRemovePollOption = (index, optionIndex) => {
    setContents((prevContent) => {
      return prevContent.map((item, idx) => {
        if (idx === index) {
          const updatedOptions = [...item.pollDetails.options];
          updatedOptions.splice(optionIndex, 1);
          return {
            ...item,
            pollDetails: { options: updatedOptions },
          };
        }
        return item;
      });
    });
  };

  const handleAddImage = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => handleImageUpload(e.target.files[0], index);
    input.click();
  };

  const handleImageUpload = async (file, index) => {
    try {
      setContents((prevContent) => {
        return prevContent.map((item, idx) => {
          if (idx === index) {
            return { ...item, isLoading: true };
          }
          return item;
        });
      });

      const formData = new FormData();
      formData.append("photo", file);
      const response = await axios.post(
        "http://localhost:4000/api/posts/image-upload",
        formData
      );

      setContents((prevContent) => {
        return prevContent.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              isLoading: false,
              images: [
                ...item?.images,
                {
                  publicId: response?.data?.data.publicId,
                  imageUrl: response?.data?.data?.imageUrl,
                },
              ],
            };
          }
          return item;
        });
      });
    } catch (error) {
      console.error("Error uploading image:", error);

      setContents((prevContent) => {
        return prevContent.map((item, idx) => {
          if (idx === index) {
            return { ...item, isLoading: false };
          }
          return item;
        });
      });
    }
  };

  const handleRemoveImage = async (index, imageIndex) => {
    try {
      const publicId = contents[index].images[imageIndex].publicId;
      setContents((prevContent) => {
        return prevContent.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              images: item.images.filter(
                (image) => image.publicId !== publicId
              ),
            };
          }
          return item;
        });
      });
      const response = await axios.post(
        "http://localhost:4000/api/posts/image-delete",
        { publicId }
      );
      console.log(response);
    } catch (error) {}
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const respose = await apiService.post("api/posts/thread", {
        thread: contents,
      });
      toast.success("Posted");
      setIsModalOpen(false);
      setModalContent(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  let contentError;
  useEffect(() => {
    contentError = contents.some((content) =>
      content.pollDetails.options.some((opt) => opt === "")
    );
    console.log("poll option", contentError);
    setDisabledBtn(contentError);
  }, [contents]);

  const lastContent = contents[contents.length - 1];
  useEffect(() => {
    const isDisabled = lastContent?.text === "";
    console.log(isDisabled);
    setDisabledBtn(isDisabled);
  }, [lastContent]);

  console.log(contents);
  return (
    <div>
      <div className="bg-[#0f0f0f] border-[1px] border-[#262626] rounded-md shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] flex-col items-center justify-between px-4 py-8  text-white m-0 overflow-hidden">
        <div className="flex flex-col space-y-2">
          {contents?.map((content, index) => (
            <div
              key={index}
              className="flex items-stretch justify-start space-x-4  "
              style={{ height: "100%" }}
            >
              <div
                style={{ height: "100%" }}
                className="flex items-center space-y-2 flex-col h-full justify-center "
              >
                <div className="w-10 h-10 shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
                  <img
                    src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                    alt=""
                    className="object-cover w-full h-full "
                  />
                </div>
                <div className="bg-[#1e1e1e] h-[80px] w-[2px]"></div>
              </div>

              <div className="flex-1" style={{ height: "100%" }}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">sujitmemane</p>
                  {index > 0 && (
                    <X
                      size={20}
                      onClick={() => handleRemovePost(index)}
                      className="text-[#696666] hover:text-white cursor-pointer"
                    />
                  )}
                </div>

                <textarea
                  placeholder="Start writing ... "
                  value={content?.text}
                  onChange={(event) => handleChangeTextarea(event, index)}
                  className="w-full  bg-transparent border-0 p-0  resize-none focus:outline-none focus:ring-0 placeholder:text-sm"
                >
                  {content?.text}
                </textarea>
                {content.poll && (
                  <div className="flex flex-col space-y-2">
                    {content.pollDetails.options.map((option, optionIndex) => (
                      <div className="bg-[#1e1e1e] text-white  w-full rounded  px-4 placeholder:text-sm  h-12 focus:border-none  focus:outline-none focus:ring-1 focus:ring-[#262626] focus:ring-offset-[1px] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-between">
                        <input
                          className="border-none text-sm outline-none flex-1 bg-transparent focus:placeholder-gray-400 focus:outline-none ring-0 focus:ring-0 shadow-none focus:shadow-none  focus:border-none disabled:opacity-50"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            handlePollInputOption(e, index, optionIndex)
                          }
                        />

                        {optionIndex > 1 && (
                          <div className="flex items-center ">
                            {" "}
                            <p
                              onClick={() =>
                                handleRemovePollOption(index, optionIndex)
                              }
                              className="flex justify-end text-sm mt-1  text-[#696666]  cursor-pointer"
                            >
                              Remove
                            </p>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex items-center justify-between">
                      <div>
                        {content.pollDetails.options.length <= 3 && (
                          <p
                            onClick={() => handleAddPollOption(index)}
                            className="flex justify-end text-sm  text-[#696666]  cursor-pointer"
                          >
                            Add Option
                          </p>
                        )}
                      </div>
                      <div>
                        <p
                          onClick={() => handleRemovePoll(index)}
                          className="flex justify-end text-sm  text-[#696666]  cursor-pointer"
                        >
                          Remove Poll
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div
                    className={` grid  gap-2 ${
                      content.images.length === 1
                        ? "grid-cols-1"
                        : content.images.length === 2
                        ? "grid-cols-2"
                        : content.images.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-4"
                    }`}
                  >
                    {content.images.map((image, imageIndex) => (
                      <div key={imageIndex} className="w-full h-full relative">
                        <img
                          src={image.imageUrl}
                          alt="Uploaded"
                          className="object-cover rounded-md  h-full w-full"
                        />
                        <div className="absolute w-6 h-6 top-2 right-1 rounded-full bg-[#939399] flex items-center justify-center ">
                          <X
                            size={15}
                            onClick={() => handleRemoveImage(index, imageIndex)}
                            className="cursor-pointer text-white "
                          />
                        </div>
                      </div>
                    ))}
                    <div className="p-4">
                      {content.isLoading && (
                        <Spinner size="lg" color={"gray"} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 my-2 items-center justify-end">
                  <button
                    disabled={content.poll}
                    onClick={() => handleAddImage(index)}
                  >
                    <Images
                      size={20}
                      className={`${
                        content.poll ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    />
                  </button>
                  <button
                    disabled={content.images.length > 0}
                    onClick={() => addPoll(index)}
                  >
                    <HiOutlineBars3BottomRight
                      size={20}
                      className={`${
                        content.poll || content.images.length > 0
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addPost}
            disabled={disabledBtn}
            className="flex items-stretch justify-start disabled:cursor-not-allowed  space-x-4  opacity-25 "
          >
            <div className="flex  items-center space-y-2 flex-col h-full justify-center w-10  ">
              <div className="w-6 h-6 shadow-2xl shadow-blue-500/20 rounded-full overflow-hidden  relative">
                <img
                  src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
                  alt=""
                  className="object-cover w-full h-full "
                />
              </div>
            </div>

            <div className="">
              <p className="text-sm">Say more ... </p>
            </div>
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            disabled={disabledBtn || contentError || loading}
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-semibold disabled:bg-red-200 disabled:cursor-not-allowed bg-white text-gray-900 rounded-full"
          >
            {loading && <Spinner />} Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
