import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeCarousel = () => {
    return (
        <div className='lg:flex gap-8'>
            <div className='lg:w-2/3'>
                <Carousel showThumbs={false} autoPlay infiniteLoop={true}>
                    <div>
                        <img className='lg:h-[410px]' src="https://beta.apinouthemes.com/uploads/slide_3_1fcb990278.jpeg" alt='' />

                    </div>
                    <div>
                        <img className='lg:h-[410px]' src="https://beta.apinouthemes.com/uploads/slide_3_1fcb990278.jpeg" alt='' />

                    </div>
                    <div>
                        <img className='lg:h-[410px]' src="https://beta.apinouthemes.com/uploads/slide_3_1fcb990278.jpeg" alt='' />
                    </div>
                </Carousel>
            </div>
            <div className='hidden lg:block'>
                <div>
                    <img src="https://beta.apinouthemes.com/uploads/promotion_1_d6deb591f0.jpeg" alt="" />
                </div>
                <div className='mt-8'>
                    <img src="https://beta.apinouthemes.com/uploads/promotion_2_d252453586.jpeg" alt="" />
                </div>
            </div>
            <div className='lg:hidden flex gap-3 mt-3'>
                <div>
                    <img src="https://beta.apinouthemes.com/uploads/promotion_1_d6deb591f0.jpeg" alt="" />
                </div>
                <div className=''>
                    <img src="https://beta.apinouthemes.com/uploads/promotion_2_d252453586.jpeg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default HomeCarousel;