import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { HiDownload } from 'react-icons/hi';
import Modal from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import LoadingElement from '../../Components/LoadingElement';
import useTitle from '../../Components/useTitle';

const OrderHistory = () => {
    useTitle("Order History")
    const { data: orderData = [], isLoading: orderDataLoading, refetch: orderDataRefetch } = useQuery({
        queryKey: ["getOrderAdmin"],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/getOrderAdmin`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(orderData)
    const [editData, setEditData] = useState("")
    const [openEditModal, setOpenEditModal] = useState(false)
    const onOpenEditModal = (data) => {
        setOpenEditModal(true)
        setEditData(data)

    }
    const onCloseEditModal = () => {
        setOpenEditModal(false)
    }
    const editHandler = (event) => {
        event.preventDefault()
        const deliveryStatus = event.target.deliveryStatus.value

        const editInfo = {
            deliveryStatus,
            _id: editData?._id
        }
        // console.log(editInfo)
        fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/updateDeliveryStatus`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(editInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data?.modifiedCount) {
                    setOpenEditModal(false)
                    orderDataRefetch()
                }
            })
    }
    // console.log(editData)
    if (orderDataLoading) {
        return <LoadingElement></LoadingElement>
    }
    return (
        <div className='lg:mx-7 lg:mt-7 mx-2 mt-2'>
            <div className='my-10 bg-[#F4F4F4] p-2'>
                <h1 className='text-2xl font-semibold'>All Order</h1>
            </div>
            {
                orderData?.length > 0 ? < div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Total Price</th>
                                <th>Delivery Status</th>
                                <th>Download</th>
                                <th>Update status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderData.map((data, i) => <tr
                                    key={data?._id}
                                    className="hover"
                                >
                                    <td title='MM/DD/YY' className=''>{data?.orderDate}</td>
                                    <td className=''>{data?.customerName}</td>
                                    <td>
                                        <Link className='hover:text-amber-500' to={`/productDetails?id=${data?.productId}`}>
                                            {data?.productName}  * <span className='font-medium'> {data?.customerQuantity}</span>
                                        </Link>
                                    </td>
                                    <td className=' text-center'>{data?.price} /-</td>

                                    <td className='text-center'>
                                        {data?.totalPrice} /-
                                    </td>
                                    <td className=''>
                                        <p className='ml-3'>{data?.deliveryStatus}</p>
                                    </td>
                                    <td className='text-center'>
                                        <Link to={`/payment/success?transactionId=${data?.transactionId}`}>
                                            <button className='border w-full p-2 bg-[#FCB800] font-semibold hover:bg-black hover:text-white'><HiDownload className='inline  ' /> Invoice</button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => onOpenEditModal(data)} className='border w-full p-2 bg-[#00c52e] font-semibold hover:bg-black hover:text-white'>Update</button>
                                    </td>

                                </tr>)
                            }


                            {/* row 3 */}

                        </tbody>
                    </table>
                </div> :
                    <div className='bg-[#F8D7DA] p-4 my-28'>
                        <p>Order history is empty.</p>
                    </div>
            }
            {/* edit product */}
            {
                openEditModal && <Modal open={openEditModal} onClose={onCloseEditModal} center>
                    <div className='mt-10 lg:w-[400px]'>
                        <form onSubmit={editHandler}>
                            <label>
                                <span className="text-sm font-medium text-slate-700">Delivery Status -{editData?.deliveryStatus}

                                </span>

                                <select name="deliveryStatus" className='mt-3 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500' required>
                                    <option selected value='Processing'>Processing</option>
                                    <option value='Delivery'>Delivery</option>
                                    <option value="Received">Received</option>
                                </select>
                            </label>
                            <div className='my-12'>
                                <button type="submit"
                                    className='border w-full p-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Update
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
        </div >
    );
};

export default OrderHistory;