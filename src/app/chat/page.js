"use client"
import Link from "next/link"

import React, { useRef, useState } from 'react';

import firebase from 'firebase/compat/app'; 

import 'firebase/compat/firestore';


import 'firebase/compat/auth';

import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCoRGW5KvJN5RH81ZKYM5wFyzpvyHn4j8M",
  authDomain: "zeta-chat-bb188.firebaseapp.com",
  projectId: "zeta-chat-bb188",
  storageBucket: "zeta-chat-bb188.appspot.com",
  messagingSenderId: "369991220620",
  appId: "1:369991220620:web:cd552194832079149f6aa9",
  measurementId: "G-8Q1ECJEH9Z"
})

const auth = firebase.auth();

const firestore = firebase.firestore();

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="px-4">
        <div className="chat-container ">
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
        </div>
        <form onSubmit={sendMessage} className="flex mt-4">
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" className="flex-grow bg-gray-800 text-white py-2 px-4 rounded-md mr-2 focus:outline-none focus:ring focus:ring-blue-400" />
            <button className="infield bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-blue-400" type="submit" disabled={!formValue}>Send</button>
        </form>
    </main>
  )
}


function ChatMessage(props) {
  const { text } = props.message;


  return (
    <div className="flex bg-white-400">
    <h6 className="float  text-blue-600 font-extrabold  ml-1">user :</h6>
    <div className={`message flex items-center bg-gray-800 border rounded-lg p-4 shadow-md mb-4 mx-10`}>
      <div className="float">
        
        <h6 className="float  text-yellow-300  ml-1"></h6>
        </div>
        <p className="text-gray-200">{text}</p>
    </div>
    </div>
  )
}

export default ChatRoom;
