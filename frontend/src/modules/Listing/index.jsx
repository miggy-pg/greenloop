import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IoFilter, IoSwapVerticalSharp, IoClose } from "react-icons/io5";

import Pagination from "../../components/Pagination";
import ListingCard from "../../components/ListingCard";
import FilterCard from "../../components/FilterCard";
import SortByCard from "../../components/SortByCard";
import { fetchWastes } from "../../api/waste";

const PAGE_SIZE = 6;

const Listing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);
  const [openName, setOpenName] = useState("");

  const [postsPerPage, setPostsPerPage] = useState(6);

  const [waste, setWaste] = useState({});
  const [filteredWaste, setFilteredWaste] = useState({});
  const [filterValue, setFilterValue] = useState("");

  const origWaste = filterValue ? filteredWaste : waste;

  const handleOnChangeFilter = (e) => {
    setFilterValue(e.target.textContent);
    const filteredWaste = waste.filter(
      (waste) => waste.waste.wasteCategory == e.target.textContent
    );
    setFilteredWaste(filteredWaste);
  };

  const sortedWaste =
    !isLoading &&
    waste.sort(
      (a, b) => new Date(a.waste.createdAt) - new Date(b.waste.createdAt)
    );
  // console.log("isLoading: ", isLoading);
  // console.log("waste: ", !isLoading && waste.sort((a, b) => console.log("a: ", typeof new Date(a.waste.createdAt))));
  console.log("sorted: ", sortedWaste);

  const handleSortBy = (e) => {
    if (e.target.textContent == "Latest to Oldest") {
      const sortedWaste = origWaste.sort((a, b) => {
        return new Date(a.waste.createdAt) - new Date(b.waste.createdAt);
      });
      console.log("sorted: ", sortedWaste);
      // setWaste(sortedWaste)
    } else {
      const sortedWaste = origWaste.sort(
        (a, b) => new Date(b.waste.createdAt) - new Date(a.waste.createdAt)
      );
      console.log("sorted: ", sortedWaste);
      // const sortedWaste = origWaste.map((waste)=> console.log(waste.waste))
      // .sort((a, b) => new Date(b.waste.createdAt) - new Date(a.waste.createdAt))
      // setWaste(sortedWaste)
      // console.log("sortedHere: ", sortedWaste);
    }
  };

  const handleClearFilter = () => {
    setFilterValue("");
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // Calculate actual number of pages
  const pageCount = Math.ceil(origWaste.length / PAGE_SIZE);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    !isLoading && origWaste.slice(indexOfFirstPost, indexOfLastPost);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  const paginate = (pageNumber) => {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await fetchWastes();
        setWaste(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  // console.log("origWaste: ", origWaste.length?);

  return (
    <>
      <div
        className="grid w-full h-full py-6 overflow-x-hidden bg-white"
        id="listing"
      >
        <div className="bg-[#4F772D] w-full shadow-sm flex h-[13rem] pt-14 text-left justify-start items-center lg:mb-0 lg:pl-[5rem] md:pl-0 sm:h-[8rem]">
          <p className="text-6xl font-normal text-white ml-32 w-screen lg:ml-10 lg:text-[3rem] md:text-center md:ml-0 md:justify-center sm:text-[1rem] 2xsm:text-[1.2rem] ">
            WASTE LISTING
          </p>
        </div>
        <div className="flex justify-center pt-10 md:pt-3 2xsm:pt-0">
          <div className="mt-10 grid md:grid-cols-2">
            <div className="flex ml-5 py-3">
              {filterValue && (
                <>
                  <span className="text-lg mr-5">Applied Filter:</span>
                  <span className="text-medium font-semibold bg-gray-300 px-2 rounded-full">
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
              <div className="absolute right-[30rem] top-[23rem] border border-green-500 sm:right-[20rem] sm:top-[15rem]">
                <FilterCard handleOnChangeFilter={handleOnChangeFilter} />
              </div>
            )}

            {isSortBy && (
              <div className="absolute right-[30rem] top-[23rem] border border-green-500 sm:right-[20rem] sm:top-[15rem]">
                <SortByCard handleSortBy={handleSortBy} />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center md:px-0">
          <div className="mt-10 grid gap-10 px-32 grid-cols-3 lg:grid-cols-2 lg:w-[90%] lg:px-16 lg:gap-10 md:gap-2 md:grid-cols-1 sm:px-4">
            {currentPosts.length ? (
              currentPosts.map((waste, index) => (
                <ListingCard key={index} props={waste} />
              ))
            ) : (
              <p className="text-3xl font-semibold text-center">
                No Waste Found
              </p>
            )}
          </div>
        </div>
        {origWaste.length > 2 ? (
          <div className="justify-center px-6 pb-10 sm:px-0 sm:pb-0 ">
            <div className="items-center">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={origWaste.length}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
                pageCount={pageCount}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Listing;
