import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  IoPersonCircleOutline,
} from "react-icons/io5";

import greenLoopLogo from "../../assets/images/greenLoop.png";
import Notification from "../Notification";

const Header = () => {
  const [activeLink, setActiveLink] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredPost, setIsHoveredPost] = useState(false);
  const [isHoveredChat, setIsHoveredChat] = useState(false);
  const [isHoveredNotif, setIsHoveredNotif] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 10);
    });
  }, []);

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
                    ? " bg-[#31572C] animation-active  "
                    : " text-black-500 hover:bg-[#31572C] hover:text-white text-sm a")
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
                    : " text-black-500 hover:bg-[#31572C] hover:text-white text-sm a")
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
                    : " text-black-500 hover:bg-[#31572C] hover:text-white text-sm a")
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
                    : " text-black-500 hover:bg-[#31572C] hover:text-white text-sm a")
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
                    : " text-black-500 hover:bg-[#31572C] hover:text-white text-sm a")
                }
              >
                <span className="text-center font-light relative">
                  {isHoveredNotif ? (
                    <IoNotificationsOutline className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  ) : (
                    <IoNotificationsSharp className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  )}
                  <span className="absolute top-0 right-2 bg-red-500 text-white w-5 h-5 text-center justify-between rounded-full font-medium text-xs">
                    5
                  </span>
                  <span className="hover:font-white  transition-opacity duration-300">
                    Notifications
                  </span>
                </span>
              </div>
              {showNotification && <Notification scrollActive={scrollActive} />}

              <NavLink
                activeClass="active"
                to="profile"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("profile");
                }}
                className={
                  "m-0 p-2 cursor-pointer animation-hover h-[5rem] px-3.5 relative items-center justify-center flex" +
                  (activeLink === "chats"
                    ? " text-orange-500 animation-active "
                    : " text-black-500 hover:bg-[#31572C] hover:text-white text-sm a")
                }
              >
                <span className="text-center font-light relative">
                  <IoPersonCircleOutline className="mb-1 mx-auto w-7 h-7 hover:font-white" />
                  <span className="hover:font-white  transition-opacity duration-300">
                    Profile
                  </span>
                </span>
              </NavLink>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
