import { IoDocumentOutline } from "react-icons/io5";

const Card = () => {
  return (
    <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-3xl my-2 sm:p-6 2xsm:p-4">
      <div className="items-center justify-between lg:flex">
        <div className="flex h-[4rem] py-5 px-4 text-left justify-start items-center lg:mb-0 lg:px-2 md:px-0 sm:py-1 sm:h-[2rem] xsm:h-[1.5rem] xsm:px-0 2xsm:px-1 2xsm:h-[1rem]">
          <div className="flex items-left">
            <p className="inline-flex items-center font-semibold text-gray-900 md:ml-3 sm:ml-0">
              <IoDocumentOutline className="w-[3rem] h-[3rem] lg:w-[2.3rem] lg:h-[2.3rem] md:w-[2rem] md:h-[2rem] sm:w-[1.6rem] sm:h-[1.6rem]" />
              <h3 className="ml-4 text-3xl font-bold text-black lg:text-2xl md:text-xl sm:text-[1.2rem] xsm:text-[1.1rem] 2xsm:ml-2 2xsm:text-[1rem]">
                See Waste Listings
              </h3>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
