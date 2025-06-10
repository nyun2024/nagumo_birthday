import { ReactCusdis } from "react-cusdis";
import styles from "./Comment.module.scss";

const Comment = () => {
  return (
    <ReactCusdis
      attrs={{
        host: "https://cusdis.com",
        appId: "c379c40f-a933-4309-9479-7c7eec724451",
        pageId: "home",
        pageTitle: "나구모 생일",
        pageUrl: window.location.href,
      }}
    />
  );
};

export default Comment;
