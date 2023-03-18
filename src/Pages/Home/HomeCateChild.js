import React from 'react';
import { Link } from 'react-router-dom';

const HomeCateChild = ({ category }) => {
    // console.log(category)
    const { id, img, name } = category
    return (
        <Link to={`/productsByCatClick?category=${encodeURIComponent(category?.name)}`}>
            <div className='flex justify-center border  hover:border-amber-500'>
                <div>
                    <div >
                        <img className='h-[132px] w-[132px]' src={img} alt="" />
                    </div>
                    <div className='text-center pb-3'>
                        <p className='hover:text-[#0099CC] cursor-pointer font-medium'>{name}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HomeCateChild;