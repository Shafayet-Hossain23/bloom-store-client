import React from 'react';
import { IoIosRocket } from 'react-icons/io';
import { BiRocket, BiSupport } from 'react-icons/bi';
import { BsRecycle, BsGift } from 'react-icons/bs';
import { AiOutlineCreditCard } from 'react-icons/ai';


const FreeDelivery = () => {
    return (
        <div className='mt-7 lg:flex justify-between border p-7 lg:mx-0 '>
            <div>
                <BiRocket size="35px" className='text-[#FCB800]' />
                <div className='mt-3'>
                    <h1 className='font-semibold'>Free Delivery</h1>
                    <p>For all orders over $99</p>
                </div>
            </div>
            <div className='mt-7 lg:mt-0'>
                <BsRecycle size="35px" className='text-[#FCB800]' />
                <div className='mt-3'>
                    <h1 className='font-semibold'>90 Days Return</h1>
                    <p>If goods have problems</p>
                </div>
            </div>
            <div className='mt-7 lg:mt-0'>
                <AiOutlineCreditCard size="35px" className='text-[#FCB800]' />
                <div className='mt-3'>
                    <h1 className='font-semibold'>Secure Payment</h1>
                    <p>100% secure payment</p>
                </div>
            </div>
            <div className='mt-7 lg:mt-0'>
                <BiSupport size="35px" className='text-[#FCB800]' />
                <div className='mt-3'>
                    <h1 className='font-semibold'>24/7 Support</h1>
                    <p>Dedicated support</p>
                </div>
            </div>
            <div className='mt-7 lg:mt-0'>
                <BsGift size="35px" className='text-[#FCB800]' />
                <div className='mt-3'>
                    <h1 className='font-semibold'>Gift Service</h1>
                    <p>Support gift service</p>
                </div>
            </div>

        </div>
    );
};

export default FreeDelivery;