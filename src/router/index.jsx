import { createHashRouter } from "react-router-dom";
import Home from "@pages/home/Home";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
  ],
  {
    basename: "/nagumo_birthday",
  }
);

export default router;
