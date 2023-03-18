import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useContext } from 'react';
import useTitle from '../../../Components/useTitle';
import { AuthContext } from '../../../ContextApi/UserContext';
import AdvertisedChild from '../AdvertisedChild';
import Newsletter from '../Newsletter';

const SearchProduct = () => {
    useTitle("Search Result")
    const { user, searchProductText } = useContext(AuthContext)
    const { data: searchData = [], isLoading: searchDataLoading, refetch: searchDataRefetch } = useQuery({
        queryKey: ["search-text", searchProductText],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/search-text?searchText=${searchProductText}`)
            const data = await res.json()
            return data
        }
    })
    // console.log(searchData)
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <h1 className='p-2 text-2xl font-semibold mb-4 bg-[#F4F4F4]'>
                {searchData?.length} result found
            </h1>
            <div className='mb-14'>
                <div className='grid grid-cols-2 lg:grid-cols-5 lg:gap-7 gap-2'>
                    {
                        searchData.map(data => <AdvertisedChild
                            key={data._id}
                            data={data}
                        ></AdvertisedChild>)
                    }
                </div>
            </div>
            <div className='mt-24'>
                <Newsletter></Newsletter>
            </div>
        </div>
    );
};

export default SearchProduct;