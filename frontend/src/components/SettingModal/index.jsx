import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { signOutUser } from "../../api/user";
import { signOutUser as signOutUserAction } from "../../redux/slices/userSlice";

const SettingModal = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user:detail"));

  const signOut = async () => {
    // await signOutUser(user.id);
    localStorage.removeItem("user:token");
    localStorage.removeItem("user:detail");
    // dispatch(signOutUserAction());
  };

  return (
    <div
      className="z-50 fixed top-[4.5rem] right-2 my-4 text-clamp-xs leading-5 list-none bg-white divide-y divide-gray-100 rounded shadow"
      id="dropdown-2"
    >
      <Link to="profile">
        <div className="px-4 py-3 cursor-pointer hover:bg-gray-100">
          <p role="none">My Account</p>
        </div>
      </Link>
      <ul className="py-1" role="none">
        <li>
          <Link to="dashboard/users">
            <span
              className="block px-4 py-4 cursor-pointer hover:bg-gray-100"
              role="menuitem"
            >
              Users
            </span>
          </Link>
        </li>
        <li>
          <span
            className="block px-4 py-4 cursor-pointer hover:bg-gray-100"
            role="menuitem"
            onClick={signOut}
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SettingModal;
