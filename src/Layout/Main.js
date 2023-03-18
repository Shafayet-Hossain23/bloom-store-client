import React from 'react';
import { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../Components/ScrollToTop';
import { AuthContext } from '../ContextApi/UserContext';
import SearchProduct from '../Pages/Home/SearchProduct/SearchProduct';
import Footer from '../Pages/SharedPages/Footer/Footer';

import Header from '../Pages/SharedPages/Header/Header';

const Main = () => {
    // const { user, searchProductText } = useContext(AuthContext)
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Header></Header>
            <div className=''>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default Main;