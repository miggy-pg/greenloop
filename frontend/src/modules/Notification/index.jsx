import { useRef } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import useOutsideClick from "../../hooks/useOutsideClick";
import defaulImage from "../../assets/default-image.jpg";
import { updateHasReadMessage } from "../../api/message";
import { useSocket } from "../../hooks/useSocket";

const Notification = ({ unreadMessages }) => {
  // const messages = useSelector((state) => state.user.messages);
  // const conversations = useSelector((state) => state.user.conversations);
  const ref = useRef();
  const socket = useSocket();
  // console.log("userConversation: ", conversations);
  console.log("userMessages: ", unreadMessages);
  console.log("refNotif: ", ref);

  const updateMessage = async (conversationId, messageId) => {
    try {
      console.log("cupdateMessageonversationId: ", conversationId);
      console.log("cupdatemessageId: ", messageId);
      socket?.emit("updateMessage", conversationId, messageId);
      // await updateHasReadMessage(messageId);
    } catch (error) {
      console.log(error);
    }
  };

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
        {/* {unreadMessages.map((message) => {
          console.log("Notificationmessage: ", message);
          return (
            <Link
              to={`chats?id=${message.conversationId}`}
              key={message.conversationId}
              className="flex px-4 py-3 border-b hover:bg-gray-100"
              onClick={() =>
                updateMessage(message.conversationId, message.message.id)
              }
            >
              <div className="flex-shrink-0">
                <img
                  className="rounded-full w-11 h-11"
                  src={
                    message?.user?.image > 0
                      ? message?.user?.image
                      : defaulImage
                  }
                  alt={message.user.companyName}
                />
              </div>
              <div className="w-full pl-3 text-left">
                <div className="text-gray-500 font-normal text-clamp-xs mb-1.5 ">
                  New message from {""}
                  <span className="font-semibold text-gray-900">
                    {message.user?.companyName}
                  </span>
                  : {message.message?.msg}
                  <blockquote className="text-clamp-xs text-gray-500 font-light">
                    {message.message?.msgImage.url && "Attached an image"}
                  </blockquote>
                </div>
              </div>
            </Link>
          );
        })} */}
        {/* {!unreadMessages.length && (
          <div className="flex px-4 py-3">
            <div className="w-full pl-3">
              <div className="text-gray-500 font-normal text-sm mb-1.5 text-center">
                No new notifications
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Notification;
