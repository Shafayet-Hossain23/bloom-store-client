import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import LoadingElement from '../../Components/LoadingElement';
import useTitle from '../../Components/useTitle';
import { AuthContext } from '../../ContextApi/UserContext';
import Newsletter from '../Home/Newsletter';

const Wishlist = () => {
    useTitle("wishlist")
    const { user } = useContext(AuthContext)
    const { data: wishData = [], isLoading: wishLoading, refetch: wishRefetch } = useQuery({
        queryKey: ["get-wish"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/get-wish?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(wishData)
    const wishHandler = (data) => {
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/delete-from-wishlist?id=${data._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    toast.success("Successfully delete this product from wishlist")
                    wishRefetch()
                }
            })
    }
    if (wishLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7  mx-2 '>
            <div className='text-center my-14'>
                <h1 className='font-bold text-3xl'>Wishlist </h1>
            </div>
            {
                wishData?.length > 0 ? < div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>

                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Order Now</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                wishData.map((data, i) => <tr
                                    key={data?._id}
                                // className="hover"
                                >
                                    <td>
                                        <img className='h-[80px] w-[80px]' src={data?.images[0]} alt="" />
                                    </td>
                                    <td>
                                        <Link className='hover:text-amber-500' to={`/productDetails?id=${data?.productId}`}>
                                            {data?.productName}</Link>
                                    </td>
                                    <td className='font-semibold'>{data?.price} /-</td>
                                    <td>
                                        <Link to={`/orderNow?id=${data?.productId}`}>
                                            <button className='border w-28 p-2 bg-[#00c52e] font-semibold hover:bg-black hover:text-white '>Order Now</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => wishHandler(data)} className='rounded-full bg-amber-500  p-2 hover:bg-red-500'>
                                            <MdDelete className='text-white' />
                                        </button>
                                    </td>
                                </tr>)
                            }


                            {/* row 3 */}

                        </tbody>
                    </table>
                </div> :
                    <div className='bg-[#F8D7DA] p-4 my-28'>
                        <p>Your wishlist is empty. Please <Link className='text-blue-500 font-medium
                        ' to='/'>shop</Link> now</p>
                    </div>
            }
            <div className='my-14'>
                <Newsletter></Newsletter>
            </div>
            {/* <Toaster
                position="top-right"
                reverseOrder={false}
            /> */}
        </div >
    );
};

export default Wishlist;