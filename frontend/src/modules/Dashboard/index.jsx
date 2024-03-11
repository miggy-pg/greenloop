import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/Common/Layout/Dashboard";

const Dashboard = () => {
  return (
    <>
      <DashboardLayout />
      <div id="main-content" className="relative w-full h-full ml-64 mt-24">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
