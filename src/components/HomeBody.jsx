import { useNavigate } from "react-router-dom";
const HomeBody = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[80vw] mx-auto">
      <div className="header flex justify-between border-b border-b-gray-200 w-full">
        <div>
          <h1 className="text-3xl text-[#66CEEB] font-poppins">Chat Bot</h1>
        </div>
        <div className="space-x-3 text-white font-poppins text-lg">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="hover:text-orange-400 cursor-pointer transition-all"
          >
            Home
          </span>
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="hover:text-orange-400 cursor-pointer transition-all"
          >
            Register
          </span>
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="hover:text-orange-400 cursor-pointer transition-all"
          >
            Login
          </span>
        </div>
      </div>
      <div className="body flex flex-col justify-center items-start mt-[35vh] space-y-4">
        <h1 className="text-5xl font-bold text-white">CHAT BOT</h1>
        <p className="text-gray-400">
          In the history of modern astronomy, there is probably no one greater
          leap forward than the building and launch of the space telescope known
          as the Hubble.
        </p>
        <button className="bg-orange-500 p-4 w-40 text-white text-xl font-poppins hover:bg-white hover:text-orange-500  transition-all duration-500" onClick={() => {
          navigate('/register')
        }}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomeBody;
