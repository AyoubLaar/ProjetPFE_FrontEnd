import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./theme";
import "./styles/main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./Pages/Search.jsx";
import Anonce from "./Pages/Anonce.jsx";
import ErrorPage from "./Pages/error-page.jsx";
import Publier from "./Pages/Publier";
import Reserver from "./Pages/Reserver";
import Login from "./Pages/login";
import RequireAuthentication from "./components/RequireAuthentication";
import RequireAdminAuthentication from "./components/RequireAdminAuthentication";
import AdminPage from "./Pages/AdminPage";
import SignUp from "./Pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Publier",
    element: <RequireAuthentication children={<Publier />} />,
  },
  {
    path: "/Anonce/:id",
    element: <Anonce />,
  },
  {
    path: "/Search/:id",
    element: <Search />,
  },
  {
    path: "/Reserver/:id",
    element: <RequireAuthentication children={<Reserver />} />,
  },
  {
    path: "/Admin",
    element: <RequireAdminAuthentication children={<AdminPage />} />,
  },
  {
    path: "/Signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={Theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
  // </React.StrictMode>
);
