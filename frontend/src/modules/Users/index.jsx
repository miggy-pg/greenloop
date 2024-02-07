import { useEffect, useState } from "react";

import Table from "../../components/Table";
import UserList from "../../components/Management/UserList";
import { deleteUser, fetchUsers } from "../../api/user";
import { userHeader } from "../../constants/userHeader";

import defaultImage from "../../assets/default-image.jpg";

export default function Dasbhboard() {
  const [users, setUsers] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState("");

  const getUserData = (userId) => {
    const userRecord = users.filter((user) => user.user.id == userId);
    setUserData(userRecord[0].user);
  };

  const handleFileInputChange = (e) => {
    setUserData({ ...userData, image: e.target.files[0] });
  };

  const onDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await fetchUsers();
      console.log("res: ", data);
      setUsers(data);
      setIsLoading(false);
    };
    fetchUserData();

    document.title = "Green Loop | Users";
  }, []);

  return (
    <div className="bg-[#F8F8F8] w-full h-screen mt-16 py-14" id="homepage">
      <div className="max-w-screen-2xl px-6 sm:px-8 lg:px-16 mx-auto flex flex-col text-center justify-center">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-x-scroll shadow rounded-lg">
            <Table>
              <Table.Header
                data={userHeader}
                render={(header) => (
                  <Table.Column key={header} header={header} />
                )}
              />
              <Table.Body>
                {!isLoading &&
                  users.map((user, i) => (
                    <UserList
                      key={i}
                      id={user.id}
                      image={user.user.image}
                      companyName={user.user.companyName}
                      email={user.user.email}
                      organizationType={user.user.organizationType}
                      password={user.user.password}
                      province={user.user.province}
                      cityMunicipality={user.user.cityMunicipality}
                      username={user.user.username}
                      userId={user.user.id}
                      setShowModal={setShowModal}
                      getUserData={getUserData}
                      onDelete={onDelete}
                    />
                  ))}
              </Table.Body>
            </Table>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-2xl">
                    <form
                      // onSubmit={(e) => onSubmit(e)}
                      encType="multipart/form-data"
                    >
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[30rem] bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-center p-5 border-solid mx-auto border-blueGray-200 rounded-t">
                          <h3 className="text-2xl font-semibold">
                            Edit Profile
                          </h3>
                        </div>
                        <hr />

                        <div className="relative p-6 pb-1">
                          <span className="flex justify-center items-center text-center mb-3">
                            {userData?.image ? (
                              <img
                                src={
                                  userData?.image
                                    ? URL.createObjectURL(userData?.image)
                                    : null
                                }
                                alt={
                                  userData?.image ? userData?.image.name : null
                                }
                                className="relative w-[10rem] h-[10rem] bg-white rounded-full flex justify-center items-center"
                              />
                            ) : (
                              <img
                                src={defaultImage}
                                className="relative w-[10rem] h-[10rem] bg-white rounded-full flex justify-center items-center"
                              />
                            )}
                          </span>
                          <div className="relative w-48 h-[1.7rem] text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full inline-flex justify-center items-center">
                            <input
                              type="file"
                              id="image-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileInputChange}
                            />
                            <label
                              htmlFor="image-upload"
                              className="absolute cursor-pointer"
                            >
                              {/* <IoAddSharp className="w-14 h-14 bg-[#F1F1F1] text-slate-400 rounded-lg m-2" /> */}
                              <p className="text-slate-400">
                                {userData.image
                                  ? "Replace"
                                  : "Update Profile Picture"}
                              </p>
                            </label>
                          </div>

                          <p className="mt-5 ml-10 mb-0 text-[#5b5c61] text-normal mx-auto leading-relaxed text-left">
                            Generate Account Settings:
                          </p>
                        </div>
                        <div className="grid grid-cols-2 text-left ml-10">
                          <div className="p-6 pt-0">
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Name:
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Username:
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Password:
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Email:
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Org Type:
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              City/Municipality:
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Province:
                            </p>
                          </div>
                          <div className="p-6 mr-10 pt-0">
                            <input
                              type="text"
                              name="companyName"
                              id="companyName"
                              className="mb-0 mt-4 w-full rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black sm:text-sm sm:leading-6"
                              defaultValue={userData.companyName}
                              // onChange={(e) => onChange(e)}
                            />

                            <input
                              type="text"
                              name="username"
                              id="username"
                              className="mb-0 mt-[0.9rem] w-full rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black sm:text-sm sm:leading-6"
                              defaultValue={userData.username}
                              // onChange={(e) => onChange(e)}
                            />

                            <input
                              // type={inputType}
                              name="password"
                              id="password"
                              className="mb-0 mt-[0.9rem] w-full rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black sm:text-sm sm:leading-6"
                              defaultValue={userData.password}
                              // onChange={(e) => onChange(e)}
                              // onMouseOut={() => setInputType("password")}
                              // onMouseEnter={() => setInputType("text")}
                            />

                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="mb-0 mt-[0.9rem] w-full rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black sm:text-sm sm:leading-6"
                              defaultValue={userData.email}
                              // onChange={(e) => onChange(e)}
                            />

                            <input
                              type="text"
                              name="organizationType"
                              id="organizationType"
                              className="mb-0 mt-[0.9rem] w-full rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black sm:text-sm sm:leading-6"
                              defaultValue={userData.organizationType}
                              // onChange={(e) => onChange(e)}
                            />

                            <input
                              type="text"
                              name="cityMunicipality"
                              id="cityMunicipality"
                              className="mb-0 mt-[0.9rem] w-full rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black sm:text-sm sm:leading-6"
                              defaultValue={userData.cityMunicipality}
                              // onChange={(e) => onChange(e)}
                            />

                            <input
                              type="text"
                              name="province"
                              id="province"
                              className="mb-0 mt-[0.9rem] w-full rounded-md text-[#5b5c61] border-none focus:ring-transparent focus:border-transparent focus:text-black sm:text-sm sm:leading-6"
                              defaultValue={userData.province}
                              // onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-[#31572C] text-white active:bg-[#2e4d29] font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Update Profile
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
