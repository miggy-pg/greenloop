import { IoFilter, IoSwapVerticalSharp, IoClose } from "react-icons/io5";

import ListingCard from "../../components/ListingCard";
import { useEffect, useState } from "react";
import FilterCard from "../../components/FilterCard";
import SortByCard from "../../components/SortByCard";
import { fetchWastes } from "../../api/waste";

const Listing = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);

  const [waste, setWaste] = useState({})
  const [filteredWaste, setFilteredWaste] = useState({})
  const [filterValue, setFilterValue] = useState("")

  const origWaste = filterValue.length > 0 ? filteredWaste : waste

  const handleOnChangeFilter = (e) => {
    setFilterValue(e.target.textContent)
    const filteredWaste = waste.filter((waste) => waste.waste.wasteCategory == e.target.textContent)
    setFilteredWaste(filteredWaste)
  }
  const sortedWaste = !isLoading && waste.sort((a, b) => new Date(a.waste.createdAt) - new Date(b.waste.createdAt))
  // console.log("isLoading: ", isLoading);
  // console.log("waste: ", !isLoading && waste.sort((a, b) => console.log("a: ", typeof new Date(a.waste.createdAt))));
  console.log("sorted: ", sortedWaste);

  const handleSortBy = (e) => {
    console.log("origWaste: ", origWaste);
    console.log(e.target.textContent)
    if (e.target.textContent == "Latest to Oldest") {
      const sortedWaste = origWaste.sort((a, b) => { return new Date(a.waste.createdAt) - new Date(b.waste.createdAt)})
      console.log("sorted: ", sortedWaste);
      // setWaste(sortedWaste)
    }
    else{
      const sortedWaste = origWaste.sort((a, b) => new Date(b.waste.createdAt) - new Date(a.waste.createdAt))
      console.log("sorted: ", sortedWaste);
      // const sortedWaste = origWaste.map((waste)=> console.log(waste.waste))
      // .sort((a, b) => new Date(b.waste.createdAt) - new Date(a.waste.createdAt))
      // setWaste(sortedWaste)
      // console.log("sortedHere: ", sortedWaste);
    }
  }

  const handleClearFilter = () => {
    setFilterValue("")
  }

  useEffect(() => {
    async function getUser(){

      try{
        const { data } = await fetchWastes()
        setWaste(data)
        setIsLoading(false)
      }
      catch(err){
        console.log(err)
      }
    } 
    getUser()
		
  }, []);

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
          <div className="flex ml-5 py-3">
          {filterValue && 
          <> 
            <span className="text-lg mr-5">
              Applied Filter: 
              </span>
              <span className="text-medium font-semibold bg-gray-300 px-2 rounded-full">
              {filterValue}
              <button
                className="absolute pl-2 pt-1 focus:outline-none"
                onClick={handleClearFilter}
                >
                <IoClose className="text-gray-500 hover:text-red-500" />
              </button>
            </span>
            </>
          }
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
              <div className="absolute right-[30rem] top-[23rem] border border-green-500">
                <FilterCard handleOnChangeFilter={handleOnChangeFilter}/>
              </div>
            )}
            {isSortBy && (
              <div className="absolute right-[30rem] top-[23rem] border border-green-500">
                <SortByCard handleSortBy={handleSortBy} />
              </div>
            )}
        </div>
      </div>
    
      <div className="flex justify-center px-6">
        <div className="w-4/5 mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {
            origWaste.length > 0 && origWaste.map((waste, index) => <ListingCard key={index} waste={waste} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Listing;
