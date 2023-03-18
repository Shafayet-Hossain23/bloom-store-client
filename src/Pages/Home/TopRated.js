import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertisedChild from './AdvertisedChild';

const TopRated = () => {
    const { data: topRatedData = [], isLoading: topRatedLoading, refetch: topRatedRefetch } = useQuery({
        queryKey: ["top-rated"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/top-rated`)
            const data = await res.json()
            return data
        }
    })
    // console.log(topRatedData)
    return (
        <div className='mt-4'>
            <h1 className='p-2 text-2xl font-semibold mb-4 bg-[#F4F4F4]'>Top Rated Products</h1>
            <div className=''>
                <div className='grid grid-cols-2 lg:grid-cols-5 gap-7'>
                    {
                        topRatedData.map(data => <AdvertisedChild
                            key={data._id}
                            data={data}
                        ></AdvertisedChild>)
                    }
                </div>
            </div>
        </div>
    );
};

export default TopRated;