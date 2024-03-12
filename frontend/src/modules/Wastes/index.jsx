import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Table from "../../components/Common/Table";
import UserList from "../../components/Management/UserList";
import WasteList from "../../components/Management/WasteList";
import { useUploadImage } from "../../hooks/useUploadImage";
import { useUsers } from "../../hooks/useUser";
import { useWastes } from "../../hooks/useWaste";
import { createUser, deleteUser } from "../../api/user";
import { deleteWaste } from "../../api/waste";
import { wasteHeader } from "../../constants/wasteHeader";

import defaultImage from "../../assets/default-image.jpg";
import citiesMunicipalities from "../../constants/citiesMunicipalities";
import { organizationType } from "../../constants/organizationType";

export default function Wastes() {
  document.title = "Green Loop | Dashboard";
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { allUsers, error } = useUsers();
  const { wastes } = useWastes();
  const { image, fetchImage, imagePreview, setImage, setImagePreview } =
    useUploadImage();
  const { register, handleSubmit, reset } = useForm();

  const getWasteData = (wasteId) => {
    setShowModal(true);
    const wasteRecord = wastes.filter((waste) => waste.id == wasteId);
    console.log("wasteRecord: ", wasteRecord[0]);
    setUserData(wasteRecord[0]);
  };

  const { mutate: createUserData } = useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      alert("User created successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      setShowModal(false);
      setUserData({});
      setImagePreview("");
      setImage("");
    },
  });

  const { mutate: deleteWasteAction } = useMutation({
    mutationFn: (wasteId) => deleteWaste(wasteId),
    onSuccess: () => {
      alert("Waste has been deleted");
      queryClient.invalidateQueries({ queryKey: ["wastes"] });
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
    createUserData({ ...data, onAdmin: true, image });
  };

  const onClose = () => {
    setShowModal(false);
    setUserData({});
    setImagePreview("");
    setImage("");
  };

  useMemo(() => {
    reset(userData);
  }, [userData, reset]);

  return (
    <>
      <div className="overflow-x-scroll shadow rounded-lg">
        <Table>
          <Table.Header
            data={wasteHeader}
            render={(header) => <Table.Column key={header} header={header} />}
          />
          <Table.Body>
            {wastes?.map((waste, i) => (
              <WasteList
                key={i}
                props={waste}
                getWasteData={getWasteData}
                deleteWasteAction={deleteWasteAction}
              />
            ))}
          </Table.Body>
        </Table>
        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-2xl">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-108 bg-white outline-none focus:outline-none xsm:h-3/4 xsm:w-80">
                    <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b md:p-2">
                      <div className="bg-white border w-[60%] justify-center items-center mx-auto border-gray-200 px-12 shadow-sm rounded-3xl xl:w-[80%] lg:w-[90%] md:w-full md:px-4 ">
                        <article className="p-4">
                          <footer className="flex justify-center items-center">
                            <div className="flex items-center mb-5">
                              <p className="inline-flex items-center text-3xl font-[500] text-[#4F772D]">
                                Post Details
                              </p>
                            </div>
                          </footer>
                          <hr className="py-3" />
                          {/* {errors?.post && (
                              <ErrorMessage error={errors?.post.message} />
                            )} */}

                          <textarea
                            id="post"
                            name="post"
                            rows="4"
                            className="text-gray-900 text-left w-full overflow-y-hidden mb-3 focus:outline-none focus: border-0"
                            placeholder="Say something about the waste"
                            {...register("post")}
                          />
                          <div className="grid">
                            {/* {errors?.wasteCategory && (
                                <ErrorMessage
                                  error={errors?.wasteCategory.message}
                                />
                              )} */}
                            <select
                              id="wasteCategory"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-2/5 p-2.5 md:w-[10rem]"
                              {...register("wasteCategory")}
                            >
                              <option value="">Select an option</option>
                              {/* {wasteCategories.map((category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))} */}
                            </select>
                          </div>
                        </article>

                        {imagePreview ? (
                          <>
                            <img
                              src={
                                imagePreview
                                  ? URL.createObjectURL(imagePreview)
                                  : null
                              }
                              alt={imagePreview ? imagePreview.name : null}
                              className="relative w-full h-[20rem] border-2 bg-white rounded-lg flex justify-center items-center mb-5"
                            />
                            <label
                              htmlFor="image-upload"
                              className="w-full px-7 py-1 cursor-pointer mb-0 border rounded-full bg-[#F8F8F8]"
                            >
                              Replace
                            </label>
                            <input
                              type="file"
                              id="image-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={fetchImage}
                            />
                          </>
                        ) : (
                          <>
                            <div className="relative w-full h-[20rem] border-dashed border-[#e9e4e4] border-2 bg-white rounded-lg flex justify-center items-center mb-5 md:h-[12rem] xsm:mb-0 xsm:h-[6rem]">
                              <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={fetchImage}
                              />
                              <label
                                htmlFor="image-upload"
                                className="absolute cursor-pointer"
                              >
                                {/* <IoAddSharp className="w-14 h-14 bg-[#F1F1F1] text-slate-400 rounded-lg m-2" /> */}
                                <p className="text-slate-400 text-clamp-base">
                                  Add Image
                                </p>
                              </label>
                            </div>
                            {/* {errors["image.url"] && (
                                <ErrorMessage
                                  error={errors["image.url"].message}
                                />
                              )} */}
                          </>
                        )}

                        {/* <ButtonOutline
                            disabled={isCreating}
                            className="w-full my-10 sm:text-clamp-xs sm:py-2"
                            type="submit"
                          >
                            Upload
                          </ButtonOutline> */}
                      </div>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-clamp-button md:px-3 md:py-1"
                        type="button"
                        onClick={onClose}
                      >
                        Close
                      </button>
                      <button
                        className="bg-[#31572C] text-white active:bg-[#2e4d29] font-bold uppercase text-xs px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-clamp-button md:px-3 md:py-1"
                        type="submit"
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
          </>
        )}
      </div>
    </>
  );
}
