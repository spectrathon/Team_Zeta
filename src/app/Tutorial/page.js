import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import TradingViewWidget from '../Widgets/Chart'
const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <TradingViewWidget/>
    </div>
  )
}

export default page
