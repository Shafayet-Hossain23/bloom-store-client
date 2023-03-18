import React from 'react';
import useTitle from '../../Components/useTitle';
import AdvertisedProducts from './AdvertisedProducts';
import FreeDelivery from './FreeDelivery';
import HomeBannerBottom from './HomeBannerBottom';
import HomeBannerMid from './HomeBannerMid';
import HomeCarousel from './HomeCarousel';
import HomeCategories from './HomeCategories';
import Newsletter from './Newsletter';
import TopRated from './TopRated';
import { toast, Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../ContextApi/UserContext';
import SearchProduct from './SearchProduct/SearchProduct';


const Home = () => {
    useTitle("Home")
    const { user, searchProductText } = useContext(AuthContext)
    // console.log(searchProductText)
    return (
        <div>
            <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
                {/* {
                    searchProductText && <SearchProduct></SearchProduct>
                } */}
                <HomeCarousel></HomeCarousel>
                <FreeDelivery></FreeDelivery>
                <HomeCategories></HomeCategories>
                <HomeBannerMid></HomeBannerMid>
                <AdvertisedProducts></AdvertisedProducts>
                <HomeBannerBottom></HomeBannerBottom>
                <TopRated></TopRated>
                <Newsletter></Newsletter>
            </div>
            {/* <Toaster
                position="top-right"
                reverseOrder={false}
            /> */}
        </div>
    );
};

export default Home;