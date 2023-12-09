import { IoFilter, IoSwapVerticalSharp } from "react-icons/io5";

import ListingCard from "../../components/ListingCard";
import { useEffect, useState } from "react";
import FilterCard from "../../components/FilterCard";
import SortByCard from "../../components/SortByCard";
import { fetchWastes } from "../../api/waste";

const Listing = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);

  const [waste, setWaste] = useState({})
  const [filterValue, setFilterValue] = useState("")

  const filteredWaste = waste

  const handleOnChangeFilter = (e) => {
    setFilterValue(e.target.textContent)
    const filteredWaste = waste.filter((waste) => waste.waste.wasteCategory == e.target.textContent)
    setWaste(filteredWaste)
  }


  useEffect(() => {
    async function getUser(){

      try{
        const {data, status} = await fetchWastes()
        setWaste(data)
        setIsLoading(Number(status) === 200 ? true : false)
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
          <div className="flex ml-5 py-3 border">
            <span className="text-lg mr-5">
            Applied Filter: 
            </span>
            <span className="text-medium font-semibold bg-gray-300 px-2 rounded-full">
            {filterValue}
            </span>

          </div>
          {/* <div className="flex flex-row-reverse"></div> */}
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
                <SortByCard />
              </div>
            )}
        </div>
      </div>
    
      <div className="flex justify-center px-6">
        <div className="w-4/5 mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {
            waste.length > 0 && waste.map((waste, index) => <ListingCard key={index} waste={waste} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Listing;
