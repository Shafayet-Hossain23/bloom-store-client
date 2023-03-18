import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import LoadingElement from '../../Components/LoadingElement';
import useTitle from '../../Components/useTitle';

const AllProductAdmin = () => {
    useTitle("All Product")
    const { data: productsData = [], isLoading: productsDataLoading, refetch: productsDataRefetch } = useQuery({
        queryKey: ["allProduct"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/allProduct`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // new product handler


    const [openNewModal, setOpenNewModal] = useState(false)
    const onOpenNewModal = () => {
        setOpenNewModal(true)
    }
    const onCloseNewModal = () => {
        setOpenNewModal(false)
    }
    const newProductHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const productName = form.productName.value
        const selectCategory = form.selectCategory.value
        const price = parseInt(form.price.value)
        const quantity = parseInt(form.quantity.value)
        const brand = form.brand.value
        const rating = parseInt(form.rating.value)
        const imageLink1 = form.imageLink1.value
        const imageLink2 = form.imageLink2.value
        // const imageLink3 = form.imageLink3.value

        const productInfo = {
            productName,
            category: selectCategory,
            price,
            quantity,
            brand,
            rating,
            advertised: false,
            images: [
                imageLink1,
                imageLink2,

            ],
            description: [
                "Unrestrained and portable active stereo speaker",
                "Free from the confines of wires and chords",
                "20 hours of portable capabilities",
                "Double-ended Coil Cord with 3.5mm Stereo Plugs Included",
                "3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X"
            ]
        }
        // console.log(productInfo) 

        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/addNewProduct`, {
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
                    setOpenNewModal(false)
                    productsDataRefetch()
                }
            })
    }
    // delete products 
    const [dltId, setDltId] = useState('')
    const [openDltModal, setOpenDltModal] = useState(false)
    const onOpenDltModal = (id) => {
        setOpenDltModal(true)
        setDltId(id)
    }
    const onCloseDltModal = () => {
        setOpenDltModal(false)
    }
    const deleteHandler = (id) => {
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/delete-from-products?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    setOpenDltModal(false)
                    productsDataRefetch()
                    // console.log(data)
                }
            })
    }
    // product edit handler 
    const [editData, setEditData] = useState("")
    const [openEditModal, setOpenEditModal] = useState(false)
    const onOpenEditModal = (data) => {
        setOpenEditModal(true)
        setEditData(data)

    }
    const onCloseEditModal = () => {
        setOpenEditModal(false)
    }
    // console.log(editData)
    const editHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const productName = form.productName.value
        const price = parseInt(form.price.value)
        const quantity = parseInt(form.quantity.value)
        const brand = form.brand.value
        const advertised = form.advertised.value
        // console.log(productName, price, quantity, brand, advertised)
        const editInfo = {
            id: editData?._id,
            productName,
            price,
            quantity,
            brand,
            advertised
        }
        console.log(editInfo)
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/edit-by-admin`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(editInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.modifiedCount) {
                    setOpenEditModal(false)
                    productsDataRefetch()
                }
            })
    }

    if (productsDataLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div className='flex justify-between p-2  my-10 bg-[#F4F4F4]'>
                <div>
                    <h1 className='text-2xl font-semibold'>All Product</h1>
                </div>
                <div>
                    <button onClick={onOpenNewModal} className='border w-46 p-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Add new product</button>
                </div>
            </div>
            <div className='mb-14'>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsData.map((data, i) => <tr
                                    key={data._id} className="hover">
                                    <th>{i + 1}</th>
                                    <td>
                                        <Link className='hover:text-amber-500' to={`/productDetails?id=${data?._id}`}>{data.productName}</Link>
                                    </td>
                                    <td>
                                        <Link className='hover:text-amber-500' to={`/productsByCatClick?category=${encodeURIComponent(data?.category)}`}>
                                            {data.category}
                                        </Link>

                                    </td>
                                    <td>{data.price} /-</td>
                                    <td>{data.quantity}</td>
                                    <td>
                                        <button onClick={() => onOpenEditModal(data)}
                                            className='rounded-full bg-amber-500 hover:bg-blue-500 p-2'>
                                            <AiOutlineEdit className='text-white' />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => onOpenDltModal(data?._id)} className='rounded-full bg-black  p-2 hover:bg-red-500'>
                                            <MdDelete className='text-white' />
                                        </button>
                                    </td>
                                </tr>)
                            }

                            {/* <tr className="hover">
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* create new product modal */}
            {
                openNewModal && <Modal open={openNewModal} onClose={onCloseNewModal} center>
                    <div className='mt-10 lg:w-[500px]'>
                        <form onSubmit={newProductHandler}>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Product Name</span>

                                <input name='productName' type="text" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Product Name' />
                            </label>
                            <label className=''>
                                <span className="text-sm font-medium text-slate-700">Category</span>

                                <select name="selectCategory" className='mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500' required >
                                    <option value="Clothing & Apparel">
                                        Clothing & Apparel
                                    </option>
                                    <option value="Garden & Kitchen">
                                        Garden & Kitchen
                                    </option>
                                    <option value="Consumer Electrics">
                                        Consumer Electrics
                                    </option>
                                    <option value="Health & Beauty">
                                        Health & Beauty
                                    </option>
                                    <option value="Computers & Technologies">
                                        Computers & Technologies
                                    </option>
                                    <option value="Jewelry & Watches">
                                        Jewelry & Watches
                                    </option>
                                    <option value="Phone & Accessories">
                                        Phone & Accessories
                                    </option>
                                    <option value="Sport & Outdoor">
                                        Sport & Outdoor
                                    </option>
                                    <option value="Fruits">
                                        Fruits
                                    </option>
                                </select>
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Price</span>

                                <input name='price' type="number" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Price' />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Quantity</span>

                                <input name='quantity' type="number" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Quantity' />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Brand</span>

                                <input name='brand' type="text" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Brand' />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Rating</span>

                                <select name="rating" className='mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500' required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Image link-1</span>

                                <input name='imageLink1' type="text" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Image link-1' />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Image link-2</span>

                                <input name='imageLink2' type="text" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" placeholder='Image link-2' required />
                            </label>

                            <div className='my-5'>
                                <button type="submit"
                                    className='border w-full p-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Submit Now
                                </button>
                            </div>

                        </form>
                    </div>
                </Modal>
            }
            {/* delete product */}
            {
                openDltModal && <Modal
                    open={openDltModal} onClose={onCloseDltModal} center>
                    <div className='mt-10 mb-5'>
                        <h1 className='font-semibold text-xl'>Are you sure to delete this product from products list?</h1>
                        <div>
                            <button onClick={() => deleteHandler(dltId)}
                                className='border w-44 p-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white mt-10 '>Confirm Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            }
            {/* edit product */}
            {
                openEditModal && <Modal open={openEditModal} onClose={onCloseEditModal} center>
                    <div className='mt-10 lg:w-[500px]'>
                        <form onSubmit={editHandler}>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Product Name</span>

                                <input name='productName' type="text" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required defaultValue={editData?.productName} />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Price</span>

                                <input name='price' type="number" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required defaultValue={editData?.price} />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Quantity</span>

                                <input name='quantity' type="number" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required defaultValue={editData?.quantity} />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Brand</span>

                                <input name='brand' type="text" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required defaultValue={editData?.brand} />
                            </label>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Advertise product -{editData?.advertised}

                                </span>

                                <select name="advertised" className='mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500' required>
                                    <option selected value='false'>False</option>
                                    <option value="true">True</option>
                                </select>
                            </label>
                            <div className='my-7'>
                                <button type="submit"
                                    className='border w-full p-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Confirm Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }

        </div >
    );
};

export default AllProductAdmin;