import { TbArrowLeft } from "react-icons/tb";
import { Link } from "react-router-dom";

const MobileNotification = ({ messages }) => {
  const openConvo = false;

  console.log("MobileNotification: ", messages);

  return (
    <div className="w-full h-full bg-[#6a2323]" id="profile">
      <div className="flex pt-[5rem] border-grey rounded">
        <div className="h-full w-full">
          <div className="relative mx-auto rounded-lg">
            <h3 className="text-md font-semibold uppercase text-gray-400 mb-4 pl-2">
              Notifications
            </h3>

            <div className="divide-y divide-gray-200">
              <div
                // key={conversationId}
                className="w-full flex justify-center text-left py-8 sm:px-5 sm:py-1 sm:my-2 xsm:justify-start overflow-x-hidden"
                // onClick={() => fetchMessages(conversationId, user)}
              >
                <div className="flex items-center">
                  <img
                    className="rounded-full flex-shrink-0 mr-5 border border-primary"
                    src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
                    width="48"
                    height="48"
                    // alt={user?.companyName}
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 2xsm:text-[0.7em]">
                      {/* {user?.companyName} */}
                    </h4>
                    <div className="text-md 2xsm:text-[0.7em]">
                      The video chat ended · 2hrs
                    </div>
                  </div>
                </div>
              </div>
              {/* {messages.length > 0 && !openConvo
                ? messages.map(({ conversationId, user }) => {
                    console.log("conversationIduser: ", user);
                    console.log("conversatioconversationId: ", conversationId);
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
                  )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNotification;
