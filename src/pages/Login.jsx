import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import notify from "react-hot-toast";
import Cookies from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#607188] h-screen  p-5 flex flex-col justify-center items-center space-y-6">
      <h1 className="text-5xl text-white font-poppins">Chat Bot</h1>
      <form
        className="bg-white p-4 flex flex-col space-y-6 w-[70vw] lg:w-[50vw]"
        onSubmit={async (e) => {
          e.preventDefault();
          // console.table(e.target.elements);
          const body = {
            email: e.target.elements.email.value,
            password: e.target.elements.password.value,
          };

          // Make sure al the fields are filled
          if (body.email.trim() === "" || body.password.trim() === "") {
            notify.error("Please fill all the fields");
          } // Make sure the passwords match
          else {
            const res = await axios.post("http://localhost:8080/login", body);
            console.log(res.data.data);
            if (res.data.status === 200) {
              Cookies.set("user_data", JSON.stringify(res.data.data));
              notify.success("Loggedin Successfully");
              navigate("/dashboard");
            } else if (res.data.status === 400) {
              notify.error(res.data.message, "error");
            }
          }
          // Cookies.set("user_data", res.data.data);
        }}
      >
        <h2 className="text-2xl text-gray-700 font-poppins text-center">
          Registration Form
        </h2>
        <div className="flex flex-col space-y-2 ">
          <label className="text-gray-700 font-poppins">Email</label>
          <input
            type="email"
            className="border-b-gray-200 border-b-2 outline-none  w-[80%]"
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="flex flex-col space-y-2 ">
          <label className="text-gray-700 font-poppins">Password</label>
          <input
            type="password"
            className="border-b-gray-200 border-b-2 outline-none  w-[80%]"
            placeholder="Password"
            name="password"
          />
        </div>
        <button className="bg-orange-400 text-white font-poppins p-2 rounded-full hover:shadow-gray-700 hover:shadow-md transition-all">
          Login
        </button>
        <div className="w-full flex flex-col">
          <h4 className="text-center text-gray-600">Dont Have an Account ? </h4>
          <span
            className="text-center text-sky-400 transition-all cursor-pointer hover:text-sky-800"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register Here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
