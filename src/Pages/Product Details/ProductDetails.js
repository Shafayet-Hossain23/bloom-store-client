import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import { Link, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import LoadingElement from '../../Components/LoadingElement';
import useTitle from '../../Components/useTitle';
import { AuthContext } from '../../ContextApi/UserContext';
import Newsletter from '../Home/Newsletter';
import './ProductDetails.css'

const ProductDetails = () => {
    useTitle("Shop")
    const { user } = useContext(AuthContext)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    // console.log(id)
    const { data: productData = [], isLoading: productLoading, refetch: productRefetch } = useQuery({
        queryKey: ["product-by-id", id],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/product-by-id?id=${id}`)
            const data = await res.json()
            return data
        }
    })
    // console.log(productData)
    const { _id, category, productName, price, brand, rating, quantity, images, description } = productData

    // console.log(description)
    // console.log(images)

    const cartHandler = (data) => {
        const productInfo = {
            productId: data._id,
            category: data.category,
            productName: data.productName,
            price: data.price,
            brand: data.brand,
            description: data.description,
            images: data.images,
            quantity: data.quantity,
            rating: data.rating,
            customerEmail: user?.email,
            customerName: user?.displayName,
        }
        if (quantity > 0) {
            fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(productInfo)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.acknowledged) {
                        toast.success("Your product is add to cart successfully")
                        // console.log(data)
                    }
                    if (!data.acknowledged) {
                        toast.error("you already added this product")
                        // console.log(data)
                    }

                })
        }
        else {
            toast.error("OOP! stock out")
        }
    }
    const wishHandler = (data) => {
        const productInfo = {
            productId: data._id,
            category: data.category,
            productName: data.productName,
            price: data.price,
            brand: data.brand,
            description: data.description,
            images: data.images,
            quantity: data.quantity,
            rating: data.rating,
            customerEmail: user?.email,
            customerName: user?.displayName,
        }
        if (quantity > 0) {
            fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(productInfo)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data.acknowledged) {
                        toast.success("Your product is add to wishlist successfully")
                        // console.log(data)
                    }
                    if (!data.acknowledged) {
                        toast.error("you already added the product")
                        // console.log(data)
                    }

                })
        }
        else {
            toast.error("OOP! stock out")
        }
    }
    if (productLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div className='p-3 text-2xl font-medium mb-4 bg-[#F4F4F4]'>
                <Link to={`/productsByCatClick?category=${encodeURIComponent(productData?.category)}`} className="hover:text-amber-500"> <h1>{productData?.category}</h1></Link>
            </div>
            <div className='lg:flex gap-10 my-10'>
                <div className='lg:w-4/12 '>
                    <Carousel showThumbs={false} autoPlay infiniteLoop={true}>
                        {
                            images && images.map((image, i) => <div
                                key={i + 1}
                                className=""
                            >
                                <img className='lg:h-[368px]  h-[320px] ' src={image} alt='' />
                            </div>)
                        }
                    </Carousel>
                </div>
                <div className='lg:w-6/12 mt-10 lg:mt-0'>
                    <div>
                        <h1 className='text-2xl'>{productName}</h1>
                        <div className='mt-3 flex gap-5'>
                            <div>
                                <p className='text-sm mt-1'>Brand: <span className='text-[#0068D6]'>{brand}</span></p>
                            </div>
                            <div>
                                |
                            </div>
                            <div>
                                <StarRatings
                                    starRatedColor="#FCB800"
                                    rating={rating}
                                    starDimension="15px"
                                    starSpacing="2px"
                                />
                            </div>
                            <div>
                                |
                            </div>
                            <div>
                                <p>On stock: <span className='text-[#0068D6]'>{quantity}</span></p>
                            </div>
                        </div>
                        <hr className='my-3' />
                        <p className='font-semibold text-xl my-4'>{price} TK </p>

                        <div className='my-5 ml-4'>
                            <ul className='ulStyle'>
                                {
                                    description && description.map((liItem, i) => <li
                                        key={i}
                                        className="my-3">
                                        {liItem}
                                    </li>)
                                }
                            </ul>
                        </div>
                        {
                            user ? <div className='flex gap-1 lg:gap-5 '>
                                <div className='w-full'>
                                    <button onClick={() => cartHandler(productData)} className='border w-full mt-7  py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Add to Cart</button>
                                </div>
                                <div className='w-full'>
                                    <button onClick={() => wishHandler(productData)} className='border w-full mt-7  py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Wishlist</button>
                                </div>
                                <div className='w-full'>
                                    <Link to={`/orderNow?id=${_id}`}>
                                        <button className='border w-full mt-7  py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Proceed Order</button>
                                    </Link>
                                </div>
                            </div> :
                                <div className='flex gap-1 lg:gap-5 '>
                                    <div className='w-full'>
                                        <Link to='/login'>
                                            <button className='border w-full mt-7  py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Add to Cart</button></Link>
                                    </div>

                                    <div className='w-full'>
                                        <Link to="/login">
                                            <button className='border w-full mt-7  py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'> Wishlist</button>
                                        </Link>
                                    </div>
                                    <div className='w-full'>
                                        <Link to='/login'>
                                            <button className='border w-full mt-7  py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Proceed Order</button></Link>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
                <div className='lg:w-3/12 bg-[#F5F5F5] p-10 lg:mt-0 mt-10'>
                    <div>
                        <ul className='ulStyle'>
                            <li className='my-4'>
                                Shipping worldwide.
                            </li>
                            <li className='my-4'>
                                Free 7-day return.
                            </li>
                            <li className='my-4'>
                                Supplier give bills.
                            </li>
                            <li className='my-4'>
                                Pay online.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='my-36'>
                <Newsletter></Newsletter>
            </div>
        </div >
    );
};

export default ProductDetails;