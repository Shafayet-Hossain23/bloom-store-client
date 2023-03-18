import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../ContextApi/UserContext';
import './ErrorElement.css'

const ErrorElement = () => {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const logOutHandler = () => {

        logOut()
            .then(() => {
                navigate('/')


            })
            .catch(error => {
                // console.log(error.message)

            })

    }
    const goHomeHandler = () => {
        return navigate('/')
    }
    return (
        <div className='bodyStyle'>
            <div className="ErrorContainer">

                <div className="error">
                    <p className="p">4</p>
                    <span className="dracula">
                        <div className="con">
                            <div className="hair"></div>
                            <div className="hair-r"></div>
                            <div className="head"></div>
                            <div className="eye"></div>
                            <div className="eye eye-r"></div>
                            <div className="mouth"></div>
                            <div className="blod"></div>
                            <div className="blod blod2"></div>
                        </div>
                    </span>
                    <p className="p">4</p>

                    <div className="page-ms">
                        <p className="page-msg"> Oops, the page you're looking for Disappeared </p>
                        {
                            user ? <button onClick={logOutHandler} className="go-back buttonStyle">Log Out</button> : <button onClick={goHomeHandler} className="go-back buttonStyle">Home</button>
                        }
                    </div>
                </div>
            </div>
            {/* <Toaster></Toaster> */}

            {/* <iframe style="width:0;height:0;border:0; border:none;" scrolling="no" frameborder="no" allow="autoplay" src="https://instaud.io/_/2Vvu.mp3"></iframe> */}
        </div>

    );
};

export default ErrorElement;