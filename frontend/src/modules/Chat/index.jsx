import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Input from "../../components/Input";
import { getConversations, getMessages } from "../../api/conversation";
import { sendUserMessage } from "../../api/message";
import { useSearchParams } from "react-router-dom";

import { TbSend } from "react-icons/tb";
import { TbCirclePlus } from "react-icons/tb";

const Chat = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [file, setFile] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  // const [messageImage, setMessageImage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user:detail"));
  const receiverId = searchParams.get("id");

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
  }, [messages?.messages]);

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
      if (receiverId) {
        const conversationId = conversations[0].conversationId;
        const receiverId = conversations[0].receiverId;
        const { data } = await getMessages(
          conversationId,
          user?.id,
          receiverId
        );
        setMessages({ messages: data, receiverId, conversationId });
      } else {
        setMessages({});
      }
    };
    getConversation();
  }, [conversations, receiverId]);
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
    searchParams.set("id", receiver.receiverId);
    setSearchParams(searchParams);

    const { data } = await getMessages(
      conversationId,
      user?.id,
      receiver?.receiverId
    );
    console.log("dataFetch: ", data);
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
      image: file,
      receiverId: messages?.receiver?.receiverId,
    };
    const { data } = await sendUserMessage(messageForm);
    setFile([]);
  };

  console.log("user: ", user);

  return (
    <div
      className="w-full h-[100dvh]   overflow-hidden bg-[#F8F8F8]"
      id="profile"
    >
      <div className="flex border h-[100dvh] pt-20 border-grey rounded overflow-hidden shadow-lg">
        <div className="w-1/4 border flex flex-col ">
          <div className="py-2 px-2 bg-grey-lightest">
            <span className="text-5xl text-gray-700 float-left px-5 py-5 font-semibold">
              Chats
            </span>
          </div>

          <div className="bg-grey-lighter flex-1">
            <div>
              {conversations.length > 0 ? (
                conversations.map(({ conversationId, user }) => {
                  return (
                    <div
                      key={conversationId}
                      className="flex items-center py-3 px-7 hover:bg-gray-100 cursor-pointer"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <img
                        src=""
                        className="w-[3rem] h-[3rem] rounded-full p-[2px] border border-primary"
                      />
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">
                          {user?.companyName}
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

          <div className="h-[100dvh] w-full overflow-x-hidden shadow-sm">
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
            <div className="p-14">
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
                                  {/* {message.msg} */}
                                  {
                                    "Ipsum irure nulla sit dolore exercitation nostrud irure commodo."
                                  }
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
      </div>
    </div>
  );
};

export default Chat;
