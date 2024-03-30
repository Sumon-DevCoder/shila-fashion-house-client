import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Shop from "../pages/Shop/Shop";
import Dashboard from "../layouts/Dashboard/Dashboard";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import MyCart from "../pages/MyCart/MyCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // admin routes
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "addItems",
        element: <AddItems />,
      },
      {
        path: "manageItems",
        element: <ManageItems />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      // users routes
      {
        path: "myCarts",
        element: <MyCart />,
      },
    ],
  },
]);

export default router;
