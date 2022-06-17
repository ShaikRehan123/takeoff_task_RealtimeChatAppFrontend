import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import notify from "react-hot-toast";
import Cookies from "js-cookie";
const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#607188] h-full  p-5 flex flex-col justify-center items-center space-y-6">
      <h1 className="text-5xl text-white font-poppins">Chat Bot</h1>
      <form
        className="bg-white p-4 flex flex-col space-y-6 w-[70vw] lg:w-[50vw]"
        onSubmit={async (e) => {
          e.preventDefault();
          // console.table(e.target.elements);
          const body = {
            name: e.target.elements.fullName.value,
            email: e.target.elements.email.value,
            phone: e.target.elements.phone.value,
            userType: e.target.elements.userType.value,
            address: e.target.elements.address.value,
            description: e.target.elements.description.value,
            password: e.target.elements.password.value,
            confirmPassword: e.target.elements.confirmPassword.value,
          };

          // Make sure al the fields are filled
          if (
            body.name.trim() === "" ||
            body.email.trim() === "" ||
            body.phone.trim() === "" ||
            body.userType === "none" ||
            body.address.trim() === "" ||
            body.description.trim() === "" ||
            body.password.trim() === "" ||
            body.confirmPassword.trim() === ""
          ) {
            notify.error("Please fill all the fields");
          } // Make sure the passwords match
          else if (body.password !== body.confirmPassword) {
            notify.error("Passwords do not match");
          } else if (body.phone.length !== 10) {
            notify.error("Phone number must be 10 digits");
          } else {
            const res = await axios.post("http://localhost:8080/signup", body);
            console.log(res.data.data);
            if (res.data.status === 200) {
              // Cookies.set("user_data", JSON.stringify(res.data.data));
              notify.success("Registered Successfully");
              navigate("/login");
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
          <label className="text-gray-700 font-poppins">Name</label>
          <input
            type="text"
            className="border-b-gray-200 border-b-2 outline-none  w-[80%]"
            placeholder="Full Name"
            name="fullName"
          />
        </div>
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
          <label className="text-gray-700 font-poppins">Phone</label>
          <input
            type="text"
            className="border-b-gray-200 border-b-2 outline-none  w-[80%]"
            placeholder="Phone"
            name="phone"
          />
        </div>
        <div className="flex flex-col space-y-2 ">
          <label className="text-gray-700 font-poppins">User Type</label>
          <select
            className="border-b-gray-200 text-gray-400 border-b-2 outline-none  w-[80%]"
            defaultValue="none"
            name="userType"
          >
            <option value="none" disabled>
              Select User Type
            </option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="guest">Guest</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2 ">
          <label className="text-gray-700 font-poppins">Address</label>
          <input
            type="text"
            className="border-b-gray-200 border-b-2 outline-none  w-[80%]"
            placeholder="Address"
            name="address"
          />
        </div>
        <div className="flex flex-col space-y-2 ">
          <label className="text-gray-700 font-poppins">Description</label>
          <input
            type="text"
            className="border-b-gray-200 border-b-2 outline-none  w-[80%]"
            placeholder="Description"
            name="description"
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
        <div className="flex flex-col space-y-2 ">
          <label className="text-gray-700 font-poppins">Confirm Password</label>
          <input
            type="text"
            className="border-b-gray-200 border-b-2 outline-none  w-[80%] "
            placeholder="Confirm Password"
            name="confirmPassword"
          />
        </div>
        <button className="bg-orange-400 text-white font-poppins p-2 rounded-full hover:shadow-gray-700 hover:shadow-md transition-all">
          Register
        </button>
        <div className="w-full flex flex-col">
          <h4 className="text-center text-gray-600">Already Registered ? </h4>
          <span
            className="text-center text-sky-400 transition-all cursor-pointer hover:text-sky-800"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login Here
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
