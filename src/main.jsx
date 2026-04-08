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
        path : "/about",
        element : <About></About>
      }
    ],
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
