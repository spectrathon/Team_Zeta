"use client";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import TradingViewWidget from "../app/Widgets/Chart"
// import { AppContext } from '@/components/AppContext/AppContext'
import { AppContext } from "../components/AppContext/AppContext";
import { useContext } from "react";
import AprilSeason from "../assets/AprilSeason.jpeg";
import EarlyBird from "../assets/EarlyBird.jpeg";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
// import { Environment, OrbitControls } from "@react-three/drei";
// import { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import Scene from "./Scene.jsx"

export default function Home() {
  const { theme, settheme } = useContext(AppContext);
  return (
    <main>
      <Navbar></Navbar>
      <div className={`pt-32  bg-${theme}bg  text-${theme}txt`} >
      <div className=' lg:px-24 object-cover mb-10 w-full '>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        // onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
       <SwiperSlide>
  <Image src="/april.jpeg" alt="April Season" width={1000} height={1000} />
</SwiperSlide>
<SwiperSlide>
  <Image src={EarlyBird} alt="Early Bird" />
</SwiperSlide>


        {/* <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div> */}
      </Swiper>
    </div>

<div>
{/* <div className="h-52 max-w-[80%] lg:h-[500px] lg:w-[500px] ">
        <Canvas>
          <ambientLight />
          <Suspense fallback={null}>
            <OrbitControls autoRotate autoRotateSpeed={10} />
            <Scene />
          </Suspense>
        </Canvas>
      </div> */}
</div>

    {/* <h1 className="text-center text-blue-500 text-2xl font-bold">Tradein</h1> */}
    <p className="text-center px-4 lg:px-32"> Welcome to the ultimate virtual trading experience! Immerse yourself in our interactive platform where learning and earning go hand-in-hand. Dive into our comprehensive tutorials, master the art of trading, and collect badges to showcase your achievements. Connect with a vibrant community of enthusiasts, engage in exhilarating challenges, and transform your skills into success. Our integrated store offers exclusive rewards, making your journey not just educational, but also rewarding. Join us and turn your trading aspirations into reality, all while having a blast! Let the adventure begin!</p>

    <div className="spacer bg"></div>
      <div className={`pt-10 flex flex-col items-center justify-center w-full p-4 lg:p-10 bg-[#0066FF]`}>
     <TradingViewWidget className=""></TradingViewWidget>
      </div>
      <div className="bg2"></div>

 



      <div className={`px-4 bg-${theme}bg lg:px-24 py-10 `}>
      <Accordion className={`bg-${theme}bg text-${theme}txt`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
         What is Paper Trading?
        </AccordionSummary>
        <AccordionDetails>
        Paper trading is a simulated form of trading that allows beginners to practice on a virtual trading platform without using real money. It's essentially a stock market simulator where you can hone your skills before stepping into the real trading world.
        </AccordionDetails>
      </Accordion>
      <Accordion  className={`bg-${theme}bg text-${theme}txt`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
         Is paper trading on TradeIn free?
        </AccordionSummary>
        <AccordionDetails>
        Yes, paper trading on TradeIn is completely free. It allows you to practice trading without any charges.
        </AccordionDetails>
      </Accordion >
      <Accordion  className={`bg-${theme}bg text-${theme}txt`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Real trading has an impact whereas trading with virtual money may not influence the market, will that give a real-time experience?
        </AccordionSummary>
        <AccordionDetails>
        Yes, you will get the real-time experience as our platform executes orders based on actual Offer and Bid prices running in the live market. Only the money that you would use is virtual.
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
      <Footer></Footer>
    </main>
  );
}
