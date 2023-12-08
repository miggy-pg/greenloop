import { Link } from "react-router-dom";

const Notification = ({ scrollActive, type }) => {
  return (
    <div
      className={`z-50 max-w-sm my-4 fixed ${
        scrollActive ? "top-[4.5rem]" : "top-[5rem]"
      } border h-96 overflow-y-auto text-base w-full list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg`}
      id="notification-dropdown"
    >
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 ">
        Notifications
      </div>
      <div>
        <a
          href="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="/images/users/bonnie-green.png"
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
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 ">
              New message from{" "}
              <span className="font-semibold text-gray-900">
                Bonnie Green
              </span>
              : "Hey, what's up? All set for the presentation?"
            </div>
            <div className="text-xs font-medium text-primary-700">
              a few moments ago
            </div>
          </div>
        </a>
        <a
          href="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="/images/users/jese-leos.png"
              alt="Jese image"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-gray-900 border border-white rounded-full">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 ">
              <span className="font-semibold text-gray-900 ">
                Jese leos
              </span>{" "}
              and{" "}
              <span className="font-medium text-gray-900">
                5 others
              </span>{" "}
              started following you.
            </div>
            <div className="text-xs font-medium text-primary-700">
              10 minutes ago
            </div>
          </div>
        </a>
        <a
          href="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="/images/users/joseph-mcfall.png"
              alt="Joseph image"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-red-600 border border-white rounded-full">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5">
              <span className="font-semibold text-gray-900">
                Joseph Mcfall
              </span>{" "}
              and{" "}
              <span className="font-medium text-gray-900">
                141 others
              </span>{" "}
              love your story. See it and view more stories.
            </div>
            <div className="text-xs font-medium text-primary-700">
              44 minutes ago
            </div>
          </div>
        </a>
        <a
          href="#"
          className="flex px-4 py-3 border-b hover:bg-gray-100"
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="/images/users/leslie-livingston.png"
              alt="Leslie image"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-green-400 border border-white rounded-full">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5">
              <span className="font-semibold text-gray-900">
                Leslie Livingston
              </span>{" "}
              mentioned you in a comment:{" "}
              <span className="font-medium text-primary-700">
                @bonnie.green
              </span>{" "}
              what do you say?
            </div>
            <div className="text-xs font-medium text-primary-700">
              1 hour ago
            </div>
          </div>
        </a>
        <a
          href="#"
          className="flex px-4 py-3 hover:bg-gray-100 "
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="/images/users/robert-brown.png"
              alt="Robert image"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5">
              <span className="font-semibold text-gray-900">
                Robert Brown
              </span>{" "}
              posted a new video: Glassmorphism - learn how to implement the new
              design trend.
            </div>
            <div className="text-xs font-medium text-primary-700">
              3 hours ago
            </div>
          </div>
        </a>
        <a
          href="#"
          className="flex px-4 py-3 hover:bg-gray-100 "
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="/images/users/robert-brown.png"
              alt="Robert image"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5">
              <span className="font-semibold text-gray-900">
                Robert Brown
              </span>{" "}
              posted a new video: Glassmorphism - learn how to implement the new
              design trend.
            </div>
            <div className="text-xs font-medium text-primary-700">
              3 hours ago
            </div>
          </div>
        </a>
        <a
          href="#"
          className="flex px-4 py-3 hover:bg-gray-100 "
        >
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="/images/users/robert-brown.png"
              alt="Robert image"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-purple-500 border border-white rounded-full">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5">
              <span className="font-semibold text-gray-900">
                Robert Brown
              </span>{" "}
              posted a new video: Glassmorphism - learn how to implement the new
              design trend.
            </div>
            <div className="text-xs font-medium text-primary-700">
              3 hours ago
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Notification;
