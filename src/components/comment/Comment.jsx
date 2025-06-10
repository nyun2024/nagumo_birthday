import { useEffect } from "react";

const Comment = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="cusdis_thread"
      data-host="https://cusdis.com"
      data-app-id="c379c40f-a933-4309-9479-7c7eec724451"
      data-page-id="home"
      data-page-url={window.location.href}
      data-page-title="나구모 생일"
    ></div>
  );
};

export default Comment;
