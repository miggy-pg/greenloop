import plasticColors from "../../api/utils/plasticColors";

const ListingCard = ({ waste }) => {
  const {image, post, wasteCategory} = waste.waste

  const getColorClass = (text) => {
    return `[#${plasticColors[text]}]` || "bg-[#E27A00]";
  };
  const colorClass = getColorClass(wasteCategory);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2">
      <div className="h-[15rem] flex items-center justify-between lg:justify-evenly">
        <div className="w-screen border rounded-t-3xl">
          <img
            src={`http://localhost:8000/images/waste/${image ? image : "defaultimage.jpg"}`}
            className="object-cover w-full h-[15rem] rounded-t-3xl"
          />
        </div>
      </div>
      <article className="p-6">
        <p className="text-gray-900 text-left">
          {post}
        </p>
        <div className="w-4/5 flex flex-wrap mt-3">
          <p className={`text-white text-left py-1 text-[0.7rem] mx-3 rounded-full border border-${colorClass} bg-${colorClass} m-1 p-3`}>
            {wasteCategory || ""}
          </p>
          
        </div>
      </article>
    </div>
  );
};

export default ListingCard;
