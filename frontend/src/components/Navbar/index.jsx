import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  IoHome,
  IoHomeOutline,
  IoListOutline,
  IoAddCircle,
  IoAddCircleOutline,
  IoChatboxEllipses,
  IoChatboxEllipsesOutline,
  IoNotificationsSharp,
  IoNotificationsOutline,
  IoSettings,
} from "react-icons/io5";

import greenLoopLogo from "../../assets/images/greenLoop.png";
import Notification from "../Notification";

import { getConversations, getMessages } from "../../api/conversation";
// import useOutsideClick from "../../hooks/useOutsideClick";

const Header = () => {
  const [activeLink, setActiveLink] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredPost, setIsHoveredPost] = useState(false);
  const [isHoveredChat, setIsHoveredChat] = useState(false);
  const [isHoveredNotif, setIsHoveredNotif] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isHoveredSettings, setHoveredSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user:detail"));

  const countMessages = useRef(0);

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
    try {
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
        setIsLoading(false);
      };
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      const getConversation = async () => {
        const allMessages = [];
        !isLoading &&
          conversations.map(async (convo) => {
            const { data } = await getMessages(
              convo.conversationId,
              user?.id,
              convo.receiverId
            );
            data.map((message) => {
              if (!message.hasRead) {
                allMessages.push(message);
                countMessages.current = countMessages.current + 1;
              }
            });
          });
        setMessages(allMessages);
        // } else {
        //   setMessages({});
        // }
        setIsLoading(false);
      };
      getConversation();
    } catch (err) {
      console.log(err);
    }
  }, [conversations]);

  console.log("messagesNavbar: ", messages);
  console.log("notificationNavbar: ", conversations);
  console.log("countMessages: ", countMessages);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 10);
    });
  }, []);

  console.log("scrollActive: ", showNotification);

  return (
    <>
      <header
        className={
          "fixed top-0 w-screen z-50 bg-white-500 transition-all" +
          (scrollActive ? " shadow-md pt-0" : " pt-2")
        }
      >
        <nav className="fixed grid z-30 w-full px-6 bg-white border-b border-gray-200">
          <div className="col-start-1 col-end-2 flex items-center">
            <img
              src={greenLoopLogo}
              className="h-[3.5rem] w-auto"
              alt="green-loop logo"
            />
            <div className="relative ml-5">
              <input
                type="text"
                id="header-searchbox"
                name="searchbox"
                placeholder="Search here ..."
                className="w-[20rem] sm:max-w-xs bg-[#FEFEFE] border border-[#CACACA] focus:bg-white focus:border-grey-300 focus:outline-none h-10 p-4 pl-8 placeholder-grey-500 rounded-full text-sm"
              />
              <FaSearch className="absolute align-center left-3 top-3.5 h-3 w-3 text-gray-300 pointer-events-none" />
            </div>
          </div>

          <div className="col-start-10 h-[5rem] col-end-12 font-medium flex justify-end items-center">
            <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500 px-4 items-center">
              <NavLink
                activeClass="active"
                to="/"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => setActiveLink("home")}
                onMouseEnter={() => setIsHoveredHome(true)}
                onMouseLeave={() => setIsHoveredHome(false)}
                className={
                  "m-0 p-2 cursor-pointer animation-hover h-[5rem] px-3.5 relative items-center justify-center flex" +
                  (activeLink === "home"
                    ? " bg-[#5c7e59] animation-active  "
                    : " text-black-500 hover:bg-[#5c7e59] hover:text-white text-sm a")
                }
              >
                <span className="text-center font-light relative">
                  {isHoveredHome ? (
                    <IoHomeOutline className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  ) : (
                    <IoHome className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  )}
                  <span className="hover:font-white  transition-opacity duration-300">
                    Home
                  </span>
                </span>
              </NavLink>
              <NavLink
                activeClass="active"
                to="listing"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("listing");
                }}
                className={
                  "m-0 p-2 cursor-pointer animation-hover h-[5rem] px-3 relative items-center justify-center flex" +
                  (activeLink === "listing"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:bg-[#5c7e59] hover:text-white text-sm a")
                }
              >
                <span className="text-center font-light relative">
                  <IoListOutline className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  <span className="hover:font-white  transition-opacity duration-300">
                    Listing
                  </span>
                </span>
              </NavLink>
              <NavLink
                activeClass="active"
                to="post"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("post");
                }}
                onMouseEnter={() => setIsHoveredPost(true)}
                onMouseLeave={() => setIsHoveredPost(false)}
                className={
                  "m-0 p-2 cursor-pointer animation-hover h-[5rem] px-3.5 relative items-center justify-center flex" +
                  (activeLink === "post"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:bg-[#5c7e59] hover:text-white text-sm a")
                }
              >
                <span className="text-center font-light relative">
                  {isHoveredPost ? (
                    <IoAddCircleOutline className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  ) : (
                    <IoAddCircle className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  )}
                  <span className="hover:font-white  transition-opacity duration-300">
                    Post
                  </span>
                </span>
              </NavLink>
              <NavLink
                activeClass="active"
                to="chats"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("chats");
                }}
                onMouseEnter={() => setIsHoveredChat(true)}
                onMouseLeave={() => setIsHoveredChat(false)}
                className={
                  "m-0 p-2 cursor-pointer animation-hover h-[5rem] px-3.5 relative items-center justify-center flex" +
                  (activeLink === "chats"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:bg-[#5c7e59] hover:text-white text-sm a")
                }
              >
                <span className="text-center font-light relative">
                  {isHoveredChat ? (
                    <IoChatboxEllipsesOutline className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  ) : (
                    <IoChatboxEllipses className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  )}
                  <span className="hover:font-white  transition-opacity duration-300">
                    Chats
                  </span>
                </span>
              </NavLink>
              <div
                onMouseEnter={() => setIsHoveredNotif(true)}
                onMouseLeave={() => setIsHoveredNotif(false)}
                onClick={() => setShowNotification((show) => !show)}
                className={
                  "m-0 p-2 cursor-pointer animation-hover h-[5rem] text-decor px-3 relative items-center justify-center flex" +
                  (activeLink === "notifications"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:bg-[#5c7e59] hover:text-white text-sm a")
                }
              >
                <span className="text-center font-light relative">
                  {isHoveredNotif ? (
                    <IoNotificationsOutline className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  ) : (
                    <IoNotificationsSharp className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  )}
                  <span className="absolute top-0 right-2 bg-red-500 text-white w-5 h-5 text-center justify-between rounded-full font-medium text-xs">
                    {!isLoading && countMessages.current}
                  </span>
                  <span className="hover:font-white  transition-opacity duration-300">
                    Notifications
                  </span>
                </span>
              </div>
              {showNotification && (
                <Notification
                  scrollActive={scrollActive}
                  messages={messages}
                  conversations={conversations}
                  setShowNotification={setShowNotification}
                />
              )}

              <div
                className={
                  "m-0 p-2 cursor-pointer animation-hover h-[5rem] px-3.5 relative items-center justify-center flex" +
                  (activeLink === "chats"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:bg-[#5c7e59] hover:text-white text-sm a")
                }
                onClick={() => setHoveredSettings((hover) => !hover)}
              >
                <span className="text-center font-light relative">
                  <IoSettings className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  <span className="hover:font-white  transition-opacity duration-300">
                    Settings
                  </span>
                </span>
              </div>

              {isHoveredSettings && (
                <div
                  className="z-50 fixed top-[4.5rem] right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                  id="dropdown-2"
                >
                  <Link to="profile">
                    <div className="px-4 py-3 cursor-pointer hover:bg-gray-100">
                      <p className="text-sm text-normal" role="none">
                        My Account
                      </p>
                    </div>
                  </Link>
                  <ul className="py-1" role="none">
                    <li>
                      <Link to="dashboard/users">
                        <span
                          className="block px-4 py-4 text-sm cursor-pointer hover:bg-gray-100"
                          role="menuitem"
                        >
                          Users
                        </span>
                      </Link>
                    </li>
                    <li>
                      <span
                        className="block px-4 py-4 text-sm cursor-pointer hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
