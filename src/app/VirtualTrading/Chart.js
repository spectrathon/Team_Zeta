"use client";

import { LineStyle, TickMarkType, createChart } from "lightweight-charts";
import React, { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AppContext } from "../../components/AppContext/AppContext";
import { useContext } from "react";
import supabase from "../supabase";
import JSConfetti from 'js-confetti'


const Chart = () => {
  const chartContainerRef = useRef();
  const [candlePrice, setCandlePrice] = useState(null);
  const [linePrice, setLinePrice] = useState(null);
  const { theme } = useContext(AppContext);
  const [zeta, setzeta] = useState();
  const [zeta2, setzeta2] = useState();
  const jsConfetti = new JSConfetti()


  const initialData = [];
  const [quantity, setQuantity] = useState(1); // State to hold the quantity to buy
  const [currentPrice, setCurrentPrice] = useState(null); // State to hold the current price
  const [symbol, setsymbol] = useState("BTCUSDT");
  const [userEmail, setUserEmail] = useState(null);
  const [Trades, setTrades] = useState([]);
  const fetchData = async () => {
    let { data: Trades, error } = await supabase
      .from("Trades")
      .select("*")
      .eq("email", userEmail);
    if (Trades) {
      setTrades(Trades);
      console.log(Trades);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let { data: Trades, error } = await supabase
        .from("Trades")
        .select("*")
        .eq("email", userEmail);
      if (Trades) {
        setTrades(Trades);
        console.log(Trades);
      } else {
        console.log(error);
      }
    };
    fetchData();
    console.log(zeta);
  }, [currentPrice]);
useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          throw new Error('Error fetching user data:', userError.message);
        }
  
        if (user) {
          setUserEmail(user.email);
  
          // Fetch balance
          const { data: userData, error: balanceError } = await supabase
            .from('UserData')
            .select('balance')
            .eq('email', user.email);
          if (balanceError) {
            throw new Error('Error fetching balance:', balanceError.message);
          }
  
          if (userData.length > 0) {
            const balance = userData[0].balance;
            console.log('Balance:', balance);
            // alert('Balance: ' + balance);
            setzeta(balance); // Initialize zeta with balance
          } else {
            console.log('No balance found for user:', user.email);
          }
  
          // Fetch trades
          const { data: trades, error: tradesError } = await supabase
            .from("Trades")
            .select("*")
            .eq("email", user.email);
          if (tradesError) {
            throw new Error('Error fetching trades:', tradesError.message);
          }
  
          if (trades) {
            setTrades(trades);
            // alert(trades.length);
            console.log('Trades:', trades);
          } else {
            console.log('No trades found for user:', user.email);
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
  
const handleBuy = async () => {
    console.log(`Buying ${quantity} units at price ${currentPrice}`);
  
    if (zeta >= quantity * currentPrice) {
      try {
        // Insert trade into Trades table
        const { data: tradeData, error: tradeError } = await supabase
          .from("Trades")
          .insert([
            {
              Symbol: symbol,
              Quantity: quantity,
              buyprice: currentPrice,
              email: userEmail,
              status: "buy",
              total: quantity * currentPrice,
              profit: 0,
            },
          ])
          .single(); 
  
        if (tradeError) {
          throw tradeError;
        }
  
       
        const updatedZeta = zeta - (quantity * currentPrice);
        setzeta(updatedZeta);
  
        const { data: updatedUserData, error: updateError } = await supabase
          .from("UserData")
          .update({ balance: updatedZeta })
          .eq('email', userEmail);
  
        if (updateError) {
          throw updateError;
        }
  
        // Success message
        alert("Stock bought successfully!");
        jsConfetti.addConfetti()
  
      } catch (error) {
        alert("Error buying stock");
        console.error(error);
      }
    } else {
      alert("Insufficient balance to buy stocks");
    }
  };
  
const handlesell = async (tradeId) => {
    try {
      const { data: tradeData, error: tradeError } = await supabase
        .from("Trades")
        .select("*")
        .eq("id", tradeId)
        .single();
  
      if (tradeError) {
        throw tradeError;
      }
  
      const profit = currentPrice - tradeData.buyprice;
  
      const { data: updatedTradeData, error: updateError } = await supabase
        .from("Trades")
        .update({ status: "sell", profit: profit })
        .eq("id", tradeId);
  
      if (updateError) {
        throw updateError;
      }
  
      const updatedZeta = zeta + (tradeData.Quantity * currentPrice);
      setzeta(updatedZeta);
  
      const { data: updatedUserData, error: updateUserDataError } = await supabase
        .from("UserData")
        .update({ balance: updatedZeta })
        .eq("email", userEmail);
  
      if (updateUserDataError) {
        throw updateUserDataError;
      }
  
      alert("Stock sold successfully!");
      jsConfetti.addConfetti();
  
    } catch (error) {
      alert("Error selling stock");
      console.error(error);
    }
  
}

  useEffect(() => {
    axios(
      `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1m&limit=50`
    ).then((response) => {
      const initialData = response.data.map((kline) => ({
        time: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
      }));

      console.log(initialData);
      candleStickSeries.setData(initialData);
      lineSeries.setData(lineData); 
      setCurrentPrice(initialData[initialData.length - 1].close);
      console.log(currentPrice);
    });

    const intervalId = setInterval(() => {
      const intervalId = setInterval(() => {
        axios(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=5"
        ).then((response) => {
          const initialData = response.data.map((kline) => ({
            time: kline[0],
            open: parseFloat(kline[1]),
            high: parseFloat(kline[2]),
            low: parseFloat(kline[3]),
            close: parseFloat(kline[4]),
          }));
          console.log("updated");

          candleStickSeries.setData(initialData);
          lineSeries.setData(lineData); 
          setCurrentPrice(initialData[initialData.length - 1].close);
          console.log(currentPrice);
        });
      }, 1 * 10 * 1000);
    }, 1 * 30 * 1000);

    const lineData = initialData.map((item) => ({
      time: item.time,
      value: (item.open + item.close) / 2,
    }));

    const chart = createChart(chartContainerRef.current);

    chart.applyOptions({
      layout: {
        background: { color: "#222" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },

      width: chartContainerRef.current.clientWidth,
      // width: 800,
      height: 400,
      crosshair: {
        vertLine: {
          width: 3,
          color: "#C3BCDB44",
          style: LineStyle.Dashed,
          labelBackgroundColor: "#9B7DFF",
        },
        horzLine: {
          color: "#9B7DFF",
          labelBackgroundColor: "#9B7DFF",
        },
      },

      localization: {
        locate: "en-IN",
        timeFormatter: (time) => {
          const date = new Date(time * 1000);
          const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
            hour: "numeric",
            minute: "numeric",
            month: "short",
            day: "numeric",
            year: "2-digit",
          });
          return dateFormatter.format(date);
        },
        priceFormatter: (price) => {
          const myPrice = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
          }).format(price);

          return myPrice;
        },
      },
    });

    
    chart.priceScale("right").applyOptions({
      borderColor: "#71649C",
      visible: true,
      invertScale: false, 
      autoScale: true, 
    });

    chart.priceScale("left").applyOptions({
      borderColor: "#71649C",
      visible: true,
    });

   
    chart.timeScale().applyOptions({
      borderColor: "#71649C",
      // borderVisible: false,
      // visible: false,
      timeVisible: true,
      rightOffset: 20,
      barSpacing: 15,
      minBarSpacing: 5,
      fixLeftEdge: true,
      tickMarkFormatter: (time, tickMarkType, locale) => {
        const date = new Date(time * 1000);

        switch (tickMarkType) {
          case TickMarkType.Year:
            return date.getFullYear();

          case TickMarkType.Month:
            const monthFormatter = new Intl.DateTimeFormat(locale, {
              month: "short",
            });

            return monthFormatter.format(date);

          case TickMarkType.DayOfMonth:
            return date.getDate();

          case TickMarkType.Time:
            const timeFormatter = new Intl.DateTimeFormat(locale, {
              hour: "numeric",
              minute: "numeric",
            });

            return timeFormatter.format(date);

          case TickMarkType.TimeWithSeconds:
            const TimeWithSecondsFormatter = new Intl.DateTimeFormat(locale, {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            });

            return TimeWithSecondsFormatter.format(date);
          default:
            console.log("Sorry, we are out of. ");
        }
      },
    });

    const lineSeries = chart.addLineSeries();
    const candleStickSeries = chart.addCandlestickSeries();
    candleStickSeries.applyOptions({
      wickUpColor: "rgb(87, 217, 54)",
      upColor: "rgb(87, 217, 54)",
      wickDownColor: "rgb(225, 50, 85)",
      downColor: "rgb(225, 50, 85)",
      borderVisible: false,
    });

    lineSeries.applyOptions({
      lineWidth: 1,
      priceScaleId: "left",
    });

    candleStickSeries.setData(initialData);
    lineSeries.setData(lineData);

    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const data = param.seriesData.get(candleStickSeries);
        const linePriceData = param.seriesData.get(lineSeries);
        setCandlePrice(data);
        setLinePrice(linePriceData);
      }
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relvative w-full bg-${theme}`}>
      <div className="relative flex flex-wrap gap-10 pr-4">
        <div
          className={`!bg-${theme} !bg-light`}
          ref={chartContainerRef}
          style={{
            border: "2px solid black",
            width: "45%",
            left: "0px",
            marginLeft: "40px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.9)",
          }}
        ></div>
        <div className="border p-2 grow relative overflow-y-scroll">
          <h1 className="text-center">Trades</h1>
          <div className="pl-2 grid grid-cols-5">
            <div>Symbol</div>
            <div>Qty</div>
            <div>Buyprice</div>
            <div>profit</div>
          </div>
          <ul className="">
            {Trades.map((trade) => (
              <li className="border-b p-2 grid grid-cols-5">
                <div>{trade.Symbol}</div>
                <div>{trade.Quantity}</div>
                <div>{trade.buyprice}</div>
                <div>
                  {Math.round((trade.buyprice - currentPrice) * 100) / 100}
                </div>
                <div>
                  {" "}
                  {trade.status === "buy" ? (
                    <button
                      onClick={() => handlesell(trade.id)}
                      className="bg-blue-500 px-4"
                    >
                      {" "}
                      Sell
                    </button>
                  ) : (
                    "Already Sold"
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pl-20 pt-8 flex gap-10">
        {currentPrice && <p>Current Price: {currentPrice}</p>}
        <div className="">
          <label htmlFor="quantity">Quantity:</label>
          <input
            className="border p-2 rounded-md mx-2 text-black"
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
          <button
            className="bg-blue-500 py-2 px-4 rounded-2xl"
            onClick={handleBuy}
          >
            Buy
          </button>
        </div>

        <div className=" h-48 flex flex-col whitespace-nowrap border text-sm p-2 bg-white/40 rounded-md">
        <div className="">Live Wallet Price: {zeta}</div>
          <div>Live Market</div>
          <div style={{ marginRight: 10 }}>OPEN: {candlePrice?.open}</div>
          <div style={{ marginRight: 10 }}>HIGH: {candlePrice?.high}</div>
          <div style={{ marginRight: 10 }}>LOW: {candlePrice?.low}</div>
          <div style={{ marginRight: 10 }}>CLOSE: {candlePrice?.close}</div>
          <div>VALUE: {linePrice?.value}</div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
