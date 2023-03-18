import React, { useContext, useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import LoadingElement from '../../../Components/LoadingElement';

import useTitle from '../../../Components/useTitle';
import { useToken } from '../../../Components/useToken';
import { AuthContext } from '../../../ContextApi/UserContext';
import Newsletter from '../../Home/Newsletter';



const Register = () => {
    useTitle("Register")
    const { registerWithEmailPass, setLoading, profileUpdate } = useContext(AuthContext)
    const [error, setError] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [pageLoader, setPageLoader] = useState(false)
    const [userCreatedEmail, setUserCreatedEmail] = useState('')
    const navigate = useNavigate()
    const token = useToken(userCreatedEmail)
    useEffect(() => {
        if (token) {
            navigate('/')
            setProcessing(false)
            setPageLoader(false)
        }
    }, [token])
    const registerFormHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        // console.log(name, email, password)
        setError('')
        setProcessing(true)

        registerWithEmailPass(email, password)
            .then(result => {
                // const user = user.result
                profileUpdate(name)
                    .then(result => {
                        saveUserData(name, email)
                        setPageLoader(true)
                    })

            })
            .catch(error => {
                const message = error.message
                // setError(message)
                toast.error(message)
                setProcessing(false)

            })
    }
    const saveUserData = (name, email) => {
        const userInfo = {
            name,
            email,
            // status: "admin"
        }
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setUserCreatedEmail(email)
                    setLoading(false)
                    // console.log(data)
                }
            })
    }
    if (pageLoader === true) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div>
            <div className='bg-[#F1F1F1] lg:py-14 '>
                <div className='lg:w-2/6 mx-auto bg-white p-10 '>
                    <h1 className='text-center font-bold text-3xl py-5'>Register</h1>
                    <form onSubmit={registerFormHandler}>
                        <label>
                            <span className="text-sm font-medium text-slate-700">Username</span>

                            <input name='name' type="text" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required />
                        </label>
                        <label>
                            <span className="text-sm font-medium text-slate-700">Email Address</span>

                            <input name='email' type="email" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required />
                        </label>
                        <label>
                            <span className="text-sm font-medium text-slate-700">Password</span>

                            <input name='password' type="password" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required />
                        </label>
                        {
                            processing ? <button className='border mt-7 w-full py-2 bg-[#b1b1b1] text-[#f9f9f9] font-bold' disabled>Register</button> : <button className='border mt-7 w-full py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Register</button>
                        }

                    </form>
                    <div className='mt-5'>
                        <p>Already have an account? <Link className='text-[#FCB800] font-semibold' to="/login">Login</Link></p>
                    </div>
                </div>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className='my-10 mx-7'>
                <Newsletter></Newsletter>
            </div>
        </div>
    );
};

export default Register;