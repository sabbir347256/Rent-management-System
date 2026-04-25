import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "./AuthProvider/AuthContext.jsx";
import { HelmetProvider } from "react-helmet-async";
import Root from "./components/pages/Root/Root.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/HomeComponents/Home.jsx";
import PropertyPage from "./components/pages/Properties/PropertyPage.jsx";
import About from "./components/pages/About/About.jsx";
import ManagerDashboard from "./components/pages/ManagerAndAdmin/Manager/ManagerDashboard.jsx";
import AdminDashboard from "./components/pages/ManagerAndAdmin/Admin/AdminDashboard.jsx";
import AddProperty from "./components/pages/ManagerAndAdmin/Manager/AddProperty.jsx";
import PropertyBookings from "./components/pages/ManagerAndAdmin/Manager/PropertyBookings.jsx";
import PropertyDetails from "./components/pages/PropertyDetails/PropertyDetails.jsx";
import Login from "./components/pages/Shared/Login.jsx";
import Signup from "./components/pages/Shared/Signup.jsx";
import MyProperties from "./components/pages/ManagerAndAdmin/Manager/MyProperties.jsx";
import PendingManager from "./components/pages/ManagerAndAdmin/Admin/PendingManager.jsx";
import AllProperty from "./components/pages/ManagerAndAdmin/Admin/AllProperty.jsx";
import AlltypeProperties from "./components/pages/ManagerAndAdmin/Admin/AlltypeProperties.jsx";
import Allusers from "./components/pages/ManagerAndAdmin/Admin/Allusers.jsx";
import AllManager from "./components/pages/ManagerAndAdmin/Admin/AllManager.jsx";
import AdminLayout from "./components/pages/ManagerAndAdmin/Admin/AdminLayout/AdminLayout.jsx";
import Dashboard from "./components/pages/ManagerAndAdmin/Admin/Dashboard/Dashboard.jsx";
import Allbooking from "./components/pages/ManagerAndAdmin/Admin/Allbookign/Allbooking.jsx";
import ManagerLayout from "./components/pages/ManagerAndAdmin/Manager/ManagerLayout/ManagerLayout.jsx";
import Profile from "./components/utils/Profile.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/properties",
        element: <PropertyPage></PropertyPage>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/manager-dashboard1",
        element: <ManagerDashboard></ManagerDashboard>,
      },
      {
        path: "/property-details/:id",
        element: <PropertyDetails></PropertyDetails>,
      },
      {
        path: "/my-properties",
        element: <MyProperties></MyProperties>,
      },

      {
        path: "/dashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "pending-manager",
        element: <PendingManager></PendingManager>,
      },

      {
        path: "manage-users",
        element: <Allusers></Allusers>,
      },
      {
        path: "property-approval",
        element: <AllProperty></AllProperty>,
      },
      {
        path: "all-type-property",
        element: <AlltypeProperties></AlltypeProperties>,
      },
      {
        path: "all-manager",
        element: <AllManager></AllManager>,
      },
      {
        path: "all-booking",
        element: <Allbooking></Allbooking>
      },
    ],
  },
  {
    path: "/manager-dashboard",
    element: <ManagerLayout></ManagerLayout>,
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "my-property",
        element: <MyProperties></MyProperties>,
      },

      {
        path: "add-property",
        element: <AddProperty></AddProperty>,
      },
      {
        path: "all-bookings",
        element: <PropertyBookings></PropertyBookings>,
      },
      {
        path: "all-type-property",
        element: <AlltypeProperties></AlltypeProperties>,
      },
      {
        path: "all-manager",
        element: <AllManager></AllManager>,
      },
      {
        path: "all-booking",
        element: <Allbooking></Allbooking>
      },
      {
        path : "profile",
        element :<Profile></Profile>
      }
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthContext>
      <HelmetProvider>
        <React.StrictMode>
          <RouterProvider router={router}></RouterProvider>
        </React.StrictMode>
      </HelmetProvider>
    </AuthContext>
  </QueryClientProvider>,
);
