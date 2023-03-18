import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import LoadingElement from '../../Components/LoadingElement';
import { AuthContext } from '../../ContextApi/UserContext';
import Newsletter from '../Home/Newsletter';

const OrderNow = () => {
    // const location = useLocation()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get('id');
    // console.log(id)
    const [qty, setQty] = useState(1)
    const incrementHandler = () => {
        const newQty = qty + 1
        setQty(newQty)
    }
    const decrementHandler = () => {
        const newQty = qty - 1
        if (newQty > 0) {
            setQty(newQty)
        }
        if (newQty < 1) {
            setQty(1)
        }
    }
    const { data: productData = [], isLoading: productLoading, refetch: productRefetch } = useQuery({
        queryKey: ["product-by-id"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/product-by-id?id=${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    const confirmOrderHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const phoneNumber = form.phoneNumber.value
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const address = form.address.value
        const city = form.city.value
        const postalCode = form.postalCode.value
        const customerQuantity = parseInt(form.customerQuantity.value)
        // console.log(firstName, lastName, address, city, postalCode, customerQuantity)
        const orderInfo = {
            phoneNumber,
            firstName,
            lastName,
            address,
            city,
            postalCode,
            customerQuantity,
            customerEmail: user?.email,
            customerName: user?.displayName,
            totalPrice: productData?.price * customerQuantity,
            productId: id,
            category: productData.category,
            productName: productData.productName,
            price: productData.price,
            brand: productData.brand,
            description: productData.description,
            images: productData.images,
            quantity: productData.quantity,
            deliveryStatus: "Processing",
            orderDate: new Date().toLocaleDateString()
        }
        // console.log(new Date().toLocaleDateString())
        if (productData?.quantity >= customerQuantity) {
            fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/ordersList`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(orderInfo)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data?.url)
                    window.location.replace(data.url);
                    // console.log(data)
                    // if (data.acknowledged) {

                    //     fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/quantityUpdate`, {
                    //         method: "PUT",
                    //         headers: {
                    //             "Content-Type": "application/json",
                    //             authorization: `bearer ${localStorage.getItem("accessToken")}`
                    //         },
                    //         body: JSON.stringify(orderInfo)
                    //     })
                    //         .then(res => res.json())
                    //         .then((data) => {

                    //             // if (data.modifiedCount) {
                    //             //     navigate('/successfullOrder')
                    //             // }
                    //         })
                    //         .catch((er) => console.error(er));
                    // }
                })
        }

        if (productData?.quantity < customerQuantity) {
            toast.error("OOP! please reduce quantity. we can't provide it")
        }
        if (productData?.quantity === 0) {
            toast.error("OOP! This product is stock out now")
        }

    }
    if (productLoading) {
        return <LoadingElement></LoadingElement>
    }
    // console.log(productData)
    return (
        <div className='lg:mx-7  mx-2'>
            <div className='text-center lg:mt-14 mt-14 lg:mb-14 mb-10 '>
                <h1 className='font-bold text-3xl'>Confirm Order</h1>
            </div>
            <div>
                <form onSubmit={confirmOrderHandler}>
                    <div className='flex lg:justify-between gap-14 flex-col-reverse lg:flex-row'>
                        <div className='lg:w-2/3'>
                            <h1 className='font-bold text-2xl lg:mt-6 mt-1 lg:mb-6 mb-6' >Contact Information</h1>
                            <label>
                                <input name='email' type="email" className="mt-0 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required value={user?.email} />
                            </label>
                            <label className=''>
                                <input name='phoneNumber' type="number" className="mt-3 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Phone number' />
                            </label>
                            <h1 className='font-bold text-2xl my-6'>Shipping Address</h1>
                            <div className='flex justify-between my-8'>
                                <label className='w-1/2'>

                                    <input name='firstName' type="text" className="mt-0 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='First Name' />
                                </label>
                                <label className='w-1/2 ml-3'>
                                    <input name='lastName' type="text" className="mt-0 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Last Name' />
                                </label>
                            </div>
                            <label>
                                <input name='address' type="text" className="mb-8 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Address' />
                            </label>
                            <div className='flex justify-between'>
                                <label className='w-1/2'>
                                    <input name='city' type="text" className="mt-0 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='City' />
                                </label>
                                <label className='w-1/2 ml-3'>
                                    <input name='postalCode' type="text" className="mt-0 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Postal Code' />
                                </label>
                            </div>
                        </div>
                        <div className='lg:w-1/2'>
                            <h1 className='font-bold text-2xl my-6'>Your Order</h1>
                            <div className='border-2 p-5'>
                                <div className='flex justify-between'>
                                    <h1 className='font-medium'>PRODUCT</h1>
                                    <h1 className='font-medium'>TOTAL</h1>
                                </div>
                                <hr className='my-4' />
                                <div className='flex justify-between'>
                                    <Link to={`/productDetails?id=${productData?._id}`}>
                                        <h1 className='hover:text-amber-500 cursor-pointer'>{productData?.productName}</h1>
                                    </Link>
                                    <h1 className=''>{productData?.price} /-</h1>
                                </div>
                                <hr className='my-4' />
                                <div className='flex justify-between'>
                                    <h1 className=''>Available Qunatity</h1>
                                    <h1 className=''>{productData?.quantity}</h1>
                                </div>
                                <hr className='my-4' />
                                <div className='flex justify-between'>
                                    <h1 className=''>Qunatity you need?</h1>
                                    <h1 className='text-xl flex w-24'>
                                        <p onClick={decrementHandler} className='font-bold mr-3 cursor-pointer'>-</p>
                                        <input name='customerQuantity' type="" className="mt-0 w-full px-2 py-1 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-semibold" required value={qty} />
                                        <p onClick={incrementHandler} className='font-bold ml-3 cursor-pointer'>+</p>
                                    </h1>
                                </div>
                                <hr className='my-4' />
                                <div className='flex justify-between'>
                                    <h1 className=''>Total</h1>
                                    <h1 className='font-bold'>{productData?.price * qty} /-</h1>
                                </div>
                                <hr className='mt-2' />
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='border mt-14 w-1/3 py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Payment Now</button>
                    </div>
                </form>
            </div>
            <div className='my-20'>
                <Newsletter></Newsletter>
            </div>
            {/* <Toaster
                position="top-right"
                reverseOrder={false}
            /> */}
        </div>
    );
};

export default OrderNow;
