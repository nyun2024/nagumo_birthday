import { createHashRouter } from "react-router-dom";
import Home from "@pages/home/Home";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/photoBooth",
      element: <Home />,
    },
    {
      path: "/Message",
      element: <Home />,
    },
    {
      path: "/reference",
      element: <Home />,
    },
  ],
  { basename: "/" }
);

export default router;
