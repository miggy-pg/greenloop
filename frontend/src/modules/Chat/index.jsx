import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Input from "../../components/Input";

const Chat = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [isSortBy, setIsSortBy] = useState(false);

  const token = localStorage.getItem("user:token")
  const [showModal, setShowModal] = useState(false);


  console.log("isFilter: ", isFilter);
  console.log("isSortBy: ", isSortBy);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      console.log("activeUsers :>> ", users);
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
      const res = await fetch(
        `http://localhost:8000/api/conversations/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
			const res = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const resData = await res.json()
			setUsers(resData)
		}
		fetchUsers()
  }, []);
  console.log("usersChat: ", users);
  console.log("usersLenfth: ", user.length);

  const fetchMessages = async (conversationId, receiver) => {
    const res = await fetch(
      `http://localhost:8000/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    setMessages({ messages: resData, receiver, conversationId });
  };

  const sendMessage = async (e) => {
    setMessage("");
    socket?.emit("sendMessage", {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    });
    const res = await fetch(`http://localhost:8000/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
  };

  console.log("messages: ", messages);
  return (
    <div className="w-full h-screen pt-[4rem] overflow-x-hidden  bg-[#F8F8F8]" id="profile">
      <div className="max-w-screen-lg flex flex-col text-center justify-center">
        <div className="justify-center items-center border px-6 w-screen xl:px-0">
          <div className="flex border py-5 border-grey rounded shadow-lg">
            <div className="w-1/4 border flex flex-col">
                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                    <div>
                        <img className="w-10 h-10 rounded-full" src="http://andressantibanez.com/res/avatar.png"/>
                    </div>

                    <div className="flex">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                        </div>
                        <div className="ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
                        </div>
                        <div className="ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="py-2 px-2 bg-grey-lightest">
                    <input type="text" className="w-full px-2 py-2 text-sm" placeholder="Search or start new chat"/>
                </div>

                <div className="bg-grey-lighter flex-1 overflow-auto">
                <div>
                {users.length > 0 ? (
                    users.map(({ userId, user }) => {
                      return (
                        <div key={userId} className="flex items-center py-8 border-b border-b-gray-300">
                          <div
                            className="cursor-pointer flex items-center"
                            onClick={() => fetchMessages("new", user)}
                          >
                            <div>
                              <img
                                src=""
                                className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                              />
                            </div>
                            <div className="ml-6">
                              <h3 className="text-lg font-semibold">
                                {user?.fullName}
                              </h3>
                              <p className="text-sm font-light text-gray-600">
                                {user?.email}
                              </p>
                            </div>
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


            <div className="w-full border flex flex-col">
                <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <div>
                            <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"/>
                        </div>
                        <div className="ml-4">
                            <p className="text-grey-darkest">
                                New Movie! Expendables 4
                            </p>
                            <p className="text-grey-darker text-xs mt-1">
                                Andrés, Tom, Harrison, Arnold, Sylvester
                            </p>
                        </div>
                    </div>

                    <div className="flex">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg>
                        </div>
                        <div className="ml-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg>
                        </div>
                        <div className="ml-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
                    <div className="py-2 px-3">

                        <div className="flex justify-center mb-2">
                            <div className="rounded py-2 px-4">
                                <p className="text-sm uppercase">
                                    February 20, 2018
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center mb-4">
                            <div className="rounded py-2 px-4">
                                <p className="text-xs">
                                    Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
                                </p>
                            </div>
                        </div>

                        <div className="flex mb-2">
                        {conversations.length > 0 ? (
                            conversations.map(({ conversationId, user }) => {
                              return (
                                <div key={conversationId} className="flex items-center py-8 border-b border-b-gray-300">
                                  <div
                                    className="cursor-pointer flex items-center"
                                    onClick={() => fetchMessages(conversationId, user)}
                                  >
                                    <div>
                                      <img
                                        src=""
                                        className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                                      />
                                    </div>
                                    <div className="ml-6">
                                      <h3 className="text-lg font-semibold">
                                        {user?.fullName}
                                      </h3>
                                      <p className="text-sm font-light text-gray-600">
                                        {user?.email}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center text-lg font-semibold mt-24">
                              No Conversations
                            </div>
                          )}
                        {messages?.receiver?.fullName && (
                            <div className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2">
                              <div className="cursor-pointer">
                                <img src="" width={60} height={60} className="rounded-full" />
                              </div>
                              <div className="ml-6 mr-auto">
                                <h3 className="text-lg">{messages?.receiver?.fullName}</h3>
                                <p className="text-sm font-light text-gray-600">
                                  {messages?.receiver?.email}
                                </p>
                              </div>
                              <div className="cursor-pointer">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="icon icon-tabler icon-tabler-phone-outgoing"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="black"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                                  <line x1="15" y1="9" x2="20" y2="4" />
                                  <polyline points="16 4 20 4 20 8" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                    </div>
                </div>

                {messages?.receiver?.companyName && (
                  <div className="p-14 w-full flex items-center">
                    <Input
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-send"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                        <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                      </svg>
                    </div>
                    <div
                      className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                        !message && "pointer-events-none"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-circle-plus"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                      </svg>
                    </div>
                  </div>
                )}
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Chat;
