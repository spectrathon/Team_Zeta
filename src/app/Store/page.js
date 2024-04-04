"use client"
import React from 'react';
import Image from 'next/image';
import Pile from '../../assets/pile.jpeg';
import Chest from '../../assets/chest.jpeg';
import Bag from '../../assets/bag.jpeg';
import Shower from '../../assets/shower.jpeg';
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';



const Main = () => {
    return (
        <>
        <Navbar></Navbar>
        <div className="flex flex-col items-center justify-center pt-32">
            <h1 className="text-5xl font-bold">Store Offers</h1>
            <div className=" justify-center mt-8">
                <div className="flex  justify-center">
                    <div className="w-64 h-64 border2  mx-10 my-10">
                        <div>
                            <Image src={Pile}></Image>
                        </div>
                        <div >
                            <p className='text-center my-2 border border-solid border-black-400'>Pile Of ZetaCoins</p>
                            <p className='text-center my-2 border border-solid border-black-400'>10000 Zeta Coins</p>
                            <div  className='text-center my-2 border border-solid border-black-400' >
                            <button>₹10</button>
                            </div>
                        </div>



                    </div>
                    <div className="w-64 h-64 border2  mx-10 my-10">
                        <div>
                            <Image src={Chest}></Image>
                        </div>
                        <div >
                            <p className='text-center my-2 border border-solid border-black-400'>Pile Of ZetaCoins</p>
                            <p className='text-center my-2 border border-solid border-black-400'>10000 Zeta Coins</p>
                            <div  className='text-center my-2 border border-solid border-black-400' >
                            <button>₹10</button>
                            </div>
                        </div>


                    </div>
                    <div className="w-64 h-64 border2  mx-10 my-10">
                        <div>
                            <Image src={Bag}></Image>
                        </div>
                        <div >
                            <p className='text-center my-2 border border-solid border-black-400'>Pile Of ZetaCoins</p>
                            <p className='text-center my-2 border border-solid border-black-400'>100000 Zeta Coins</p>
                            <div  className='text-center my-2 border border-solid border-black-400' >
                            <button>₹10</button>
                            </div>
                        </div>


                    </div>

                </div>
                <div className="flex  justify-center my-20">
                    <div className="w-64 h-64 border2  mx-10 my-10">
                        <div>
                            <Image src={Shower}></Image>
                        </div>
                        <div >
                            <p className='text-center my-2 border border-solid border-black-400'>Pile Of ZetaCoins</p>
                            <p className='text-center my-2 border border-solid border-black-400'>1000000 Zeta Coins</p>
                            <div  className='text-center my-2 border border-solid border-black-400' >
                            <button>₹10</button>
                            </div>
                        </div>



                    </div>


                </div>


            </div>

        </div>
      
        </>
    );
};


export default Main;