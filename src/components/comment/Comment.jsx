import { DiscussionEmbed } from "disqus-react";

const Comment = ({ id, title, content }) => {
  const disqusShortname = "nagumo-birthday"; // ex: myblog
  const disqusConfig = {
    url: `https://nyun2024.github.io/nagumo_birthday/${id}`, // 현재 페이지의 전체 URL
    identifier: id.toString(), // 고유한 식별자 (보통 포스트 ID)
    title: title,
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>

      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default Comment;
