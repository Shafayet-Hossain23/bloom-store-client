import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../../Components/useTitle';
import { SiGoogle } from 'react-icons/si';
import { BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import LoadingElement from '../../../Components/LoadingElement';
import { useToken } from '../../../Components/useToken';
import { AuthContext } from '../../../ContextApi/UserContext';
import Newsletter from '../../Home/Newsletter';


const Login = () => {
    useTitle("Login")
    const { user, loginWithEmailPass, passwordReset, googleLoginPopUp } = useContext(AuthContext)
    const [pageLoader, setPageLoader] = useState(false)
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const [tokenEmail, setTokenEmail] = useState('')
    const token = useToken(tokenEmail)

    useEffect(() => {
        if (token) {
            setProcessing(false)
            setPageLoader(false)
            navigate(from, { replace: true });
        }
    }, [token])
    const loginHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        setProcessing(true)
        loginWithEmailPass(email, password)
            .then(result => {
                setTokenEmail(email)
                setPageLoader(true)

            })
            .catch(error => {
                const message = error.message
                setProcessing(false)
                toast.error(message)
            })

    }
    // ...
    const googleHandler = () => {

        googleLoginPopUp()
            .then(result => {
                const user = result.user
                setPageLoader(true)
                savedDataPopUp(user.displayName, user.email)
            })
            .catch(error => {
                const message = error.message
                toast.error(message)

            })
    }
    const savedDataPopUp = (name, email) => {
        const userInfo =
        {
            name,
            email,

        }
        fetch('https://bloom-store-server-shafayet-hossain23.vercel.app/users/popup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {

                // toast.success("successfully login")
                setTokenEmail(email)
            })
    }
    if (pageLoader === true) {
        return <LoadingElement></LoadingElement>
    }
    const popUpErrorHandler = () => {
        toast.error("Opp! Something went wrong. This feature has been updated later!")
    }
    return (
        <div>
            <div className='bg-[#F1F1F1] lg:py-14'>
                <div className='lg:w-2/6 mx-auto bg-white p-10 '>
                    <h1 className='text-center font-bold text-3xl py-5'>Login</h1>
                    <form onSubmit={loginHandler}>

                        <label>
                            <span className="text-sm font-medium text-slate-700">Email Address</span>

                            <input name='email' type="email" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required />
                        </label>
                        <label>
                            <span className="text-sm font-medium text-slate-700">Password</span>

                            <input name='password' type="password" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required />
                        </label>
                        {
                            processing ? <button className='border mt-7 w-full py-2 bg-[#b1b1b1] text-[#f9f9f9] font-bold' disabled>Login</button> : <button className='border mt-7 w-full py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Login</button>
                        }
                    </form>
                    <div className='mt-5'>
                        <p>New to the Website? <Link className='text-[#FCB800] font-semibold' to="/register">Register</Link></p>
                    </div>
                    <div className='mt-5 flex'>
                        <button onClick={googleHandler} className='border w-1/4 py-3 flex justify-center bg-[#DD4B39] text-white'><SiGoogle /></button>
                        <button onClick={popUpErrorHandler} className='border w-1/4 py-3 flex justify-center bg-[#3B5999] text-white'><FaFacebookF /></button>
                        <button onClick={popUpErrorHandler} className='border w-1/4 py-3 flex justify-center bg-[#E4405F] text-white'><FaInstagram /></button>
                        <button onClick={popUpErrorHandler} className='border w-1/4 py-3 flex justify-center bg-[#55ACEE] text-white'><BsTwitter /></button>
                    </div>
                </div>
            </div>
            <div className='my-10 mx-7'>
                <Newsletter></Newsletter>
            </div>
            {/* <Toaster
                position="top-right"
                reverseOrder={false}
            /> */}
        </div>
    );
};

export default Login;