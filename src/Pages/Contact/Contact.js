import React from 'react';
import useTitle from '../../Components/useTitle';
import Newsletter from '../Home/Newsletter';

const Contact = () => {
    useTitle("Contact")
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div>
                <h1 className='p-2 text-2xl font-semibold mb-4 bg-[#F4F4F4]'>
                    Contact Us For Any Questions
                </h1>
            </div>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-24 my-20 mx-[10%] mb-14'>
                <div className='text-center'>
                    <h1 className='font-semibold text-2xl'>Contact Directly</h1>
                    <p className='mt-5'>bloomstore001@gmail.com</p>
                    <p>+880 01920806399</p>
                </div>
                <div className='text-center'>
                    <h1 className='font-semibold text-2xl'>Head Quater</h1>
                    <p className='mt-5'>Mirzapur, Mohadevpur, Naogaon</p>
                    <p>Dhaka, Bangladesh</p>
                </div>
                <div className='text-center'>
                    <h1 className='font-semibold text-2xl'>Work With Us</h1>
                    <p className='mt-5'>Send your CV to our email:</p>
                    <p>bloomstore001@gmail.com</p>
                </div>
                <div className='text-center'>
                    <h1 className='font-semibold text-2xl'>Customer Service</h1>
                    <p className='mt-5'>bloomstore001@gmail.com</p>
                    <p>+880 01920806399</p>
                </div>
                <div className='text-center'>
                    <h1 className='font-semibold text-2xl'>Media Relations</h1>
                    <p className='mt-5'>bloomstore001@gmail.com</p>
                    <p>+880 01920806399</p>
                </div>
                <div className='text-center'>
                    <h1 className='font-semibold text-2xl'>Vendor Support</h1>
                    <p className='mt-5'>bloomstore001@gmail.com</p>
                    <p>+880 01920806399</p>
                </div>
            </div>
            <div className='mt-24'>
                <Newsletter></Newsletter>
            </div>
        </div>
    );
};

export default Contact;