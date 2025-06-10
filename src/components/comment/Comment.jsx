// import { ReactCusdis } from "react-cusdis";
// import styles from "./Comment.module.scss";
import { Comments } from "@hyvor/hyvor-talk-react";

const Comment = () => {
  return (
    <Comments website-id={13439} page-id={1} />
    // <ReactCusdis
    //   attrs={{
    //     host: "https://cusdis.com",
    //     appId: "c379c40f-a933-4309-9479-7c7eec724451",
    //     pageId: "home",
    //     pageTitle: "나구모 생일",
    //     pageUrl: window.location.href,
    //   }}
    // />
  );
};

export default Comment;
