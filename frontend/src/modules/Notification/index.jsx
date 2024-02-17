import { useRef } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import useOutsideClick from "../../hooks/useOutsideClick";
import defaulImage from "../../assets/default-image.jpg";
import { updateHasReadMessage } from "../../api/message";
import { useSocket } from "../../hooks/useSocket";

const Notification = ({
  unreadMessages,
  unreadMessagesCount,
  mutate,
  convoLoading,
}) => {
  const userDetails = JSON.parse(localStorage.getItem("user:detail"));
  const ref = useRef();

  // useEffect(() => {
  //   function handleClick(e) {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       setShowNotification(false);
  //     }
  //   }
  //   document.addEventListener("click", handleClick, true);
  //   return () => document.removeEventListener("click", handleClick, true);
  // }, []);

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
        {!convoLoading &&
          unreadMessages.map((user) => {
            return user.conversation.messages.map(
              (message) =>
                message.senderId !== userDetails?.id &&
                !message.hasRead && (
                  <Link
                    to={`chats?id=${message?.conversationId}`}
                    key={message?._id}
                    className="flex px-4 py-3 border-b hover:bg-gray-100"
                    onClick={() => mutate(message?._id)}
                  >
                    {console.log("messageNotif: ", message)}
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full w-11 h-11"
                        src={
                          user?.conversation?.sender?.image > 0
                            ? user?.conversation?.sender?.image
                            : defaulImage
                        }
                        alt={user?.conversation?.sender?.companyName}
                      />
                    </div>
                    <div className="w-full pl-3 text-left">
                      <div className="text-gray-500 font-normal text-clamp-xs mb-1.5 ">
                        New message from {""}
                        <span className="font-semibold text-gray-900">
                          {user?.conversation?.sender.companyName}
                        </span>
                        : {message?.message}
                        <blockquote className="text-clamp-xs text-gray-500 font-light">
                          {message?.msgImage?.url && "Attached an image"}
                        </blockquote>
                      </div>
                    </div>
                  </Link>
                )
            );
          })}
        {!unreadMessagesCount && (
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
