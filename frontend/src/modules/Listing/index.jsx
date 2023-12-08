import { IoFilter, IoSwapVerticalSharp } from "react-icons/io5";

import ListingCard from "../../components/ListingCard";
import { useState } from "react";
import FilterCard from "../../components/FilterCard";
import SortByCard from "../../components/SortByCard";

const Listing = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);

  console.log("isFilter: ", isFilter);
  console.log("isSortBy: ", isSortBy);

  return (
    <div className="grid w-full py-6 overflow-x-hidden bg-white" id="listing">
      <div className="max-w-screen-lg flex flex-col text-center justify-center">
        <div className="bg-[#4F772D] w-screen shadow-sm">
          <div className="items-center justify-between lg:flex">
            <div className="flex h-[13rem] pl-[8rem] pt-14 px-4 lg:mb-0 text-left justify-center items-center">
              <p className="text-6xl font-normal ml-20 text-white">
                WASTE LISTING
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <div className="w-4/5 mt-10 grid md:grid-cols-2">
          <div className="flex flex-row-reverse"></div>
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
             {isFilter && (
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

export default Listing;
