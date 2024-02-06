import { transformText } from "../../utils/plasticColors";

const ListingCard = ({ props }) => {
  const { image, post, wasteCategory } = props;
  const transformedTexts = transformText(wasteCategory);
  console.log("transformedTexts: ", props);
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2 md:my-4">
      <div className="h-[20rem] flex items-center justify-between lg:justify-evenly sm:h-[10rem] 2xsm:h-[7rem]">
        <div className="w-screen border rounded-t-3xl">
          <img
            src={`http://localhost:8000/images/waste/${
              image ? image : "defaultimage.jpg"
            }`}
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
