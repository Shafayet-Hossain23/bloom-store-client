import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import { Link, useLocation } from 'react-router-dom';
import LoadingElement from '../../Components/LoadingElement';
import useTitle from '../../Components/useTitle';
import AdvertisedChild from '../Home/AdvertisedChild';
import Newsletter from '../Home/Newsletter';

const ProductsByCatClick = () => {
    useTitle("Shop")
    const search = useLocation().search;
    const category = new URLSearchParams(search).get("category");
    // console.log(category)
    const { data: catData = [], isLoading: catDataLoading, refetch: catDataRefetch } = useQuery({
        queryKey: ["getDataByCat", category],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/getDataByCat?category=${encodeURIComponent(category)}`)
            const data = await res.json()
            return data
        }
    })
    // console.log(catData)
    if (catDataLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div>
                <Carousel showThumbs={false} autoPlay infiniteLoop={true}>
                    <div>
                        <img className='lg:h-[350px] h-[180px]' src="https://beta.apinouthemes.com/uploads/slide_3_1fcb990278.jpeg" alt='' />

                    </div>
                    <div>
                        <img className='lg:h-[350px] h-[180px]' src="https://reactstorefronts.com/static/img/slider/shop-default/2.jpg" alt='' />

                    </div>

                </Carousel>
            </div>
            <div className='my-14 lg:flex gap-10'>
                <div className='lg:w-1/5 hidden lg:block bg-[#F5F5F5] p-5 h-[450px]'>
                    <h1 className='font-semibold mb-7'>CATEGORIES</h1>
                    <ul>
                        <li className='my-3'>
                            <Link className='hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Clothing & Apparel")}`}>Clothing & Apparel</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Garden & Kitchen")}`}>Garden & Kitchen</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Consumer Electrics")}`}>Consumer Electrics</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Health & Beauty")}`}>Health & Beauty</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Computers & Technologies")}`}>Computers & Technologies</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Jewelry & Watches")}`}>Jewelry & Watches</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Phone & Accessories")}`}>Phone & Accessories</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Sport & Outdoor")}`}>Sport & Outdoor</Link>
                        </li>
                        <li className='my-3'>
                            <Link className=' hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent("Fruits")}`}>Fruits</Link>
                        </li>
                    </ul>
                </div>
                <div className='lg:w-4/5'>
                    <h1 className='p-2 text-2xl font-medium mb-4 bg-[#F4F4F4]'>{category} <span className='font-normal text-sm'>{catData?.length} Products found</span></h1>
                    <div className='grid grid-cols-2 lg:grid-cols-3 lg:gap-7 gap-2'>
                        {
                            catData?.map(data => <AdvertisedChild
                                key={data._id}
                                data={data}
                            ></AdvertisedChild>)
                        }
                    </div>
                </div>
            </div>
            <div className='my-24'>
                <Newsletter></Newsletter>
            </div>
            {/* <Toaster
                position="top-right"
                reverseOrder={false}
            /> */}
        </div>
    );
};

export default ProductsByCatClick;