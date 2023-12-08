import img1 from "../../assets/img1.jpg";
import pic8 from "../../assets/images/Pic-8.png";

const plasticColors = {
  Plastic: "#E27A00",
  "Plastic Bottles": "#21A251",
  "Scrap Metal": "#6B2F0E",
  Glass: "#EA4D2A",
  Textile: "#C3C639",
  "E-waste": "#4B443E",
  "Food waste": "#B939D9",
  "Biodegradable Waste": "#D7B981",
};

const PostCard = ({ post }) => {
  return (
    <>
      <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2">
        <article className="p-6">
          <footer className="flex items-left">
            <div className="flex items-left mb-5">
              <p className="inline-flex items-center mr-3 text-sm font-semibold text-white">
                <img
                  className="w-11 h-11 mr-5 rounded-full"
                  src={img1}
                  alt="Jese avatar"
                />
                Jese Leos
              </p>
            </div>
          </footer>
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
        <div className="h-[18rem] flex items-center justify-between lg:justify-evenly">
          <div className="w-screen border rounded-b-3xl">
            <img
              src={pic8}
              className="object-cover w-full h-[18rem] rounded-b-3xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
