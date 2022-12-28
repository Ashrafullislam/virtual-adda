import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updateProfile } from "firebase/auth";
import app from './../Firebase/Firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true);
    const [user,setUser]  = useState(null);
 

 // create user by email and password 
 const createUser = (email,password) =>  {
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
 }

 // create  user by google 
 const GoogleLogIn = (provider) => {
    setLoading(true)
    return signInWithPopup(auth,provider)
 }

 // loginuser by email and password 
 const LogInUser = (email,password) => {
    setLoading(true)
   return signInWithEmailAndPassword(auth,email,password)
 }

// LogOut 
const LogOut = () =>  {
    setLoading(true)
    return signOut(auth)
}

// send email for verification  user 
const VerifyUser = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
}

// send password reset email 
const PasswordReset = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth,email)
}

// update user name 
const UpdateUser = (userInfo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, userInfo)
}

// update user email 
const UpdateUserEmail = (userEmail) => {
    setLoading(true)
    return updateEmail(auth.currentUser,userEmail)
}

useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth,currentUser=> {
        setUser(currentUser)
        setLoading(false);
         // the condition work  properly to verify user and access  to login 

        // if(currentUser.emailVerified){
        //     setUser(currentUser)

        // }
        //  if (!currentUser.emailVerified) { 
          
        //     setUser({})
          
        // }
        
    })
    return ()=> unsubscribe()  ;
},[])

const userAuth = {
    user,
    loading,
    createUser,
    GoogleLogIn,
    LogInUser,
    LogOut,
    VerifyUser,
    PasswordReset,
    UpdateUser,
    UpdateUserEmail
}

return (
    <AuthContext.Provider  value={userAuth} > 
        {children}
    </AuthContext.Provider>
)

};

export default AuthProvider;