import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LoadingElement from '../../Components/LoadingElement';
import { AuthContext } from '../../ContextApi/UserContext';
import Newsletter from '../Home/Newsletter';
import { HiDownload } from 'react-icons/hi';
import useTitle from '../../Components/useTitle';

const YourOrder = () => {
    useTitle("Your Order")
    const { user } = useContext(AuthContext)
    const { data: orderData = [], isLoading: orderLoading, refetch: orderRefetch } = useQuery({
        queryKey: ["getOrderEmail"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/getOrderEmail?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(orderData)
    if (orderLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div className='my-10 bg-[#F4F4F4] p-2'>
                <h1 className='text-2xl font-semibold'>Your Order List</h1>
            </div>
            {
                orderData?.length > 0 ? < div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>

                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Delivery Status</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderData.map((data, i) => <tr
                                    key={data?._id}
                                // className="hover"
                                >
                                    <td>
                                        <img className='h-[80px] w-[80px]' src={data?.images[0]} alt="" />
                                    </td>
                                    <td>
                                        <Link className='hover:text-amber-500' to={`/productDetails?id=${data?.productId}`}>
                                            {data?.productName}
                                        </Link>
                                    </td>
                                    <td className='font-semibold text-center'>{data?.price} /-</td>
                                    <td className='text-center'>
                                        <div> {data?.customerQuantity}</div>
                                    </td>
                                    <td className='text-center'>
                                        {data?.totalPrice} /-
                                    </td>
                                    <td className='text-center'>
                                        <p className='ml-3'>{data?.deliveryStatus}</p>
                                    </td>
                                    <td className='text-center'>
                                        <Link to={`/payment/success?transactionId=${data?.transactionId}`}>
                                            <button className='border w-full p-2 bg-[#FCB800] font-semibold hover:bg-black hover:text-white'><HiDownload className='inline  ' /> Invoice</button>
                                        </Link>
                                    </td>

                                </tr>)
                            }


                            {/* row 3 */}

                        </tbody>
                    </table>
                </div> :
                    <div className='bg-[#F8D7DA] p-4 my-28'>
                        <p>Order list is empty. Please <Link className='text-blue-500 font-medium
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

export default YourOrder;