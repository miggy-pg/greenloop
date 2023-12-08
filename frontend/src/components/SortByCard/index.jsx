import { Link } from "react-router-dom";

const SortByCard = ({ scrollActive, type }) => {
  return (
    <div
      className={`z-50 max-w-sm absolute border border-violet-800"
      } border h-42 overflow-y-hidden text-base w-[18rem] list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg`}
      id="sortby-dropdown"
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 ">
        Sort by
      </div>
      <div>
          <div className="w-full rounded-full">
            <div className="text-gray-500 flex justify-center py-3 font-normal text-sm hover:bg-gray-100 cursor-pointer">
Latest to Oldest
            </div>
            <div className="text-gray-500 flex justify-center py-3 font-normal text-sm hover:bg-gray-100 cursor-pointer">
Oldest to Latest
            </div>
          </div>
      </div>
      </div>
  );
};

export default SortByCard;
