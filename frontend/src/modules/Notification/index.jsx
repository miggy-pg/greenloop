import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import useOutsideClick from "../../hooks/useOutsideClick";

const Notification = ({ isLoading }) => {
  const messages = useSelector((state) => state.user.messages);
  const conversations = useSelector((state) => state.user.conversations);
  const ref = useRef();

  const user = JSON.parse(localStorage.getItem("user:detail"));

  // const userConversation = conversations.map((conversation) => {
  //   console.log("checking Conversation: ", conversation);
  //   return conversation.conversationId.includes(messages.conversationId);
  // });

  console.log("userConversation: ", conversations);
  console.log("userMessages: ", messages);
  console.log("refNotif: ", ref);
  console.log("refNotifisLoading: ", isLoading);

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
        {conversations.length > 0 &&
          !isLoading &&
          messages.map((message) => {
            return (
              user.id !== message.user.id && (
                <Link
                  to={`chats?id=${message.conversationId}`}
                  className="flex px-4 py-3 border-b hover:bg-gray-100"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src={message.user.image}
                      alt="Jese image"
                    />
                    <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 border border-white rounded-full bg-primary-700 ">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full pl-3 text-left">
                    <div className="text-gray-500 font-normal text-clamp-xs mb-1.5 ">
                      New message from
                      <span className="font-semibold text-gray-900">
                        {message.user.companyName}
                      </span>
                      : {message.message.msg}
                      <blockquote className="text-clamp-xs text-gray-500 font-light">
                        {message.message.msgImage.url && "Attached an image"}
                      </blockquote>
                    </div>
                  </div>
                </Link>
              )
            );
          })}
        {!messages.length && (
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
