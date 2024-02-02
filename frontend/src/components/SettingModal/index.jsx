import { Link } from "react-router-dom";

const SettingModal = () => {
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
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default SettingModal;
