import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import LoadingElement from '../../Components/LoadingElement';
import useTitle from '../../Components/useTitle';
import { AuthContext } from '../../ContextApi/UserContext';
import { MdDelete } from 'react-icons/md';
import Newsletter from '../Home/Newsletter';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const AddToCart = () => {
    useTitle("Cart")
    const { user } = useContext(AuthContext)
    const { data: cartData = [], isLoading: cartLoading, refetch: cartRefetch } = useQuery({
        queryKey: ["get-cart"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/get-cart?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(cartData)
    const deleteHandler = (data) => {
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/delete-from-cart?id=${data._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    toast.success("Successfully delete this product from cart")
                    cartRefetch()
                }
            })
    }
    if (cartLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7  mx-2 '>
            <div className='text-center my-14'>
                <h1 className='font-bold text-3xl'>Shopping Cart </h1>
            </div>
            {
                cartData?.length > 0 ? < div className="overflow-x-auto">
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
                                cartData.map((data, i) => <tr
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
                                    <td className='font-semibold'>{data?.price} /-</td>
                                    <td>
                                        <Link to={`/orderNow?id=${data?.productId}`}>
                                            <button className='border w-28 p-2 bg-[#00c52e] font-semibold hover:bg-black hover:text-white '>Order Now</button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteHandler(data)} className='rounded-full bg-amber-500  p-2 hover:bg-red-500'>
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
                        <p>Add to cart is empty. Please <Link className='text-blue-500 font-medium
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

export default AddToCart;