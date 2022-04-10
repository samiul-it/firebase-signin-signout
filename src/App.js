import './App.css';
import app from './firebase_init';
import {getAuth, GithubAuthProvider} from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth=getAuth(app);

function App() {
  const [user,setUser]=useState({});
  const providerGoogle = new GoogleAuthProvider();
  const providerGithub=new GithubAuthProvider();
  const signInWithGoogle=()=>{
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const user=result.user;
        // console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const signInWithGithub=()=>{
    signInWithPopup(auth,providerGithub)
    .then((result)=>{
      const user=result.user;
      setUser(user);
    })
    .catch((error)=>{
      console.error(error);
    })
  }


  const signOutHandler=()=>{
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser({});
        console.log("Sign Out");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="App">
      <h1>Firebase Authentication</h1>
      <button onClick={signInWithGoogle}>Sign in With Google</button>
      <button onClick={signInWithGithub}>Sign in With Github</button>
      <button onClick={signOutHandler}>Sign Out</button>

      <h2>Name:{user.displayName}</h2>
      <p>Email:{user.email}</p>
      
    </div>
  );
}

export default App;
