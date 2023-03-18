import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Slider from 'react-slick';
import AdvertisedChild from './AdvertisedChild';
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

const AdvertisedProducts = () => {
    const { data: advertisedData = [], isLoading: advertisedLoading, refetch: advertisedRefetch } = useQuery({
        queryKey: ["advertised-products"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/advertised-products`)
            const data = await res.json()
            return data
        }
    })
    // console.log(advertisedData)
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='mt-4'>
            <h1 className='p-2 text-2xl font-semibold mb-4 bg-[#F4F4F4]'>Advertised Products</h1>
            <div className='lg:hidden block'>
                <div className='grid grid-cols-2 lg:gap-7 gap-2'>
                    {
                        advertisedData.map(data => <AdvertisedChild
                            key={data._id}
                            data={data}
                        ></AdvertisedChild>)
                    }
                </div>
            </div>
            <div className='hidden lg:block'>
                <Slider {...settings}>
                    {
                        advertisedData.map(data => <AdvertisedChild
                            key={data._id}
                            data={data}
                        ></AdvertisedChild>)
                    }
                </Slider>
            </div>

        </div>
    );
};

export default AdvertisedProducts;
