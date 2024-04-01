import { Link } from "react-router-dom";

import { IoMdTime } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import Dropdown from "../Dropdown";
import formatDateTime from "../../../utils/formatDateTime";
import { transformText } from "../../../utils/plasticColors";

const PostCard = ({ props, defaultImage, wasteDefaultImage }) => {
  const { post, image, wasteCategory, user, createdAt } = props;
  const transformedTexts = transformText(wasteCategory);

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-sm rounded-3xl my-2">
        <article className="p-6 text-gray-800">
          <div className="flex items-left mb-5 text-sm font-semibold">
            <Link to={`profile/${user?._id}`}>
              <img
                className="w-11 h-11 mr-5 rounded-full cursor-pointer hover:opacity-80 xsm:w-9 xsm:h-9 xsm:mr-3"
                src={user?.image ? image?.url : defaultImage}
                alt={user?.companyName}
              />
            </Link>
            <div className="w-full text-left">
              <div className="flex justify-between items-center">
                <Link
                  className="hover:underline cursor-pointer xsm:text-xxs"
                  to={`profile/${user?._id}`}
                >
                  {user?.companyName ? user.companyName : "User"}
                </Link>
                <Dropdown
                  classNames={"py-2 bottom-[-90px] -left-[130px] w-max"}
                  button={
                    <HiOutlineDotsHorizontal className="text-gray-400 cursor-pointer" />
                  }
                >
                  <div className="flex h-max w-40 flex-col justify-start rounded-[20px] bg-cover bg-no-repeat pb-4 shadow-md">
                    <div className="mt-3 ml-4">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-light text-navy-700 ">
                          Update to
                        </p>{" "}
                      </div>
                    </div>

                    <div className="mt-3 ml-4 flex flex-col">
                      <span className="text-xs text-gray-800 hover:dark:text-white">
                        Profile Settings
                      </span>
                    </div>
                  </div>
                </Dropdown>
              </div>
              <span className="flex">
                <IoMdTime className="mr-2 text-gray-400 my-auto xsm:text-xxs" />
                <p className="text-[0.7rem] font-light text-gray-500">
                  {formatDateTime(createdAt)}
                </p>
              </span>
            </div>
          </div>
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
