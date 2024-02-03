import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { updateHasReadMessage } from "../../api/message";

const MobileNotification = () => {
  const messages = useSelector((state) => state.user.messages);
  const user = JSON.parse(localStorage.getItem("user:detail"));

  const updateMessage = async (messageId) => {
    try {
      await updateHasReadMessage(messageId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-white" id="profile">
      <div className="flex pt-[5rem] border-grey rounded">
        <div className="h-full w-full">
          <div className="relative mx-auto rounded-lg">
            <h3 className="text-md font-semibold uppercase text-gray-400 mb-4 pl-2">
              Notifications
            </h3>
            <div className="divide-y divide-gray-200">
              {messages.filter((message) => !message.hasRead).length > 0 ? (
                messages.map((message) => {
                  return (
                    user?.id !== message.user?.id &&
                    !message.hasRead && (
                      <Link
                        to={`/chats?id=${message.conversationId}`}
                        key={message.conversationId}
                        className="w-full flex justify-start bg-gray-100 text-left sm:px-5 sm:py-3 sm:my-2 overflow-x-hidden"
                        onClick={() => updateMessage(message.message.id)}
                      >
                        <img
                          className="rounded-full flex-shrink-0 mr-5 border border-primary"
                          src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                          width="48"
                          height="48"
                          alt={user?.companyName}
                        />
                        {/* <div className="text-clamp-base">
                          <h4 className="text-md font-semibold text-gray-900 ">
                            {user?.companyName}
                          </h4>
                          <span>{message.message.msg}</span>
                        </div> */}
                        <div className="text-gray-500 font-normal text-clamp-xs mb-1.5 ">
                          New message from {""}
                          <span className="font-semibold text-gray-900">
                            {message.user.companyName}
                          </span>
                          : <br />
                          <p className="text-clamp-base font-semibold text-gray-700">
                            {message.message.msg}
                          </p>
                          <blockquote className="text-clamp-xs text-gray-500 font-light">
                            {message.message.msgImage.url &&
                              "Attached an image"}
                          </blockquote>
                        </div>
                      </Link>
                    )
                  );
                })
              ) : (
                <div className="text-center text-lg font-semibold mt-24">
                  No Notifications
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNotification;
