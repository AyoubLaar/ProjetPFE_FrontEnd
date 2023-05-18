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
import Carte from "./components/Carte";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/SignIn",
    element: <h1>Sign In</h1>,
  },
  {
    path: "/Publier",
    element: <h1>Publier</h1>,
  },
  {
    path: "/Anonce/:id",
    element: <Anonce />,
  },
  {
    path: "/Map",
    element: <Carte />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
