"use client"
import React, { useState } from "react";
import supabase from "../supabase";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordt, setPasswordt] = useState("password");
  const [password1, setPassword1] = useState("");
  const [name, setName] = useState("");
  const [register, setRegister] = useState(false);

  const handleinvite = async (e) => {
    e.preventDefault();
    let person = prompt("Please enter email id", "abc@gmail.com");
    let { data, error } = await supabase.auth.admin.inviteUserByEmail(person);
    if (error) {
      console.log(error);
    }
    if (data) {
      alert("Invited successfully");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data) {
        setEmail(data.user.email);
        console.log(data);
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const registerbutton = (e) => {
    e.preventDefault();
    setRegister(!register);
  };

  async function signUpNewUser(e) {
    e.preventDefault();
    if (password === password1) {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        alert(error.message);
        console.log(error);
      } else {
        alert("Verification link sent to your email");
        const { data, error } = await supabase
          .from("UserData")
          .insert([{ email: email, balance: 2000000, Name: name }])
          .select();
        if (error) {
          console.log(error);
        } else {
          console.log("user data uploaded successfully");
        }
      }
    } else {
      alert("Passwords do not match");
    }
  }

  const forgtpassword = async (e) => {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      alert(error.code);
    }
    if (data) {
      alert(data.message);
    }
  };

  const passwordtoggle = () => {
    setPasswordt(passwordt === "password" ? "text" : "password");
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 bg-gray-200 h-screen w-full justify-center items-center">
        <div className="h-52 max-w-[80%] lg:h-[500px] lg:w-[500px] "></div>

        <div className="flex items-center justify-center w-full">
          <div className=" bg-gray-100 w-80 rounded-lg felx felx-col items-center justify-center text-center shadow-lg p-4 top-1/2 left-1/2">
            <h1>Login</h1>
            <form action="">
              <div className="flex flex-col">
                <input
                  className="my-2 p-2"
                  type="email"
                  placeholder="Email"
                  name=""
                  id=""
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="my-2 relative bg-white flex justify-center items-center">
                  <input
                    className="p-2 grow"
                    type={passwordt}
                    name=""
                    placeholder="Password"
                    id=""
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {passwordt === "password" ? (
                    <i
                      className="fa-solid fa-eye-slash bg-white mr-2"
                      onClick={passwordtoggle}
                    ></i>
                  ) : (
                    <i
                      className="fa-solid fa-eye mr-2"
                      onClick={passwordtoggle}
                    ></i>
                  )}
                </div>
                {register && (
                  <>
                    <div className="my-2 relative bg-white flex justify-center items-center">
                      <input
                        className=" p-2 grow"
                        type={passwordt}
                        name=""
                        placeholder="Confirm Password"
                        id=""
                        onChange={(e) => {
                          setPassword1(e.target.value);
                        }}
                      />
                      {passwordt === "password" ? (
                        <i
                          className="fa-solid fa-eye-slash bg-white mr-2"
                          onClick={passwordtoggle}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-eye mr-2"
                          onClick={passwordtoggle}
                        ></i>
                      )}
                    </div>
                    <div className="my-2 relative bg-white flex justify-center items-center">
                      <input
                        className=" p-2 grow"
                        type="text"
                        name=""
                        placeholder="Your Name"
                        id=""
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </>
                )}
                {!register && (
                  <button
                    className=" my-2 bg-red-400 rounded-lg p-2"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}
                <button
                  className="my-2 bg-red-400 rounded-lg p-2"
                  onClick={handleinvite}
                >
                  Invite friends
                </button>

                {!register && (
                  <a href="#" className="underline" onClick={registerbutton}>
                    Register?
                  </a>
                )}
                {!register && (
                  <a href="#" className="underline" onClick={forgtpassword}>
                    Forgot Password?
                  </a>
                )}
                {register && (
                  <button
                    className=" my-2 bg-red-400 rounded-lg p-2"
                    onClick={signUpNewUser}
                  >
                    SignUp
                  </button>
                )}
                {register && (
                  <a href="#" className="underline" onClick={registerbutton}>
                    Go back
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="h-52 max-w-[80%] lg:h-[500px] lg:w-[500px] "></div>
      </div>
    </>
  );
};

export default Page;
