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
// const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">

        <header>
        <SignOut />

        </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (<><div className="flex flex-col items-center justify-center h-screen">
  <button className= "sign-in bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" onClick={signInWithGoogle}>
    Sign in with Google
  </button>
  <p className="text-gray-600 mt-4">
    Do not violate the community guidelines or you will be banned for life!
  </p>
</div></>
  )

}

function SignOut() {
  return auth.currentUser && (
    <div className="flex flex-col items-center h-screen">
    <button className="sign-out bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" onClick={() => auth.signOut()}>Sign Out</button></div>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button className="infield" type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass} flex items-center bg-white border rounded-lg p-4 shadow-md mx-10`}>
      <img
        src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}
        className="w-12 h-12 rounded-full object-cover mr-4"
        alt="User"
      />
      <p className="text-gray-800">{text}</p>
    </div>
  </>)
}


export default App;