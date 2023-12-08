import { Link } from "react-router-dom";
import pic4 from "../../assets/images/Pic-4.png";
import CategoryLabel from "../CategoryLabel";

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2">
      <div className="h-[15rem] flex items-center justify-between lg:justify-evenly">
        <div className="w-screen border rounded-t-3xl">
          <img
            src={pic4}
            className="object-cover w-full h-[15rem] rounded-t-3xl"
          />
        </div>
      </div>
      <article className="p-6">
        <p className="text-gray-900 text-left">
          Iam attaching our offer and pitch deck. Take your time to review
          everything. Iam looking forward to the next steps! Thank you.
        </p>
        <div className="w-4/5 flex flex-wrap mt-3">
          <p className="text-white text-left py-1 text-[0.7rem] mx-3 rounded-full border border-[#21A251] bg-[#21A251] m-1 p-3">
            Plastic Bottles
          </p>
          <p className="text-white text-left py-1 text-[0.7rem] mx-3 rounded-full border border-[#21A251] bg-[#21A251] m-1 p-3">
            Plastic
          </p>
          <p className="text-white text-left py-1 text-[0.7rem] mx-3 rounded-full border border-[#21A251] bg-[#21A251] m-1 p-3">
            Glass
          </p>
          <p className="text-white text-left py-1 text-[0.7rem] mx-3 rounded-full border border-[#21A251] bg-[#21A251] m-1 p-3">
            Plastic Bottles
          </p>
          <p className="text-white text-left py-1 text-[0.7rem] mx-3 rounded-full border border-[#21A251] bg-[#21A251] m-1 p-3">
            Scrap Metal
          </p>
        </div>
      </article>
    </div>
  );
};

export default ListingCard;
