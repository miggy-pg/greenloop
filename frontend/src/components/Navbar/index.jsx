import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { FaSearch } from "react-icons/fa";
import {
  IoHomeOutline,
  IoListOutline,
  IoAddCircleOutline,
  IoChatboxEllipsesOutline,
  IoNotificationsOutline,
  IoSettings,
} from "react-icons/io5";

import greenLoopLogo from "../../assets/images/greenLoop.png";
import Notification from "../Notification";

import { getConversations, getMessages } from "../../api/conversation";
// import useOutsideClick from "../../hooks/useOutsideClick";

{
}

const Menus = [
  { name: "Home", icon: <IoHomeOutline />, route: "" },
  { name: "Profile", icon: <IoListOutline />, route: "listing" },
  { name: "Message", icon: <IoAddCircleOutline />, route: "post" },
  {
    name: "Photos",
    icon: <IoChatboxEllipsesOutline />,
    route: "chats",
  },
  {
    name: "Notifications",
    icon: <IoNotificationsOutline />,
    route: "notifications",
  },
  {
    name: "Settings",
    icon: <IoSettings />,
    route: "profile",
  },
];

const Header = () => {
  const [scrollActive, setScrollActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isHoveredSettings, setHoveredSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user:detail"));
  const [active, setActive] = useState(0);

  const countMessages = useRef(0);
  const { width } = useWindowSize();

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

    if (width > 768) {
      setShowNotification(false);
    }
  }, [width]);

  console.log("scrollActive: ", showNotification);

  return (
    <>
      <header
        className={
          "fixed lg:top-0 w-screen z-50 bg-blue-500 transition-all" +
          (scrollActive ? " shadow-md pt-0" : " pt-2")
        }
      >
        <nav className="fixed grid z-30 px-6 md:border-b sm:border-0 w-screen sm:justify-center border-gray-200">
          <div className="col-start-1 col-end-4 flex items-center pt-2">
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

          <div className="bg-[#31572C] max-h-[4.7rem] text-xl w-screen px-6 flex fixed md:py-1 md:text-2xl md:text-center md:justify-end md:h-[4rem] sm:h-[5rem] sm:items-center sm:justify-center sm:bottom-0">
            <ul className="flex relative">
              {Menus.map((menu, i) => (
                <NavLink
                  key={i}
                  to={menu.route}
                  className="md:px-[1.3rem] sm:px-[2rem] xsm:px-[1.5rem] text-[#8fb58b]"
                >
                  <span className="flex flex-col text-center items-center justify-center h-[4.7rem] sm:h-[5rem] sm:text-3xl lg:h-[3rem] w-full sm:w-auto">
                    {menu.icon}
                  </span>
                </NavLink>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
