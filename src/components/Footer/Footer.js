import React from 'react';
import Image from 'next/image';
import { AppContext } from "../AppContext/AppContext";
import { useContext } from "react";
import Link from 'next/link';

const Footer = () => {
    const { theme, settheme } = useContext(AppContext);

    return (
        <footer className={`bg-${theme}bg text-${theme}txt py-4 `}>
            <div className='grid grid-cols-1 mf:grid-cols-3 lg:grid-cols-4 px-10 py-8'>
                <div className='flex col-span-2	 flex-col items-center justify-center'>
                    <Image src="/Newlogo.png" alt="logo2" width={100} height={100} />
                    <h1>TRADE IN</h1>
                </div>
                <div  className='flex flex-col'>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
                </div>
                <div  className='flex flex-col'>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
                </div>
            </div>
            <div className="container mx-auto flex justify-center mt-2">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Tradein. All rights reserved.
                </p>
            </div>
        </footer>
    );
};


export default Footer;