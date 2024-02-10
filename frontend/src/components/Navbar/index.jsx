import { useState, useEffect } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";

import { useWindowSize } from "@uidotdev/usehooks";
import {
  IoAddCircleOutline,
  IoChatboxEllipsesOutline,
  IoHomeOutline,
  IoListOutline,
  IoNotificationsOutline,
  IoSettings,
  IoSearch,
} from "react-icons/io5";

import Notification from "../../modules/Notification";
import SettingModal from "../SettingModal";
import { user } from "../../constants/userData";

import greenLoopLogo from "../../assets/images/greenLoop.png";
import { useConversation } from "../../hooks/useConversation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHasReadMessage } from "../../api/message";
// import useOutsideClick from "../../hooks/useOutsideClick";

const iconSizes = "h-4.5 w-4.5 lg:h-5 lg:w-5 md:h-5 md:w-5";

const Menus = [
  {
    name: "Home",
    icon: <IoHomeOutline className={iconSizes} />,
    route: "",
  },
  {
    name: "Listing",
    icon: <IoListOutline className={iconSizes} />,
    route: "listing",
  },
  {
    name: "Post",
    icon: <IoAddCircleOutline className={iconSizes} />,
    route: "post",
  },
  {
    name: "Chats",
    icon: <IoChatboxEllipsesOutline className={iconSizes} />,
    route: "chats",
  },
  {
    name: "Notifications",
    icon: <IoNotificationsOutline className={iconSizes} />,
    route: "notifications",
  },
  {
    name: "Settings",
    icon: <IoSettings className={iconSizes} />,
    route: "profile",
  },
];

