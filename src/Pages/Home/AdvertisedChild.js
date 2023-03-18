import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { BsBagCheck, BsHeart, BsSuitHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { AuthContext } from '../../ContextApi/UserContext';
import PrivateRoutes from '../../Routes/PrivateRoutes';

const AdvertisedChild = ({ data }) => {
    // console.log(data)
    const { _id, category, productName, price, brand, description, images, quantity, rating } = data;
    const { user } = useContext(AuthContext)
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

    return (
        <div className=' px-3 hover:border-2 lg:h-[320px] lg:w-[225px] w-[179px] max-[400px]:w-[160px]'>
            <img className='lg:h-[173px] h-[155px]  lg:w-[193px] w-[177px]' src={images[0]} alt="" />
            <div>
                {
                    user ? <div className='flex justify-between'>
                        <div onClick={() => wishHandler(data)} >
                            <BsHeart title='Add to wishlist' className='hover:cursor-pointer hover:text-white hover:bg-[#FCB800] rounded-full px-2' size="33px" />
                        </div>
                        <div onClick={() => cartHandler(data)}>
                            <BsBagCheck title='Add to Cart' className='hover:cursor-pointer hover:text-white hover:bg-[#FCB800] rounded-full px-2' size="33px" />
                        </div>

                    </div> : <div className='flex justify-between'>
                        <Link to="/login">
                            <div >
                                <BsHeart title='Add to wishlist' className='hover:cursor-pointer hover:text-white hover:bg-[#FCB800] rounded-full px-2' size="33px" />
                            </div>
                        </Link>
                        <Link to="/login">
                            <div>
                                <BsBagCheck title='Add to Cart' className='hover:cursor-pointer hover:text-white hover:bg-[#FCB800] rounded-full px-2' size="33px" />
                            </div>
                        </Link>
                    </div>
                }
            </div>

            <hr className='mt-1' />

            <div className='my-1'>
                <Link to={`/productDetails?id=${_id}`}><p className='text-sm text-[#0368CD] hover:text-[#FCB800] cursor-pointer'>{productName}</p></Link>
                <div>
                    <StarRatings
                        starRatedColor="#FCB800"
                        rating={rating}
                        starDimension="18px"
                        starSpacing="2px"
                    />
                </div>
                <p className='text-sm text-[#FF3300] font-semibold mt-1'>{price} TK</p>
            </div>
        </div>

    );
};

export default AdvertisedChild;