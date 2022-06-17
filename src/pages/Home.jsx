import FooterLikeHeader from "../components/FooterLikeHeader";
import HomeBody from "../components/HomeBody";

const Home = () => {
  return (
    <div className="homebg flex flex-col space-y-4">
      <FooterLikeHeader />
      <HomeBody />
    </div>
  );
};

export default Home;
