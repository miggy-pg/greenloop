import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Listing from "../Listing";
import { fetchUser } from "../../api/user";
import { updateProfile } from "../../api/user";
import { createConversation } from "../../api/conversation";

import defaulImage from "../../assets/default-image.jpg";
import { useUploadImage } from "../../hooks/useUploadImage";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import { user, token } from "../../constants/userData";

const Profile = (formData = {}) => {
  const { id: profileId } = useParams();
  const { id: userId, ...editValues } = formData;
  const isLoggedIn = token !== null || false;

  const { image, imagePreview, fetchImage, setImage, setImagePreview } =
    useUploadImage();

  const {
    userData: userForm,
    isLoading: userLoading,
    error: userError,
  } = useUser();
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues: isLoggedIn ? editValues : {},
  });

  const [userData, setUser] = useState({
    companyName: "",
    username: "",
    password: "",
    email: "",
    organizationType: "",
    cityMunicipality: "",
    province: "",
  });
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...userData, [e.target.name]: e.target.value });
  };

  const messageCompany = async () => {
    const { data } = await createConversation(user?.id, profileId);
    navigate(`/chats?id=${data._id || data[0]._id}`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      image.length > 0 && (userData.image = image);
      await updateProfile(user?.id, userData);

      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
    setImage([]);
    setImagePreview("");
  };

  useEffect(() => {
    async function getUser() {
      try {
        const userId = profileId ? profileId : user?.id;
        const { data } = await fetchUser(userId);
        setUser(data[0].user);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
    setImage([]);
    setImagePreview("");
  }, [user, showModal]);

  const profileType =
    profileId && isLoggedIn
      ? String(profileId) === String(user?.id)
      : String(profileId) !== String(user?.id);

  return (
    <div
      className="grid w-full py-6 overflow-x-hidden bg-[#F8F8F8]"
      id="profile"
    >
      <div className="max-w-screen-lg flex flex-col text-center justify-center">
        <div className="bg-white flex justify-center items-center border px-6 w-screen h-108 xl:px-0 sm:h-96">
          <div className="block py-10 h-80 md:max-w-md">
            <span className="flex justify-center items-center text-center mb-3">
              <img
                src={userData?.image ? userData.image : defaulImage}
                className="rounded-full w-40 h-40 sm:h-28 sm:w-28 xsm:h-24 xsm:w-24"
              />
            </span>
            <p className="mb-0 text-3xl font-normal text-black md:text-clamp-profile">
              {userData.companyName}
            </p>
            <p className="mb-5 text-normal font-thin text-black md:text-clamp-xs ">
              {userData.organizationType}
            </p>
            <p className="mb-5 text-normal font-normal text-black md:text-clamp-base">
              {userData.cityMunicipality}
            </p>
            {profileType ? (
              <span
                onClick={() => setShowModal(true)}
                className="text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full text-sm px-10 py-1 text-center inline-flex items-center md:text-clamp-xs md:px-6"
              >
                Edit Profile
              </span>
            ) : (
              <span
                onClick={messageCompany}
                className="text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full text-sm px-10 py-1 text-center inline-flex items-center md:text-clamp-xs md:px-6"
              >
                Message
              </span>
            )}

            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-2xl">
                    <form
                      onSubmit={(e) => onSubmit(e)}
                      encType="multipart/form-data"
                    >
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-108 bg-white outline-none focus:outline-none xsm:h-3/4 xsm:w-80">
                        <div className="flex items-center justify-center p-5 border-solid mx-auto border-blueGray-200 rounded-t md:p-2">
                          <h3 className="text-2xl font-semibold md:text-clamp">
                            Edit Profile
                          </h3>
                        </div>
                        <hr />

                        <div className="relative p-6 pb-1">
                          <span className="flex justify-center items-center text-center mb-3">
                            {imagePreview ? (
                              <img
                                src={
                                  imagePreview
                                    ? URL.createObjectURL(imagePreview)
                                    : null
                                }
                                alt={imagePreview ? imagePreview.name : null}
                                className="relative w-auto h-40 bg-white rounded-full flex justify-center items-center sm:w-28 sm:h-28 xsm:h-16 xsm:w-16"
                              />
                            ) : (
                              <img
                                src={userData.image}
                                className="relative w-40 h-40 bg-white rounded-full flex justify-center items-center sm:w-28 sm:h-28 xsm:h-16 xsm:w-16"
                              />
                            )}
                          </span>
                          <div className="relative w-48 h-[1.7rem] text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full inline-flex justify-center items-center">
                            <input
                              type="file"
                              id="image-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => fetchImage(e)}
                            />
                            <label
                              htmlFor="image-upload"
                              className="absolute cursor-pointer"
                            >
                              <p className="text-slate-400 text-clamp-xs">
                                {image.length
                                  ? "Replace"
                                  : "Update Profile Picture"}
                              </p>
                            </label>
                          </div>

                          <p className="mt-5 mx-6 mb-0 text-[#5b5c61] text-clamp-xs leading-relaxed text-left xsm:mx-2">
                            Generate Account Settings:
                          </p>
                        </div>

                        <div className="relative overflow-hidden py-5">
                          <table className="w-full mx-6 text-clamp-xs text-left  rtl:text-right text-gray-500 sm:mx-2">
                            <tbody>
                              <tr className="bg-white">
                                <th
                                  scope="row"
                                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  Name:
                                </th>
                                <td className="px-6 py-2">
                                  <input
                                    type="text"
                                    name="companyName"
                                    id="companyName"
                                    className=" w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                    defaultValue={userData.companyName}
                                    onChange={(e) => onChange(e)}
                                  />
                                </td>
                              </tr>
                              <tr className="bg-white">
                                <th
                                  scope="row"
                                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  Username:
                                </th>
                                <td className="px-6 py-2">
                                  <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                    defaultValue={userData.username}
                                    onChange={(e) => onChange(e)}
                                  />
                                </td>
                              </tr>
                              <tr className="bg-white ">
                                <th
                                  scope="row"
                                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  Password:
                                </th>
                                <td className="px-6 py-2">
                                  <input
                                    type={inputType}
                                    name="password"
                                    id="password"
                                    className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                    defaultValue={userData.password}
                                    onChange={(e) => onChange(e)}
                                    onMouseOut={() => setInputType("password")}
                                    onMouseEnter={() => setInputType("text")}
                                  />
                                </td>
                              </tr>
                              <tr className="bg-white ">
                                <th
                                  scope="row"
                                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  Email:
                                </th>
                                <td className="px-6 py-2">
                                  <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                    defaultValue={userData.email}
                                    onChange={(e) => onChange(e)}
                                  />
                                </td>
                              </tr>
                              <tr className="bg-white ">
                                <th
                                  scope="row"
                                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  Org Type:
                                </th>
                                <td className="px-6 py-2">
                                  <input
                                    type="text"
                                    name="organizationType"
                                    id="organizationType"
                                    className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                    defaultValue={userData.organizationType}
                                    onChange={(e) => onChange(e)}
                                  />
                                </td>
                              </tr>
                              <tr className="bg-white ">
                                <th
                                  scope="row"
                                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  City/Municipality:
                                </th>
                                <td className="px-6 py-2">
                                  <input
                                    type="text"
                                    name="cityMunicipality"
                                    id="cityMunicipality"
                                    className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                    defaultValue={userData.cityMunicipality}
                                    onChange={(e) => onChange(e)}
                                  />
                                </td>
                              </tr>
                              <tr className="bg-white">
                                <th
                                  scope="row"
                                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                                >
                                  Province:
                                </th>
                                <td className="px-6 py-2">
                                  <input
                                    type="text"
                                    name="province"
                                    id="province"
                                    className="w-4/5 rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black md:w-24"
                                    defaultValue={userData.province}
                                    onChange={(e) => onChange(e)}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b md:p-2">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-clamp-button md:px-3 md:py-1"
                            type="button"
                            onClick={onCloseModal}
                          >
                            Close
                          </button>
                          <button
                            className="bg-[#31572C] text-white active:bg-[#2e4d29] font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:text-clamp-button md:px-3 md:py-1"
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
            ) : null}
          </div>
        </div>
      </div>
      <Listing myWaste={userData.wastes} />

      {/* <div className="flex justify-center pt-10">
        <div className="w-4/5 mt-10 grid md:grid-cols-2">
          <div className="flex">
            <span className="text-5xl lg:text-[2.5rem] md:text-[2.2rem] sm:text-[2rem] xsm:text-[1.5rem] 2xsm:text-[1.4rem]">
              My Wastes
            </span>
          </div>
          <div className="flex flex-row-reverse relative">
            <span
              className="p-2 m-2 rounded-lg bg-[#31572C] cursor-pointer"
              onClick={() => setIsSortBy((sortby) => !sortby)}
            >
              <IoSwapVerticalSharp className="text-white" />
            </span>
            <span
              className="p-2 m-2 rounded-lg bg-[#31572C] cursor-pointer"
              onClick={() => setIsFilter((filter) => !filter)}
            >
              <IoFilter className="text-white" />
            </span>
          </div>
          {false && (
            //  {isFilter && (
            <div className="absolute right-[30rem] top-[23rem] border border-green-500">
              <FilterCard />
            </div>
          )}
          {isSortBy && (
            <div className="absolute right-[30rem] top-[23rem] border border-green-500">
              <SortByCard />
            </div>
          )}
        </div>
      </div> */}
      {/* <div className="flex justify-center md:px-0">
        <div className="mt-7 grid gap-10 px-32 grid-cols-3 lg:grid-cols-2 lg:w-[90%] lg:px-16 lg:gap-10 md:mt-4 md:gap-2 md:grid-cols-1 md:px-24 sm:px-16 xsm:px-4">
          {!isLoading && userData.wastes.length > 0 ? (
            userData.wastes.map((waste, index) => (
              <ListingCard key={index} isLoading={isLoading} props={waste} />
            ))
          ) : (
            <p className="text-3xl font-semibold text-center">No Waste Found</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Profile;