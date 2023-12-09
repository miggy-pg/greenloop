import { IoFilter, IoSwapVerticalSharp } from "react-icons/io5";

import ListingCard from "../../components/ListingCard";
import { useState } from "react";
import FilterCard from "../../components/FilterCard";
import SortByCard from "../../components/SortByCard";
import profileImage from "../../assets/img1.jpg";

const Profile = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);

  const token = localStorage.getItem("user:token")
  const [showModal, setShowModal] = useState(false);


  console.log("isFilter: ", isFilter);
  console.log("isSortBy: ", isSortBy);

  return (
    <div className="grid w-full py-6 overflow-x-hidden bg-[#F8F8F8]" id="profile">
      <div className="max-w-screen-lg flex flex-col text-center justify-center">
        <div className="flex justify-center items-center border bg-white px-6 w-screen h-[30rem] xl:px-0">
          <div className="block md:max-w-lg py-10 h-80">
              <span className="flex justify-center items-center text-center mb-3">
                <img src={profileImage} className="rounded-full w-40 h-40"/>
              </span>
              <p className="mb-0 text-3xl font-normal text-black">LGU - Iligan</p>
              <p className="mb-5 text-normal font-thin text-black">Waste Generator</p>
              <p className="mb-5 text-normal font-normal text-black">Iligan City</p>
              
              {token?
              <span 
              onClick={() => setShowModal(true)}
              className="text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full text-sm px-10 py-1 text-center inline-flex items-center">
                Edit Profile
              </span>
              :
              <span className="text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full text-sm px-10 py-1 text-center inline-flex items-center">
                Message
              </span>
              }
              {showModal ? ( 
                <>
                  <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-2xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[30rem] bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-center p-5 border-solid mx-auto border-blueGray-200 rounded-t">
                          <h3 className="text-2xl font-semibold">
                            Edit Profile
                          </h3>
                        </div>
                        <hr/>

                        <div className="relative p-6 pb-1">
                          <span className="flex justify-center items-center text-center mb-3">
                            <img src={profileImage} className="rounded-full w-40 h-40"/>
                          </span>
                          <span 
                            onClick={() => setShowModal(true)}
                            className="text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full text-sm px-10 py-1 text-center inline-flex items-center">
                              Update Profile Picture
                          </span>

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
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Password:
                            </p>
                          </div>
                          <div className="p-6 mr-10 pt-0">
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              John Doe
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              john.doe123
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              example@email.com
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Organization A
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              City ABC
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              Province XYZ
                            </p>
                            <p className="my-4 text-[#5b5c61] text-sm leading-relaxed">
                              ********
                            </p>
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
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Update Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <div className="w-4/5 mt-10 grid md:grid-cols-2">
          <div className="flex ml-5">
            <span className="text-3xl">

            LGU - Iligan&apos;s uploaded wastes
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
      </div>
    
      <div className="flex justify-center px-6">
        <div className="w-4/5 mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
          <ListingCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
