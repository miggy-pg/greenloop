import { useRef } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/default-image.jpg";

const Notification = ({ newMessages, hasReadMessage }) => {
  const ref = useRef();

  return (
    <div
      id="notification-dropdown"
      className="z-50 max-w-xs my-4 fixed top-[4.5rem] right-20 overflow-y-auto border h-96 w-72 list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg lg:w-56 lg:h-72"
      ref={ref}
    >
      <div className="py-2 justify-center text-clamp-base font-medium text-center text-gray-700 bg-gray-100 ">
        Notifications
      </div>
      <div>
        {newMessages.map((message) => {
          console.log("newMessagesmessage: ", message);
          return (
            <Link
              to={`chats?id=${message?.conversationId}`}
              key={message?._id}
              className="flex px-4 py-3 border-b hover:bg-gray-100"
              onClick={() => hasReadMessage(message?.message?.id)}
            >
              <div className="flex-shrink-0">
                <img
                  className="rounded-full w-11 h-11"
                  src={
                    message?.message?.user?.image?.url.length > 0
                      ? message?.message?.user?.image?.url
                      : defaultImage
                  }
                  alt={message?.user?.companyName}
                />
              </div>
              <div className="w-full pl-3 text-left">
                <div className="text-gray-500 font-normal text-clamp-xs mb-1.5 ">
                  New message from {""}
                  <span className="font-semibold text-gray-900">
                    {message.user.companyName}
                  </span>
                  : {message?.message?.msg}
                  <blockquote className="text-clamp-xs text-gray-500 font-light">
                    {message?.message?.msgImage?.url && "Attached an image"}
                  </blockquote>
                </div>
              </div>
            </Link>
          );
        })}
        {!newMessages.length && (
          <div className="flex px-4 py-3">
            <div className="w-full pl-3">
              <div className="text-gray-500 font-normal text-sm mb-1.5 text-center">
                No new notifications
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
