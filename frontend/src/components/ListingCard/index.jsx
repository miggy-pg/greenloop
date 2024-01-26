import plasticColors from "../../utils/plasticColors";

const ListingCard = ({ props }) => {
  const { image, post, wasteCategory } = props.waste;
  console.log("propsWaste: ", props);
  const getColorClass = (text) => {
    return `[#4b443e}]` || "bg-[#E27A00]";
  };

  const colorClass = getColorClass(wasteCategory);
  console.log("colorClass: ", colorClass);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2">
      <div className="h-[15rem] flex items-center justify-between lg:justify-evenly 2xsm:h-[7rem]">
        <div className="w-screen border rounded-t-3xl">
          <img
            src={`http://localhost:8000/images/waste/${
              image ? image : "defaultimage.jpg"
            }`}
            className="object-cover w-full h-[15rem] rounded-t-3xl 2xsm:h-[7rem]"
          />
        </div>
      </div>
      <article className="p-6">
        <p className="text-gray-900 text-left xsm:text-[0.7rem]">{post}</p>
        <div className="flex flex-wrap mt-3">
          <p
            className={`text-white text-left py-1 text-[0.7rem] rounded-full border border-${colorClass} bg-${colorClass} m-1 p-3`}
          >
            {wasteCategory || ""}
          </p>
        </div>
      </article>
    </div>
  );
};

export default ListingCard;
