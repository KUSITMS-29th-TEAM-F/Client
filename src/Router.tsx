import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home/Home";
import Layout from "./pages/layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
