import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Input from "../../components/Input";
import { getConversations, getMessages } from "../../api/conversation";
import { sendUserMessage } from "../../api/message";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";

import { TbSend } from "react-icons/tb";
import { TbCirclePlus } from "react-icons/tb";
import { TbArrowLeft } from "react-icons/tb";

import { useWindowSize } from "@uidotdev/usehooks";

const Chat = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [file, setFile] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [openConvo, setOpenConvo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTable] = useState(false);

  const messageRef = useRef(null);
  const { width } = useWindowSize();

  const user = JSON.parse(localStorage.getItem("user:detail"));
  const conversationId = searchParams.get("id");

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);
  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log("activeUsers: ", users);
    });
    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
    width < 512 ? setIsMobile(true) : setIsMobile(false);
    width > 512 && width < 768 ? setIsTable(true) : setIsTable(false);
  }, [messages?.messages, width]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversations = async () => {
      const { data } = await getConversations(loggedInUser?.id);
      setConversations(data);
      console.log("conversationData: ", data);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      console.log("resData: ", resData);
      setUsers(resData);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const getConversation = async () => {
      if (conversationId) {
        const receiver = conversations.find(
          (convo) => convo.conversationId === conversationId
        );
        const { data } = await getMessages(
          conversationId,
          user?.id,
          receiver?.receiverId
        );
        setMessages({
          messages: data,
          receiver: receiver.user,
          conversationId,
        });
      } else {
        setMessages({});
      }
    };
    getConversation();
  }, [conversationId, conversations]);
  console.log("usersChat: ", users);

  const fetchImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  console.log("file: ", file);

  const fetchMessages = async (conversationId, receiver) => {
    searchParams.set("id", conversationId);
    setSearchParams(searchParams);
    console.log("HereAtConversationAgain: ", conversationId);

    const { data } = await getMessages(
      conversationId,
      user?.id,
      receiver?.receiverId
    );
    console.log("dataFetch: ", data);
    console.log("dataFetchReceiver: ", receiver);
    setOpenConvo(true);
    setMessages({ messages: data, receiver, conversationId });
  };

  const sendMessage = async (e) => {
    setMessage("");
    socket?.emit("sendMessage", {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      image: file,
      conversationId: messages?.conversationId,
    });
    const messageForm = {
      conversationId: messages?.conversationId,
      senderId: user?.id,
      message,
      receiverId: messages?.receiver?.receiverId,
    };
    file.length > 0 && (messageForm.image = file);

    const { data } = await sendUserMessage(messageForm);
    setFile([]);
  };

  const handleMoveBack = () => {
    console.log("HereAtConversationAgain: ", conversationId);
  };

  console.log("user: ", user);
  console.log("conversationChecking: ", conversations);
  console.log("conversationmessages: ", messages);
  console.log("messagesLengthHere: ", messages?.messages?.length > 0);
  return (
    <div className="w-full h-full bg-[#ffffff]" id="profile">
      <div className="flex pt-[3.8rem] border-grey rounded">
        {isMobile ? (
          <>
            <div className="h-full w-full">
              <div className="relative mx-auto rounded-lg">
                {!openConvo ? (
                  <h3 className="text-md font-semibold uppercase text-gray-400 mb-4 pl-2">
                    Chats
                  </h3>
                ) : (
                  <>
                    <div className="fixed top-13 w-full bg-white flex items-center mb-5 py-3 shadow-md">
                      <TbArrowLeft
                        className="flex text-md font-semibold uppercase text-gray-800 cursor-pointer pl-2 w-9 h-9"
                        onClick={() => setOpenConvo(false)}
                      />
                      <img
                        className="rounded-full items-start flex-shrink-0 ml-4 mr-3 border border-primary"
                        src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                        width="40"
                        height="40"
                        alt="Marie Zulfikar"
                      />
                      <h4 className="text-sm font-semibold text-gray-900">
                        Marie Zulfikar
                      </h4>
                    </div>
                  </>
                )}
                <div className="divide-y divide-gray-200">
                  {conversations.length > 0 && !openConvo
                    ? conversations.map(({ conversationId, user }) => {
                        console.log("conversationIduser: ", user);
                        console.log(
                          "conversatioconversationId: ",
                          conversationId
                        );
                        return (
                          <Link
                            key={conversationId}
                            className="w-full flex justify-center text-left py-8 sm:px-5 sm:py-1 sm:my-2 xsm:justify-start overflow-x-hidden"
                            onClick={() => fetchMessages(conversationId, user)}
                          >
                            <div className="flex items-center">
                              <img
                                className="rounded-full flex-shrink-0 mr-5 border border-primary"
                                src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                                width="48"
                                height="48"
                                alt={user?.companyName}
                              />
                              <div>
                                <h4 className="text-md font-semibold text-gray-900 2xsm:text-[0.7em]">
                                  {user?.companyName}
                                </h4>
                                <div className="text-md 2xsm:text-[0.7em]">
                                  The video chat ended · 2hrs
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    : !openConvo && (
                        <div className="text-center text-lg font-semibold mt-24">
                          No Conversations
                        </div>
                      )}
                </div>
                <div className="h-full overflow-y-auto mb-[6.5rem]">
                  <div className="p-14 sm:p-0 ">
                    {messages?.messages?.length > 0 && openConvo
                      ? messages.messages.map(
                          ({ message, user: { id } = {} }) => {
                            return (
                              <>
                                {/* Receiver Side */}
                                {id === user?.id ? (
                                  <>
                                    <div className="w-full flex justify-end text-left py-8 sm:px-2 sm:py-1 sm:my-2 overflow-x-hidden">
                                      <div className="flex items-center">
                                        <h4 className="text-xs text-blue py-3 px-3 bg-gray-200 rounded-xl">
                                          {message.msg}
                                        </h4>
                                        <img
                                          className="rounded-full flex-shrink-0 sm:ml-2 border border-primary"
                                          src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                                          width="48"
                                          height="48"
                                          alt={user?.companyName}
                                        />
                                      </div>
                                    </div>

                                    {message?.msgImage?.url && (
                                      <div>
                                        <div className="w-full flex justify-end text-left py-8 sm:px-2 xsm:pl-16 sm:py-1 sm:my-2 overflow-x-hidden">
                                          <div className="flex flex-col-2 gap-4 text-right justify-end">
                                            <img
                                              src={message?.msgImage?.url}
                                              className="rounded-lg w-auto h-24 ml-2"
                                            />
                                          </div>
                                          <div>
                                            <img
                                              className="rounded-full flex-shrink-0 sm:ml-2 border border-primary"
                                              src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                                              width="48"
                                              height="48"
                                              alt={user?.companyName}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    <div ref={messageRef}></div>
                                  </>
                                ) : (
                                  <>
                                    {/* Sender Side */}
                                    <div className="w-full flex justify-start text-left py-8 xsm:pr-16 sm:px-2 sm:py-1 sm:my-2 overflow-x-hidden">
                                      <span className="flex items-center">
                                        <img
                                          src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                                          className="rounded-full w-12 h-12 sm:mr-2"
                                        />
                                        <p className="text-xs text-blue py-3 px-3 bg-gray-200 rounded-xl">
                                          {message.msg}
                                        </p>
                                      </span>
                                    </div>

                                    {message?.msgImage?.url && (
                                      <div>
                                        <div className="w-full flex justify-start text-left py-8 xsm:pr-16 sm:py-1 sm:my-2 overflow-x-hidden">
                                          <div className="">
                                            <img
                                              className="rounded-full flex-shrink-0 sm:ml-2"
                                              src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                                              width="48"
                                              height="48"
                                              alt={user?.companyName}
                                            />
                                          </div>
                                          <div className="flex flex-col-2 gap-4 text-right justify-start">
                                            <img
                                              src={message?.msgImage?.url}
                                              className="rounded-lg w-auto h-24 ml-2"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    <div ref={messageRef}></div>
                                  </>
                                )}
                              </>
                            );
                          }
                        )
                      : messages?.messages?.length > 0 &&
                        !openConvo && (
                          <div className="bg-red-500 text-center text-lg font-semibold mt-24">
                            No Messages or No Conversation Selected
                          </div>
                        )}
                  </div>
                </div>
                {messages?.conversationId && (
                  <div className="fixed bottom-12 px-10 py-3 w-full bg-white flex justify-center items-center">
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => fetchImage(e)}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer mr-2"
                    >
                      <TbCirclePlus className="h-6 w-6 mr-2 cursor-pointer" />
                    </label>
                    <Input
                      id="message"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full"
                      inputClassName="p-2 pl-5 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
                    />
                    <div
                      className={`ml-2 p-2 cursor-pointer bg-light rounded-full ${
                        !message && "pointer-events-none"
                      }`}
                      onClick={() => sendMessage()}
                    >
                      <TbSend className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-1/4 border flex flex-col ">
              <div className="py-2 bg-grey-lightest">
                <span className="text-5xl text-gray-700 float-left px-5 py-5 font-semibold sm:text-2xl">
                  Chats
                </span>
              </div>
              {/* <div className="fixed top-13 w-full bg-white flex items-center mb-5 py-3 shadow-md">
                <TbArrowLeft
                  className="flex text-md font-semibold uppercase text-gray-800 cursor-pointer pl-2 w-9 h-9"
                  onClick={() => setOpenConvo(false)}
                />
                <img
                  className="rounded-full items-start flex-shrink-0 ml-4 mr-3 border border-primary"
                  src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                  width="40"
                  height="40"
                  alt="Marie Zulfikar"
                />
                <h4 className="text-sm font-semibold text-gray-900">
                  Marie Zulfikar
                </h4>
              </div> */}
              <div className="bg-grey-lighter flex-1">
                <div>
                  {conversations.length > 0 ? (
                    conversations.map(({ conversationId, user }) => {
                      console.log("conversationIduser: ", user);
                      console.log(
                        "conversatioconversationId: ",
                        conversationId
                      );
                      return (
                        <div
                          key={conversationId}
                          className="flex items-center py-3 px-7 hover:bg-gray-100 cursor-pointer"
                          onClick={() => fetchMessages(conversationId, user)}
                        >
                          <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/022/385/025/small/a-cute-surprised-black-haired-anime-girl-under-the-blooming-sakura-ai-generated-photo.jpg"
                            className="w-[3rem] h-[3rem] rounded-full p-[2px] border border-primary"
                          />
                          <div className="ml-6">
                            <h3 className="text-lg font-semibold">
                              {!isTablet && user?.companyName}
                            </h3>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-lg font-semibold mt-24">
                      No Conversations
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full overflow-hidden border flex flex-col ">
              <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center border-b">
                <div className="flex items-center">
                  <div className="flex mb-2">
                    {messages?.receiver?.companyName && (
                      <>
                        <div className="cursor-pointer">
                          <img
                            src=""
                            width={60}
                            height={60}
                            className="rounded-full"
                          />
                        </div>
                        <div className="ml-6 mr-auto">
                          <h3 className="text-lg">
                            {messages?.receiver?.companyName}
                          </h3>
                        </div>
                        <div className="cursor-pointer"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-full w-full overflow-x-hidden shadow-sm">
                <div className="py-2 px-3">
                  <div className="flex justify-center mb-2">
                    <p className="text-sm uppercase">
                      {new Date().toUTCString().slice(5, 16)}
                    </p>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="rounded py-2 px-4">
                      <p className="text-xs">
                        Messages to this chat and calls are now secured with
                        end-to-end encryption.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-14 sm:p-2 bg-yellow-500">
                  {messages?.messages?.length > 0 ? (
                    messages.messages.map(({ message, user: { id } = {} }) => {
                      return (
                        <>
                          {id === user?.id ? (
                            <>
                              <div
                                className={`max-w-[35%]  rounded-b-xl p-2 mb-2 ${
                                  id === user?.id
                                    ? "bg-primary text-blue rounded-tl-xl ml-auto"
                                    : "bg-secondary rounded-tr-xl"
                                } `}
                              >
                                <div className="flex text-left justify-end">
                                  <span className="bg-gray-200 rounded-3xl px-5">
                                    <p className="text-sm text-blue py-3">
                                      {message.msg}
                                      Test22
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`max-w-[35%]  rounded-b-xl p-2 mb-2 ${
                                  id === user?.id
                                    ? "bg-primary text-blue rounded-tl-xl ml-auto"
                                    : "bg-secondary rounded-tr-xl"
                                } `}
                              >
                                <div className="flex text-right justify-end">
                                  <img
                                    src={message?.msgImage?.url}
                                    className="rounded-lg"
                                  />
                                </div>
                              </div>

                              <div ref={messageRef}></div>
                            </>
                          ) : (
                            <>
                              <div
                                className={`max-w-[35%] rounded-b-xl p-4 mb-6 ${
                                  id === user?.id
                                    ? "bg-primary text-blue rounded-tl-xl ml-auto"
                                    : "bg-secondary rounded-tr-xl"
                                } `}
                              >
                                <div className="flex flex-col-2 gap-4 text-right justify-start">
                                  <span className="bg-green-500 text-sm">
                                    <img
                                      src="https://www.shutterstock.com/image-vector/young-man-anime-style-character-600nw-2313503433.jpg"
                                      className="rounded-full w-12 h-12"
                                    />
                                  </span>
                                  <span className="bg-yellow-500">
                                    <p className="text-sm text-blue py-3">
                                      {message.msg}
                                    </p>
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`max-w-[35%] bg-red-500 rounded-b-xl p-4 mb-6 ${
                                  id === user?.id
                                    ? "bg-primary text-blue rounded-tl-xl ml-auto"
                                    : "bg-secondary rounded-tr-xl"
                                } `}
                              >
                                <div className="flex flex-col-2 gap-4 text-right justify-start">
                                  <span className="bg-green-500 text-sm">
                                    <img
                                      src="https://www.shutterstock.com/image-vector/young-man-anime-style-character-600nw-2313503433.jpg"
                                      className="rounded-full w-12 h-12"
                                    />
                                  </span>
                                  <span className="bg-yellow-500">
                                    <img
                                      src={message?.msgImage?.url}
                                      className="rounded-lg"
                                    />
                                  </span>
                                </div>
                              </div>

                              <div ref={messageRef}></div>
                            </>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <div className="text-center text-lg font-semibold mt-24">
                      No Messages or No Conversation Selected
                    </div>
                  )}
                </div>
              </div>
              {messages?.conversationId && (
                <div className="p-8 w-full flex items-center">
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => fetchImage(e)}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer mr-2">
                    <TbCirclePlus className="h-8 w-8 cursor-pointer" />
                  </label>
                  <Input
                    id="message"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-[75%]"
                    inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
                  />
                  <div
                    className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                      !message && "pointer-events-none"
                    }`}
                    onClick={() => sendMessage()}
                  >
                    <TbSend className="h-8 w-8" />
                  </div>
                  <div className="ml-4 p-2 cursor-pointer bg-light rounded-full"></div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
