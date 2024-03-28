import { Link } from "react-router-dom";

import { transformText } from "../../../utils/plasticColors";

const PostCard = ({ props, defaultImage, wasteDefaultImage }) => {
  const { post, image, wasteCategory, user } = props;
  const transformedTexts = transformText(wasteCategory);

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2">
        <article className="p-6 text-gray-800">
          <span className="flex items-left mb-5 text-sm font-semibold">
            <Link to={`profile/${user?._id}`}>
              <img
                className="w-11 h-11 mr-5 rounded-full cursor-pointer hover:opacity-80 xsm:w-9 xsm:h-9 xsm:mr-3"
                src={user?.image ? image?.url : defaultImage}
                alt={user?.companyName}
              />
            </Link>
            <Link
              className="hover:underline cursor-pointer xsm:text-xxs my-auto"
              to={`profile/${user?._id}`}
            >
              {user?.companyName ? user.companyName : "User"}
            </Link>
          </span>
          <p className="text-left xsm:text-xxs">{post}</p>
          <div className="flex flex-wrap mt-3">
            <p
              className={`text-left py-1 text-xxs rounded-full border ${transformedTexts} p-3 xsm:text-xxs`}
            >
              {wasteCategory}
            </p>
          </div>
        </article>
        <div className="h-72 w-full flex items-center sm:h-60 xsm:h-40 2xsm:h-32">
          <img
            src={image?.url ? image.url : wasteDefaultImage}
            className="object-cover w-full h-72 rounded-b-3xl sm:h-60 xsm:h-40 2xsm:h-32"
          />
        </div>
      </div>
    </>
  );
};

export default PostCard;
