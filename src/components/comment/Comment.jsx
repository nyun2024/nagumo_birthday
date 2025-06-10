import { useEffect } from "react";

const Comment = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.commento.io/js/commento.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return <div id="commento"></div>;
};

export default Comment;
