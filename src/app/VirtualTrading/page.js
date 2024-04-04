"use client";
import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Chart from './Chart'
import { AppContext } from "../../components/AppContext/AppContext";
import { useContext } from "react";
import Footer from '@/components/Footer/Footer';

const page = () => {
  const { theme, settheme } = useContext(AppContext);

  return (
    <div>
      <Navbar></Navbar>
      <div className={`pt-36 bg-${theme}bg text-${theme}txt min-h-screen`}>
      <Chart></Chart>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default page
