import { NavLink, Outlet } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [carts] = useCart();

  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      <div className="w-64 bg-orange-400 min-h-screen">
        <ul className="p-2 space-y-2">
          {isAdmin ? (
            <>
              <li className="bg-green-400 p-2 rounded-md flex  items-center gap-1">
                <MdAdminPanelSettings className="text-xl" />
                <NavLink to={"/dashboard/adminHome"}>Admin Home</NavLink>
              </li>
              <li className="bg-green-400 p-2 rounded-md">
                <NavLink to={"/dashboard/addItems"}>Add Items</NavLink>
              </li>
              <li className="bg-green-400 p-2 rounded-md">
                <NavLink to={"/dashboard/manageItems"}>Manage Items</NavLink>
              </li>
              <li className="bg-green-400 p-2 rounded-md">
                <NavLink to={"/dashboard/allUsers"}>All Users</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="bg-green-400 p-2 rounded-md">
                <NavLink to={"/dashboard/userHome"}>User Home</NavLink>
              </li>
              <li className="bg-green-400 p-2 rounded-md">
                <NavLink to={"/dashboard/myCarts"}>
                  My Cart ({carts.length})
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li className="bg-green-400 p-2 rounded-md">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="bg-green-400 p-2 rounded-md">
            <NavLink to={"/shop"}>Shop</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
