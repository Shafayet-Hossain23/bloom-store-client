import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { app } from '../Firebase/firebase.config';

export const AuthContext = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const UserContext = ({ children }) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    // search product 
    const [searchProductText, setSearchProductText] = useState("")
    const registerWithEmailPass = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginWithEmailPass = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const profileUpdate = (name) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    const googleLoginPopUp = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const emailVerification = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    const passwordReset = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currenUser => {
            setUser(currenUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
    const userInfo = {
        user,
        setLoading,
        loading,
        registerWithEmailPass,
        loginWithEmailPass,
        profileUpdate,
        googleLoginPopUp,
        emailVerification,
        logOut,
        passwordReset,
        searchProductText,
        setSearchProductText
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;