const Navbar = () => {
  // const hideModals = useSelector((state) => state.ui.hideModals);
  // const messages = useSelector((state) => state.user.messages);
  // const conversationsStoreData = useSelector(
  //   (state) => state.user.conversations
  // );

  const {
    conversations,
    isLoading: convoLoading,
    error,
  } = useConversation(user?.id);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (messageId) => updateHasReadMessage(messageId),
    onSuccess: () => {
      alert("Message has been read");
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  const unreadMessages =
    !convoLoading &&
    conversations?.reduce((acc, conversation) => acc.concat(conversation), []);

  const unreadMessagesCount =
    !convoLoading &&
    unreadMessages.reduce(
      (acc, conversation) =>
        acc +
        conversation.conversation.messages.filter((message) => !message.hasRead)
          .length,
      0
    );

  console.log("unreadMessages", unreadMessages);
  console.log("unreadMessagesCount", unreadMessagesCount);
  const [scrollActive, setScrollActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [hideModals, setHideModals] = useState(false);
  const [hideMenuLabels, setHideMenuLabels] = useState(false);
  const [isHoveredSettings, setHoveredSettings] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const conversationId = searchParams.get("id");

  const { width } = useWindowSize();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 10);
    });

    if (width > 640) {
      // dispatch(setHideModals(true));
      setHideModals(true);
    } else {
      // dispatch(setHideModals(false));
      setHideModals(false);
      setShowNotification(false);
      setHoveredSettings(false);
    }
    width > 900 ? setHideMenuLabels(true) : setHideMenuLabels(false);
  }, [width]);

  // console.log("messagesNavbar: ", messages);
  console.log("checkingconversationId", searchParams);
  console.log("checkingconversationId", conversationId);

  return (
    <>
      <header
        className={`fixed lg:top-0 w-screen z-50 transition-all ${
          !hideModals && "bg-[#F8F8F8] "
        } ${scrollActive && " shadow-md pt-0"} 
        }`}
      >
        <nav
          className={`fixed grid z-30 px-6 h-[5rem] text-center top-0 border-gray-200 w-screen bg-[#F8F8F8] md:justify-between sm:justify-center md:border-0 md:h-[4rem] ${
            scrollActive && `${!conversationId && "shadow-md"} pt-0`
          } `}
        >
          {!hideModals && (
            <div
              className={`col-start-1 col-end-4 flex items-center ${
                hideModals && " fixed z-100"
              }`}
            >
              <Link to="/" className="cursor-pointer">
                <img
                  src={greenLoopLogo}
                  className="h-[3.5rem] w-auto sm:w-[2.6rem] sm:h-[2.6rem] 2xsm:w-[2.5rem] 2xsm:h-[2.5rem]"
                  alt="green-loop logo"
                />
              </Link>
              <div className="relative ml-5">
                <input
                  type="text"
                  id="header-searchbox"
                  name="searchbox"
                  placeholder="Search here ..."
                  className="w-[20rem] bg-[#FEFEFE] border border-[#CACACA] focus:bg-white focus:border-gray-300 focus:outline-none h-10 p-4 pl-8 placeholder-gray-500 rounded-full text-xs sm:h-4 sm:w-[14rem] sm:p-3.5 sm:pl-8 sm:max-w-xs xsm:w-[13rem] 2xsm:w-[11rem] 2xsm:p-3 2xsm:pl-8 2xsm:h-4"
                />
                <IoSearch className="absolute align-center left-3 top-3.5 h-3 w-3 text-gray-300 pointer-events-none sm:top-2.5" />
              </div>
            </div>
          )}

          <div className="bg-white justify-between max-h-[5rem] items-center h-[5rem] text-xl w-screen flex fixed md:shadow-md md:py-1 md:text-2xl md:text-center md:justify-between md:h-[3.5rem] sm:justify-center sm:h-[3rem] sm:bottom-0 sm:items-center xsm:px-0 2xsm:px-0">
            {hideModals && (
              <div className="flex items-center text-center px-5">
                <Link to="/">
                  <img
                    src={greenLoopLogo}
                    className="h-14 w-auto items-center cursor-pointer lg:h-12 md:h-9"
                    alt="green-loop logo"
                  />
                </Link>
                <div className="relative flex items-center ml-5 lg:h-12 md:h-9">
                  <input
                    type="text"
                    id="header-searchbox"
                    name="searchbox"
                    placeholder="Search here ..."
                    className="w-[20rem] h-10 p-4 pl-8 placeholder-gray-500 rounded-full text-sm bg-[#FEFEFE] border border-[#CACACA] focus:bg-white focus:border-gray-300 focus:outline-none lg:h-6 lg:w-[15rem] md:h-2 md:w-[12rem] md:text-xs md:max-w-xs "
                  />
                  <IoSearch className="absolute align-center left-3 top-3 h-3 w-3 text-gray-300 pointer-events-none lg:top-5 md:top-3" />
                </div>
              </div>
            )}

            <ul className="flex relative h-[5rem] items-center pl-5 md:pl-0 md:justify-center md:text-2xl md:h-[3.5rem] sm:h-[3rem]">
              {Menus.map((menu, index) => {
                if (
                  (hideModals && menu.name.includes("Notifications")) ||
                  (hideModals && menu.name.includes("Settings"))
                ) {
                  return (
                    <div
                      key={index}
                      onClick={() =>
                        menu.name.includes("Notifications")
                          ? setShowNotification(!showNotification)
                          : setHoveredSettings(!isHoveredSettings)
                      }
                      className="px-6 text-[#31572C] h-[5rem] cursor-pointer hover:text-white hover:bg-[#5e8759] duration-200 lg:px-6 md:h-[3.5rem] md:px-[1.1rem] sm:h-[3rem] xsm:px-[1.3rem] 2xsm:px-[1rem]"
                    >
                      {menu.name.includes("Notifications") &&
                        unreadMessagesCount && (
                          <span className="absolute top-3 right-17 bg-red-500 text-white w-4 h-4 text-center justify-between rounded-full font-medium text-xs">
                            {unreadMessagesCount}
                          </span>
                        )}
                      <span className="flex flex-col text-center items-center justify-center w-full h-[5rem] sm:text-3xl md:h-[3.5rem] sm:h-[3rem]">
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
                      key={index}
                      to={menu.route}
                      className="px-6 text-[#31572C] h-[5rem] cursor-pointer hover:text-white hover:bg-[#5e8759] duration-200 lg:px-6 md:h-[3.5rem] sm:h-[3rem] md:px-[1.1rem] xsm:px-[1.3rem] 2xsm:px-[1rem]"
                    >
                      <span className="flex flex-col text-center items-center justify-center w-full h-[5rem] md:h-[3.5rem] sm:h-[3rem] sm:text-xl">
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
              {showNotification && (
                <Notification
                  scrollActive={scrollActive}
                  unreadMessages={unreadMessages}
                  unreadMessagesCount={unreadMessagesCount}
                  setShowNotification={setShowNotification}
                  mutate={mutate}
                  convoLoading={convoLoading}
                />
              )}

              {isHoveredSettings && <SettingModal />}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
