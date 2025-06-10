import { DiscussionEmbed } from "disqus-react";

const Home = ({ post }) => {
  const disqusShortname = "nagumo-birthday"; // ex: myblog
  const disqusConfig = {
    url: `https://nyun2024.github.io/nagumo_birthday/${post.id}`, // 현재 페이지의 전체 URL
    identifier: post.id.toString(), // 고유한 식별자 (보통 포스트 ID)
    title: post.title,
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

export default Home;
