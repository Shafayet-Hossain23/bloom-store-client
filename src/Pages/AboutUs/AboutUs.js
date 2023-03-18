import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
// image import
import html from '../../assets/technologies/html.png';
import css from '../../assets/technologies/css.png';
import bootstrap from '../../assets/technologies/bootstrap.png';
import tailwind from '../../assets/technologies/tailwind.png';
import javaScript from '../../assets/technologies/js-1.png';
import react from '../../assets/technologies/reactJs.png';
import daisy from '../../assets/technologies/daisyui.png';
import node from '../../assets/technologies/nodeJs.png';
import express from '../../assets/technologies/expressJs.png';
import mongodb from '../../assets/technologies/mongodb.png';
import firebase from '../../assets/technologies/firebase.png';
import gitHub from '../../assets/technologies/git-1.png';
import netlify from '../../assets/technologies/netlify.png'
import TechnologyChild from './TechnologyChild';
import Newsletter from '../Home/Newsletter';
import useTitle from '../../Components/useTitle';


const AboutUs = () => {
    useTitle("About")
    const technologies = [
        {
            id: 1,
            name: "HTML",
            img: html
        },
        {
            id: 2,
            name: "CSS",
            img: css
        },
        {
            id: 3,
            name: "Bootstrap",
            img: bootstrap
        },
        {
            id: 4,
            name: "Tailwind",
            img: tailwind
        },
        {
            id: 5,
            name: "Java Script",
            img: javaScript,

        },
        {
            id: 6,
            name: "React Js",
            img: react
        },
        {
            id: 7,
            name: "daisyUI",
            img: daisy
        },
        {
            id: 8,
            name: "Node.Js",
            img: node
        },
        {
            id: 9,
            name: "Express.Js",
            img: express
        },
        {
            id: 10,
            name: "MongoDB",
            img: mongodb
        },
        {
            id: 11,
            name: "Firebase",
            img: firebase
        },
        // {
        //     id: 12,
        //     name: "Git Hub",
        //     img: gitHub,
        //     bg: "bg-white"

        // },
        {
            id: 13,
            name: "Netlify",
            img: netlify
        },
    ]
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div>
                <h1 className='p-2 text-2xl font-semibold mb-4 bg-[#F4F4F4]'>
                    Team Members
                </h1>
            </div>
            <div className='lg:mt-10 lg:flex gap-10 lg:mx-12'>
                <div className='bg-[#F4F4F4] p-14 hover:border rounded-md border-[#FCB800]'>
                    <div className="avatar">
                        <div className="w-56 rounded-full ring ring-amber-500 ring-offset-base-100 ring-offset-2">
                            <img src="https://i.ibb.co/0B89STV/1679067875487-1.jpg" alt='' />
                        </div>
                    </div>
                    <div className='text-center mt-3'>
                        <h1 className='font-semibold'>Ahshan Habib Atik</h1>

                        <h1 className='font-semibold text-amber-500'>Chief Executive Officer</h1>
                        <h1 className='font-semibold'>1902037@icte.bdu.ac.bd</h1>
                        <div className='flex justify-center mt-3'>
                            <div className=''>
                                <FaFacebookF size={17} />
                            </div>
                            <div className='mx-7'>
                                <HiOutlineMail size={20} />
                            </div>
                            <div>
                                <FiTwitter size={20} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-[#F4F4F4] p-14 hover:border rounded-md border-amber-500 lg:mt-0 mt-3'>
                    <div className="avatar">
                        <div className="w-56 rounded-full ring ring-amber-500 ring-offset-base-100 ring-offset-2">
                            <img src="https://scontent.fdac8-1.fna.fbcdn.net/v/t39.30808-6/324092040_703972841397180_2373672282897016585_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=Ufjcr7_K3QkAX98Nwy2&_nc_ht=scontent.fdac8-1.fna&oh=00_AfCNw8teKyPe_5LQFcCOA9FyJTGO0x-iecOhgt4Wx4MZ7A&oe=641A31D7" alt='' />
                        </div>
                    </div>
                    <div className='text-center mt-3'>
                        <h1 className='font-semibold'>Ahsanul Touhid Sarkar</h1>

                        <h1 className='font-semibold text-amber-500'>Manager</h1>
                        <h1 className='font-semibold'>1902036@icte.bdu.ac.bd</h1>
                        <div className='flex justify-center mt-3'>
                            <div className=''>
                                <FaFacebookF size={17} />
                            </div>
                            <div className='mx-7'>
                                <HiOutlineMail size={20} />
                            </div>
                            <div>
                                <FiTwitter size={20} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-[#F4F4F4] p-14 hover:border rounded-md border-amber-500 lg:mt-0 mt-3'>
                    <div className="avatar">
                        <div className="w-56 rounded-full ring ring-amber-500 ring-offset-base-100 ring-offset-2">
                            <img src="https://scontent.fdac8-1.fna.fbcdn.net/v/t39.30808-6/283302131_3288601581464811_4378610167583572187_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=M3J1bOiAcu8AX_QpQ-b&_nc_ht=scontent.fdac8-1.fna&oh=00_AfDMJUjEXeSPa2EHxgZ4yQ5O9_-PKo-SQAr_CQjGXCe9GQ&oe=64188ECD" alt='' />
                        </div>
                    </div>
                    <div className='text-center mt-3'>
                        <h1 className='font-semibold'>Md.Shafayet Hossain</h1>

                        <h1 className='font-semibold text-amber-500'>Employee</h1>
                        <h1 className='font-semibold'>1902023@icte.bdu.ac.bd</h1>
                        <div className='flex justify-center mt-3'>
                            <div className=''>
                                <FaFacebookF size={17} />
                            </div>
                            <div className='mx-7'>
                                <HiOutlineMail size={20} />
                            </div>
                            <div>
                                <FiTwitter size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12'>
                <h1 className='p-2 text-2xl font-semibold mb-4 bg-[#F4F4F4]'>
                    Technology Used
                </h1>
                <div className='lg:mt-14 mt-7 grid lg:grid-cols-4 grid-cols-2 lg:gap-20 gap-14 mb-14'>
                    {
                        technologies.map(technology => <TechnologyChild
                            key={technology.id}
                            technology={technology}
                        ></TechnologyChild>)
                    }
                </div>
            </div>
            <div className='lg:mt-28 mt-20'>
                <Newsletter></Newsletter>
            </div>
        </div>
    );
};

export default AboutUs;