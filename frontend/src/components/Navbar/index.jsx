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
  { name: "Listing", icon: <IoListOutline />, route: "listing" },
  { name: "Post", icon: <IoAddCircleOutline />, route: "post" },
  {
    name: "Chats",
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
  const [hideModals, setHideModals] = useState(false);
  const [hideMenuLabels, setHideMenuLabels] = useState(false);
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

    width > 767 ? setHideModals(true) : setHideModals(false);
    width > 900 ? setHideMenuLabels(true) : setHideMenuLabels(false);
  }, [width]);

  return (
    <>
      <header
        className={`fixed lg:top-0 w-screen z-50 transition-all ${
          !hideModals && "bg-[#F8F8F8] "
        } ${scrollActive && " shadow-md pt-0"} 
        }`}
      >
        <nav
          className={`fixed grid z-30 px-6 h-[5rem] text-center top-0 border-gray-200 w-screen bg-[#F8F8F8] md:justify-center md:border-0 ${
            scrollActive && " shadow-md pt-0"
          } `}
        >
          {!hideModals && (
            <div
              className={`col-start-1 col-end-4 flex items-center ${
                hideModals && " fixed z-100"
              }`}
            >
              <img
                src={greenLoopLogo}
                className="h-[3.5rem] w-auto 2xsm:w-[3rem] 2xsm:h-[3rem]"
                alt="green-loop logo"
              />
              <div className="relative ml-5">
                <input
                  type="text"
                  id="header-searchbox"
                  name="searchbox"
                  placeholder="Search here ..."
                  className="w-[20rem] bg-[#FEFEFE] border border-[#CACACA] focus:bg-white focus:border-gray-300 focus:outline-none h-10 p-4 pl-8 placeholder-gray-500 rounded-full text-sm sm:max-w-xs xsm:w-[13rem] 2xsm:w-[12rem] 2xsm:h-4"
                />
                <FaSearch className="absolute align-center left-3 top-3.5 h-3 w-3 text-gray-300 pointer-events-none 2xsm:top-2.5" />
              </div>
            </div>
          )}

          <div className="bg-white max-h-[5rem] items-center h-[5rem] text-xl w-fill px-2 flex fixed md:border-t-[1px] md:shadow-md md:py-1 md:text-2xl md:text-center md:justify-center md:h-[4rem] md:bottom-0 sm:h-[3rem] sm:items-center xsm:px-0 2xsm:px-0">
            {hideModals && (
              <div
                className={`flex items-center md:pt-2 h-[5rem] ${
                  hideModals ? " fixed z-100" : ""
                }`}
              >
                <img
                  src={greenLoopLogo}
                  className="h-[3.5rem] w-auto items-center lg:h-12"
                  alt="green-loop logo"
                />
                <div className="relative items-center lg:pt-1 ml-5 lg:h-12">
                  <input
                    type="text"
                    id="header-searchbox"
                    name="searchbox"
                    placeholder="Search here ..."
                    className="w-[20rem] h-10 p-4 pl-8 placeholder-gray-500 rounded-full text-sm bg-[#FEFEFE] border border-[#CACACA] focus:bg-white focus:border-gray-300 focus:outline-none md:max-w-xs lg:w-[15rem] lg:h-6"
                  />
                  <FaSearch className="absolute align-center left-3 top-3.5 h-3 w-3 text-gray-300 pointer-events-none lg:top-4" />
                </div>
              </div>
            )}

            <ul className="flex relative justify-end w-screen h-[5rem] items-center md:justify-center md:text-2xl md:h-[4rem] sm:h-[3rem]">
              {Menus.map((menu, i) => {
                if (
                  (hideModals && menu.name.includes("Notifications")) ||
                  (hideModals && menu.name.includes("Settings"))
                ) {
                  return (
                    <div
                      key={i}
                      onClick={() => console.log("Button clicking")}
                      className="px-6 text-[#31572C] h-[5rem] cursor-pointer lg:px-6 md:h-[4rem] md:px-[1.7rem] sm:h-[3rem] xsm:px-[1.5rem] 2xsm:px-[1rem] hover:text-white hover:bg-[#5e8759] duration-200"
                    >
                      <span className="flex flex-col text-center items-center justify-center w-full  h-[5rem] sm:text-3xl">
                        {menu.icon}
                        {hideMenuLabels && (
                          <span
                            className={`text-sm lg:text-[0.7rem] translate-y-1 duration-200`}
                          >
                            {menu.name}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <NavLink
                      key={i}
                      to={menu.route}
                      className="px-6 text-[#31572C] h-[5rem] cursor-pointer lg:px-6 md:h-[4rem] md:px-[1.7rem] sm:h-[3rem] xsm:px-[1.5rem] 2xsm:px-[1rem] hover:text-white hover:bg-[#5e8759] duration-200"
                    >
                      <span className="flex flex-col text-center items-center justify-center w-full h-[5rem] md:h-[4rem] sm:h-[3rem] sm:text-xl">
                        {menu.icon}

                        {hideMenuLabels && (
                          <span
                            className={`text-sm lg:text-[0.7rem] translate-y-1 duration-200`}
                          >
                            {menu.name}
                          </span>
                        )}
                      </span>
                    </NavLink>
                  );
                }
              })}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
