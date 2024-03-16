import { transformText } from "../../../utils/plasticColors";
import defaultImage from "../../../assets/images/waste-default-image.webp";

const ListingCard = ({ waste }) => {
  const { image, post, wasteCategory } = waste;
  const transformedTexts = transformText(wasteCategory);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2 md:my-4">
      <div className="h-[20rem] flex items-center justify-between lg:justify-evenly sm:h-[10rem] 2xsm:h-[7rem]">
        <div className="w-screen border rounded-t-3xl">
          <img
            src={image?.url ? image?.url : defaultImage}
            className="object-cover w-full h-[20rem] rounded-t-3xl sm:h-[10rem] 2xsm:h-[8rem]"
          />
        </div>
      </div>
      <article className="p-6">
        <p className="text-gray-900 text-left xsm:text-[0.7rem]">{post}</p>
        <div className="flex flex-wrap mt-3">
          <p
            className={`text-black text-left py-1 text-[0.7rem] rounded-full ${transformedTexts} m-1 p-3`}
          >
            {wasteCategory || "undefined"}
          </p>
        </div>
      </article>
    </div>
  );
};

export default ListingCard;
