import Cookies from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useRef } from "react";
import * as Scroll from "react-scroll";
import notify from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [currentSocket, setCurrentSocket] = useState(null);
  let userData;
  if (Cookies.get("user_data")) {
    userData = JSON.parse(Cookies.get("user_data"));
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (
      Cookies.get("user_data") == null ||
      Cookies.get("user_data") == undefined
    ) {
      navigate("/login");
    }
  });

  useEffect(() => {
    setLoading(false);
    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:8080/get_all_questions`);
      setMessages(res.data.data);
    };

    fetchMessages();

    const socket = io("http://localhost:8080");
    // socket.connect();
    setCurrentSocket(socket);
    socket.on("connection", () => {
      console.log(`I'm connected with the back-end`);
      socket.on("new_user", (data) => {
        console.log(data);
      });
      socket.on("recieve_message", (data) => {
        console.log(data);
        Scroll.animateScroll.scrollToBottom();
        setMessages(data);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  // inputRef.current.scrollIntoView({ behavior: "smooth" });
  window.scrollTo(0, document.body.scrollHeight);

  console.log(messages);

  if (loading) {
    return <div className="text-center text-5xl font-poppins">Loading...</div>;
  } else {
    return (
      <>
        <h1 className="text-3xl bg-cyan-50 pt-2 text-blue-600 text-center font-poppins ">
          Get Answers for your Questions
        </h1>
        <div className="bg-cyan-50 h-full  flex flex-col justify-between p-3">
          <div className="space-y-5 mb-36">
            {messages.map((message) => {
              console.log(message);
              return (
                <>
                  <div
                    className="flex justify-start"
                    key={Math.random() * 1004}
                  >
                    <div className="bg-blue-400 text-white w-[75vw] p-4  rounded-r-3xl rounded-t-3xl flex flex-col space-y-2">
                      <h2 className="text-2xl text-gray-700 font-poppins">
                        {message.question}
                      </h2>
                      <p className="">
                        <span className="text-yellow-300">Question by</span>{" "}
                        {message.userName}
                      </p>
                      {userData.role_id == 1 && message.answer == "" ? (
                        <form
                          className="space-x-2"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const answer = e.target.reply.value;
                            const data = {
                              question_id: message.questionId,
                              answer: answer,
                            };
                            currentSocket.emit("send_answer", data);
                          }}
                        >
                          <input
                            placeholder="Reply Message"
                            name="reply"
                            className="bg-gray-200 p-2 text-gray-600 outline-none"
                          />
                          <button className="cursor-pointer">
                            <span className="text-red-300">Reply </span>{" "}
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </div>
                  {message.answer !== "" ? (
                    <div
                      className="flex justify-end"
                      key={Math.random() * 1004}
                    >
                      <div className="bg-green-400 text-white w-[75vw] p-4  rounded-l-3xl rounded-t-3xl flex flex-col  space-y-2">
                        <h2 className="text-right text-2xl text-gray-700 font-poppins ">
                          {message.answer}
                        </h2>

                        <p className="text-right ">
                          <span className="text-yellow-300"> Reply by</span>{" "}
                          Admin
                        </p>
                      </div>
                    </div>
                  ) : null}
                </>
              );
            })}
          </div>
          <div className="flex justify-center mb-8">
            <div
              className="w-[50%]  h-28 bg-gray-400 rounded-lg flex p-3 items-center fixed  bottom-8 shadow-lg shadow-black z-20"
              ref={inputRef}
            >
              <form
                className="flex flex-col items-center w-full space-y-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  currentSocket.emit("message", {
                    user_id: userData.id,
                    question: e.target.elements.question.value,
                  });
                  // clear the input field

                  e.target.elements.question.value = "";
                  // scroll to bottom
                  Scroll.animateScroll.scrollToBottom();
                }}
              >
                <input
                  className="bg-transparent outline-none text-xl w-full focus:outline-none placeholder:text-blue-500 text-gray-700 font-poppins"
                  placeholder="Ask your question"
                  name="question"
                />
                <button className="bg-blue-400 p-2 rounded-lg text-white font-poppins">
                  Ask Question
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
