const FilterCard = ({ scrollActive, type }) => {
  return (
    <div
      className={`z-50 max-w-sm absolute border border-violet-800"
      } border h-36 overflow-y-auto text-base w-[18rem] list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg`}
      id="notification-dropdown"
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 ">
        Filter By
      </div>
      <div>
          <div className="flex-shrink-0 px-5">

        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Waste Category</label>
            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                <option selected="">Flowbite</option>
                <option value="RE">React</option>
                <option value="AN">Angular</option>
                <option value="VU">Vue JS</option>
            </select>
        </div>
      </div>
      </div>
  );
};

export default FilterCard;
