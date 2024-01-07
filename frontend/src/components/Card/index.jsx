import { IoDocumentOutline } from "react-icons/io5";

const Card = () => {
  return (
    <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-3xl sm:p-6 my-2">
      <div className="items-center justify-between lg:flex">
        <div className="flex h-[3rem] py-5 px-4 lg:mb-0 text-left justify-center items-center">
          <div></div>
          <div className="flex items-left">
            <p className="inline-flex items-center mr-3 text-sm font-semibold text-gray-900 ">
              <IoDocumentOutline className="w-[3rem] h-[3rem]" />
              <h3 className="ml-4 text-2xl font-bold text-black">
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
