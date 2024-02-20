import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { updateHasReadMessage } from "../../api/message";

const MobileNotification = () => {
  // const messages = useSelector((state) => state.user.messages);
  const user = JSON.parse(localStorage.getItem("user:detail"));

  const updateMessage = async (messageId) => {
    try {
      await updateHasReadMessage(messageId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-white" id="profile">
      <div className="flex pt-[5rem] border-grey rounded">
        <div className="h-full w-full">
          <div className="relative mx-auto rounded-lg">
            <h3 className="text-md font-semibold uppercase text-gray-400 mb-4 pl-2">
              Notifications
            </h3>
            <div className="divide-y divide-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNotification;
