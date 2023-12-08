import { IoFilter, IoSwapVerticalSharp } from "react-icons/io5";

import ListingCard from "../../components/ListingCard";
import { useState } from "react";
import FilterCard from "../../components/FilterCard";
import SortByCard from "../../components/SortByCard";
import profileImage from "../../assets/img1.jpg";

const Profile = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);

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
              
              <span href="" className="text-black border bg-primary-700 cursor-pointer hover:bg-[#F8F8F8] focus:ring-4 focus:ring-primary-300 font-semithin rounded-full text-sm px-10 py-1 text-center inline-flex items-center">
                Message
              </span>
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
