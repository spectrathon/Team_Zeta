"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../../app/supabase";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useUser } from "@auth0/nextjs-auth0";
// import modeswitch from "../modeswitch/modeswitch";
import CustomizedSwitches from "../modeswitch/modeswitch";
import { AppContext } from "../AppContext/AppContext";
import { useContext } from "react";
import Logo from "../../assets/logo.png";

import Image from "next/image";
const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [meuopen, setmenuopen] = useState(false);
  const { theme, settheme } = useContext(AppContext);
  const [zeta, setzeta] = useState(0);
const [menu2,setmenu2]=useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    };

    fetchUser();
  }, []);

  const handlemenu = () => {
    setmenuopen(!meuopen);
  };
  const logout = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error in Signout");
    } else {
      alert("Signout Successfully");
      window.location.href = "/";
    }
  };




  useEffect(() => {
    const fetchData = async () => {
      // Fetch user data
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
        // Fetch balance only if user email is available
        const { data: UserData, error } = await supabase
          .from('UserData')
          .select('balance')
          .eq('email', user.email);
        if (error) {
          console.error('Error fetching balance:', error.message);
          return;
        }
        // If data is fetched successfully, log and alert the balance
        if (UserData.length > 0) {
          const balance = UserData[0].balance;
          console.log('Balance:', balance);
          setzeta(balance);
        } else {
          console.log('No balance found for user:', user.email);
        }
      } else {
        setUserEmail(null);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <header
        className={`fixed flex w-full justify-between items-center px-10 lg:px-24 py-4 lg:py-8  dark:bg-slate-800 text-${theme}txt ${
          theme === "dark"
            ? "bg-gradient-to-r  from-40% from-slate-800 via-slate-700 to-60% to-slate-800 "
            : " bg-gradient-to-r  from-[#baecee] via-yellow-100 to-[#baecee] shadow-lg"
        } bg-opacity-50 z-[20]`}
      >
        <Link href="/" className="font-concert-one text-xl lg:text-2xl">
          Tradein
        </Link>
        <ul className="hidden lg:flex space-x-5 ">
        <li className="hover:text-emerald-300 p-2">
        <Link href="/Education">Education</Link>
          </li>
          <li className="hover:text-emerald-300 p-2">
            {" "}
            <Link href="/VirtualTrading">VirtualTrading</Link>
          </li>
          <li className="hover:text-emerald-300 p-2">
            {" "}
            <Link href="/chat">Community chat</Link>
          </li>
        </ul>
      <div className="hidden lg:flex items-center space-x-2 ">
      {userEmail && (
        <>
            <div className={`flex items-center`}>
            <Image className="w-4" src={Logo} alt="Logo" />
            {zeta}
            </div>
              <div className="">
                <Link href="/Store"><i class="fa-solid fa-store text-xl"></i> Store </Link>
              </div>
              </>
              )}
          {userEmail ? (
            <>
              <div
               
                className="text-slate-600 p-2 hover:text-slate-900  cursor-pointer relative"
                onMouseOver={()=>{setmenu2(1);}}
                onMouseLeave={()=>{setmenu2(0);}}
              >
                {userEmail}
                <ul className={` ${menu2?"absolute":"hidden"} bg-white text-black rounded-md pt-2 `}>
                  <Link href="/Profile" className="border-b p-4">Profile <i class="fa-solid fa-user"></i></Link>
                  <li  onClick={logout} className="p-4">Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></li>
                </ul>
              </div>
            </>
          ) : (
            <div className="p-2 space-x-2 flex items-center justify-center">
              <div className="hover:text-slate-800">
                {<Link href="/Login">Login</Link>}
              </div>
            </div>
          )}
              <div>
                <CustomizedSwitches
                  onChange={() => {
                    if (theme === "dark") {
                      settheme("light");
                    } else {
                      settheme("dark");
                    }
                  }}
                />
              </div>
        </div>

        <div onClick={handlemenu} className="lg:hidden text-2xl p-2">
          <i className={`fa-solid ${meuopen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>
      </header>
      <div
        className={`absolute w-full bg-${theme}bg z-[10] transition duration-300 lg:hidden ${
          meuopen ? "" : "-translate-y-full"
        }`}
      >
        <ul className="pt-20 text-center flex flex-col lg:flex ">
          <li
            className={`hover:text-yellow-300 p-2  transition duration-300 ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`hover:text-emerald-450 p-2  transition duration-[450ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            {" "}
            <Link href="/Eduction"><i class="fa-solid fa-graduation-cap"></i> Eduction</Link>
          </li>
          <li
            className={`hover:text-yellow-300 p-2  transition duration-[600ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/VirtualTrading"><i class="fa-solid fa-arrow-trend-up"></i>  VirtualTrading</Link>
          </li>
          <li
            className={`hover:text-yellow-300 p-2  transition duration-[750ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/Store"><i class="fa-solid fa-store"></i> Store</Link>
          </li>
          <li
            className={`hover:text-yellow-300 p-2  transition duration-[900ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/chat"><i class="fa-solid fa-users"></i>  Community</Link>
          </li>
          <li
            className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
              meuopen ? "" : "-translate-x-full"
            }`}
          >
            <Link href="/Profile"><i class="fa-solid fa-user"></i>  Profile</Link>
          </li>
          <div className="hidden lg:block">
            {userEmail ? (
              <li
                className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
                  meuopen ? "" : "-translate-x-full"
                } cursor-pointer`}
              >
                {userEmail}
              </li>
            ) : (
              <li
                className={`hover:text-red-300 p-2  transition duration-[1050ms] ${
                  meuopen ? "" : "-translate-x-full"
                }`}
              >
                <Link href="/Login">Login</Link>
              </li>
            )}
          </div>
        </ul>
        <div className="hidden just a trigger component bg-darkbg text-lighttxt text-darktxt bg-dark bg-light text-darkth text-lightth from-light to-light from-dark to-dark text-lightth bg-lightbg bg-darkbg"></div>
      </div>
    </>
  );
};

export default Navbar;
