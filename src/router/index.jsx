import { createHashRouter } from "react-router-dom";
import Home from "@pages/home/Home";
import SelectFrame from "@pages/photoBooth/SelectFrame/SelectFrame";
import WebCam from "@pages/photoBooth/Snapshot/WebCam";
import SaveEditSnapshot from "@pages/photoBooth/SaveEditSnapshot/SaveEditSnapshot";
import HbdMessage from "@pages/hbdMessage/HbdMessage";
import Reference from "@pages/reference/Reference";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/photoBooth",
      element: <SelectFrame />,
    },
    {
      path: "/webcam/:type",
      element: <WebCam />,
    },
    {
      path: "/save/:type",
      element: <SaveEditSnapshot />,
    },
    {
      path: "/message",
      element: <HbdMessage />,
    },
    {
      path: "/reference",
      element: <Reference />,
    },
  ],
  {
    scrollRestoration: "manual", // ★ 자동 스크롤 복원 끄기
  },
  { basename: "/" }
);

export default router;
