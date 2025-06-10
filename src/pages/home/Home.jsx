import Comment from "@components/comment/Comment";

const Home = () => {
  return (
    <div>
      <p>나구모 생일~</p>
      <Comment id={1} title="나구모 생일" content="생일 추카" />
    </div>
  );
};

export default Home;
