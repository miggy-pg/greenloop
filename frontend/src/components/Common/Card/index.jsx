import { Link } from "react-router-dom";
import WasteIcon from "../../../assets/images/listing-icons.png";

const Card = ({ wasteLength }) => {
  return (
    <Link to="listing" className="flex py-5 px-4 h-18 bg-white border border-gray-200 text-left text-gray-800 shadow-sm rounded-3xl mt-2 lg:h-14 lg:mb-0 lg:px-2 md:px- sm:py-1 sm:pl-3 2xsm:h-10">
      <span className="inline-flex items-center px-3 font-semibold">
        <img
          src={WasteIcon}
          className="w-8 h-8 sm:w-6 sm:h-6"
        />
        <h3 className="ml-4 text-2xl font-normal lg:text-2xl md:text-xl sm:text-lg/none 2xsm:ml-2 2xsm:text-base/none">
          {!wasteLength ? "No Wastes Found" : "See Waste Listing"}
        </h3>
      </span>
    </Link>
  );
};

export default Card;
