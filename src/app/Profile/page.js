"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Photo from "../../assets/profile.png";
import batch_1 from "../../assets/batch-1.jpg";
import batch_2 from "../../assets/batch-2.png";
import batch_3 from "../../assets/batch-3.png";
import batch_4 from "../../assets/batch-4.png";
import batch_5 from "../../assets/batch-5.png";
import Image from "next/image";
import supabase from "../supabase";

const Main = () => {
  const [zeta, setZeta] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [trades, setTrades] = useState([]);
  const [leaderboards, setLeaderboards] = useState([]);
  const [thisuserdata, setThisUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) {
          throw new Error("Error fetching user data:", userError.message);
        }

        if (user) {
          setUserEmail(user.email);

          // Fetch balance
          const { data: userData, error: balanceError } = await supabase
            .from("UserData")
            .select("balance")
            .eq("email", user.email);
          if (balanceError) {
            throw new Error("Error fetching balance:", balanceError.message);
          }

          if (userData.length > 0) {
            const balance = userData[0].balance;
            console.log("Balance:", balance);
            setZeta(balance); // Initialize zeta with balance
          } else {
            console.log("No balance found for user:", user.email);
          }

          // Fetch trades
          const { data: tradesData, error: tradesError } = await supabase
            .from("Trades")
            .select("*")
            .eq("email", user.email);
          if (tradesError) {
            throw new Error("Error fetching trades:", tradesError.message);
          }

          if (tradesData) {
            setTrades(tradesData);
            console.log("Trades:", tradesData);
          } else {
            console.log("No trades found for user:", user.email);
          }
        } else {
          setUserEmail(null);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let { data: UserData, error } = await supabase
        .from("UserData")
        .select("*");
      if (UserData) {
        setLeaderboards(UserData);
      } else {
        console.log("error");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className={`grid grid-cols-1 lg:grid-cols-3 pt-32 w-full px-4 lg:px-24 gap-4`}>
        <div className="flex">
          <div className="w-20 h-20 border-white mx-3 my-3 rounded-full">
            <Image src={Photo} alt="" width={80} height={80} />
          </div>
          <div className="">
            <p className="p-2">Email: {userEmail}</p>
            <p className="p-2">Balance: {zeta}</p>
          </div>
        </div>

        <div className="grid cols-span-2 border rounded-lg p-2">
          <h1 className="text-center">Leaderboards</h1>
          {/* Render leaderboards data here */}
          <div>
            <div className="grid grid-cols-2">
              <p>Name</p>
              <p>Profits</p>
            </div>
            {leaderboards.map((leaderboard, index) => (
              <div key={index} className="grid grid-cols-2">
                <p>{leaderboard.Name}</p>
                <p>{leaderboard.balance}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid cols-span-2  border rounded-lg p-2">
          <h1 className="center">Educational Leaderboards</h1>
          <div className="grid grid-cols-2">
            <p>Name</p>
            <p>XP</p>
          </div>
          {leaderboards.map((leaderboard, index) => (
            <div key={index} className="grid grid-cols-2">
              <p>{leaderboard.Name}</p>
              <p>{leaderboard.xp ? leaderboard.xp : "0"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-90 h-72 border-2 bg-red-400 mx-10 my-10 justify-center items-center">
        <div>
          <h3 className="text-center">batches</h3>
        </div>
        <div className="flex justify-center mt-5 px-5">
          <div className="flex items-center">
            <div className="w-32 h-32 mx-2">
              <Image
                src={batch_1}
                alt=""
                width={128}
                height={128}
                className={trades[0]?.badge1 ? "" : "invert"}
              />
              {trades[0]?.badge1 ? "Acquired" : "Not Acquired"}
            </div>
            <div className="w-32 h-32 mx-2 ">
              <Image src={batch_2} alt="" width={128} height={128} className={trades[0]?.badge2 ? "" : "invert"} />
              {trades[0]?.badge2 ? "Acquired" : "Not Acquired "}
            </div>
            <div className="w-32 h-32 mx-2">
              <Image src={batch_3} alt="" width={128} height={128} className={trades[0]?.badge3 ? "" : "invert"} />
              {trades[0]?.badge3 ? "Acquired" : "Not Acquired"}
            </div>
            <div className="w-32 h-32 mx-2">
              <Image src={batch_4} alt="" width={128} height={128} className={trades[0]?.badge4 ? "" : "invert"} />
              {trades[0]?.badge4 ? "Acquired" : "Not Acquired"}
            </div>
            <div className="w-32 h-32 mx-2">
              <Image src={batch_5} alt="" width={128} height={128} className={trades[0]?.badge5 ? "" : "invert"} />
              {trades[0]?.badge5 ? "Acquired" : "Not Acquired"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
