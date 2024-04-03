'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '@/app/db.js';
import { collection, addDoc } from 'firebase/firestore';
import React from 'react';

async function addDataToFireStore(name, username, email, password) {
  try {
    const docRef = await addDoc(collection(db, "User Info"), {
      name: name,
      email: email,
      username: username,
      password: password,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [createUserWithEmailAndPassword, createUserLoading, createUserError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    try {
      if (createUserLoading) {
        // Show a loading indicator while creating user
        return;
      }
      if (createUserError) {
        // Handle sign-up errors
        console.error(createUserError);
        return;
      }

      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');

      const added = await addDataToFireStore(name, username, email, password);
      if (added) {
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');

        alert(added);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignIn = () => {
    // Redirect to sign-in page using Next.js router
    window.location.href = '/sign-in';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
        <button onClick={handleSignIn} className="w-full p-3 mt-2 bg-gray-600 rounded text-white hover:bg-gray-700">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;