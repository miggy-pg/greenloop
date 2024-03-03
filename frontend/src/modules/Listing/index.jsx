import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  IoFilter,
  IoSwapVerticalSharp,
  IoClose,
  IoTrashBinSharp,
} from "react-icons/io5";

import Pagination from "../../components/Common/Pagination";
import ListingCard from "../../components/Common/ListingCard";
import FilterCard from "../../components/Common/FilterCard";
import SortByCard from "../../components/Common/SortByCard";
import { useWastes } from "../../hooks/useWaste";
import { usePaginate } from "../../hooks/usePaginate";

const Listing = ({ myWaste }) => {
  document.title = "Green Loop | Listing";

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { wastes, isLoading, error } = useWastes();

  let wasteItems;
  if (searchQuery) {
    wasteItems = wastes?.filter((waste) => waste.post.includes(searchQuery));
  } else {
    wasteItems = wastes;
  }

  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);
  const [filteredWaste, setFilteredWaste] = useState({});
  const [filterValue, setFilterValue] = useState("");

  const wasteToDisplay = myWaste ? myWaste : wasteItems;
  const origWaste = filterValue ? filteredWaste : wasteToDisplay;

  const {
    searchParams: paginatePage,
    setSearchParams,
    currentPage,
    currentPosts,
  } = usePaginate(origWaste);

  const handleOnChangeFilter = (e) => {
    setFilterValue(e.target.textContent);
    const filteredWaste = origWaste.filter(
      (waste) => waste.wasteCategory == e.target.textContent
    );
    setFilteredWaste(filteredWaste);
    setIsFilter(false);
  };

  const handleSortBy = (e) => {
    if (e.target.textContent == "Latest to Oldest") {
      origWaste?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      origWaste.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setIsSortBy(false);
  };

  const handleClearFilter = () => {
    setFilterValue("");
  };

  if (isLoading) return;

  if (error) return <p>Error</p>;

  return (
    <div
      className={`grid w-full h-full overflow-x-hidden ${
        myWaste
          ? "bg-[#F3F4F6] py-0"
          : !currentPosts?.length
          ? "bg-[#F8F8F8]"
          : "bg-white py-6"
      }`}
      id="listing"
    >
      <div
        className={`flex text-left justify-start items-center lg:h-[11rem] md:h-[10rem] sm:h-[9rem] xsm:h-[8rem] ${
          myWaste
            ? " pt-0 h-20 bg-[#F3F4F6] w-4/5"
            : " bg-[#4F772D] h-48 pt-12 shadow-sm"
        }`}
      >
        <p
          className={`w-screen font-normal lg:pl-20 lg:text-[2.5rem] md:pl-16 md:text-[2rem] md:justify-center sm:text-left sm:pl-14 sm:text-[2rem] xsm:text-[1.3rem] xsm:pl-11 2xsm:text-[1.2rem] ${
            myWaste ? "text-3xl pl-32 text-black" : "text-5xl pl-24 text-white"
          }`}
        >
          {myWaste ? "My Waste" : "WASTE LISTING"}
        </p>
      </div>
      <div className="w-screen px-32 grid md:px-0">
        <div className="flex items-center justify-between">
          <div className="md:ml-3">
            {filterValue && (
              <>
                <span className="text-clamp-base mr-5">Applied Filter:</span>
                <span className="text-clamp-base font-semibold bg-gray-300 px-2 rounded-full">
                  {filterValue}
                  <button
                    className="absolute pl-2 pt-1 focus:outline-none"
                    onClick={handleClearFilter}
                  >
                    <IoClose className="text-gray-500" />
                  </button>
                </span>
              </>
            )}
          </div>
          <div>
            <button
              className="p-2 m-4 rounded-lg bg-[#31572C] cursor-pointer"
              onClick={() => setIsFilter((filter) => !filter)}
            >
              <IoFilter className="text-white" />
            </button>
            <button
              className="p-2 m-4 rounded-lg bg-[#31572C] cursor-pointer"
              onClick={() => setIsSortBy((sortby) => !sortby)}
            >
              <IoSwapVerticalSharp className="text-white " />
            </button>
          </div>
        </div>

        {isFilter && (
          <div className="absolute z-10 right-[30rem] top-[18rem] border border-green-500 md:top-[15rem] md:right-[21rem] sm:right-[20rem] sm:top-[14rem] xsm:top-[13rem]">
            <FilterCard handleOnChangeFilter={handleOnChangeFilter} />
          </div>
        )}

        {isSortBy && (
          <div className="absolute z-10 right-[26rem] top-[18rem] border border-green-500 md:top-[15rem] md:right-[21rem] sm:right-[20rem] sm:top-[14rem] xsm:top-[13rem]">
            <SortByCard handleSortBy={handleSortBy} />
          </div>
        )}
      </div>

      <div className="flex justify-center md:px-0">
        <div
          className={`mt-7 grid gap-10 px-32 ${
            currentPosts?.length && "grid-cols-3"
          } lg:grid-cols-2 lg:w-[90%] lg:px-16 lg:gap-10 md:mt-4 md:gap-2 md:grid-cols-1 md:px-24 sm:px-16 xsm:px-4`}
        >
          {currentPosts?.length ? (
            currentPosts?.map((waste, index) => (
              <ListingCard key={index} waste={waste} />
            ))
          ) : (
            <span className="flex grid-cols-2 w-full text-3xl font-semibold justify-center items-center">
              <p className="flex items-center mt-24">
                <IoTrashBinSharp className="mr-2" /> No Waste Found
              </p>
            </span>
          )}
        </div>
      </div>
      {origWaste?.length > 2 && (
        <div className="flex justify-center px-6 mb-4 mt-10 lg:mb-16 sm:px-0 sm:pb-0 ">
          <Pagination
            origWaste={origWaste}
            paginatePage={paginatePage}
            setSearchParams={setSearchParams}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Listing;
