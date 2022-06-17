import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
const FooterLikeHeader = () => {
  return (
    <div className="sticky top-0 w-full  bg-[#04091E] p-3 font-poppins flex justify-between items-center">
      <div className="flex space-x-4 justify-center items-center">
        <FaFacebookF className="text-lg text-white hover:text-orange-400 cursor-pointer transition-all" />
        <FaTwitter className="text-lg text-white hover:text-orange-400 cursor-pointer transition-all" />
        <FaInstagram className="text-lg text-white hover:text-orange-400 cursor-pointer transition-all" />
      </div>
      <div className="flex space-x-4 justify-center items-center">
        <a
          href="tel://9123654896"
          className="text-lg text-white hover:text-orange-400 cursor-pointer transition-all"
        >
          +91 912 3645 896
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=admin.chatbox@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="text-lg text-white hover:text-orange-400 cursor-pointer transition-all"
        >
          admin.chatbox@gmail.com
        </a>
      </div>
    </div>
  );
};

export default FooterLikeHeader;
