const categories = [
  "Plastic", 
  "Plastic Bottles", 
  "Glass", 
  "Scrap Metal", 
  "E-waste", 
  "Textitle",
  "Food waste",
  "Biodegradable waste"
]

const FilterCard = ({ handleOnChangeFilter }) => {
  return (
    <div
      className={`z-50 max-w-sm absolute border border-violet-800"
      } border h-[25rem] overflow-y-auto text-base w-[18rem] list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg`}
      id="notification-dropdown"
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 ">
        Filter By
      </div>
      <div>
          <div className="w-full rounded-full">
            {categories.map((category, index) => (
               <div key={index} onClick={(e)=> handleOnChangeFilter(e)} className={`text-${category} flex justify-center py-3 font-normal text-sm hover:bg-gray-100 cursor-pointer`}>
               {category}
               </div>
            ))}
            
          </div>
      </div>
      </div>
  );
};

export default FilterCard;
