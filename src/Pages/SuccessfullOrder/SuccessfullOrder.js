import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { HiDownload } from 'react-icons/hi';
import { AuthContext } from '../../ContextApi/UserContext';
import Newsletter from '../Home/Newsletter';
import './SuccessfullOrder.css';
import Pdf from "react-to-pdf";
import useTitle from '../../Components/useTitle';

const ref = React.createRef();

const SuccessfullOrder = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const transactionId = params.get('transactionId');
    // console.log(transactionId)
    const { user } = useContext(AuthContext)
    const { data: orderData = [], isLoading: orderLoading, refetch: orderRefetch } = useQuery({
        queryKey: ["getOrderTrans", transactionId],
        queryFn: async () => {
            const res = await fetch(`https://bloom-store-server-shafayet-hossain23.vercel.app/getOrderTrans?transactionId=${transactionId}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    // console.log(orderData)
    const options = {
        // orientation: 'landscape',
        unit: 'in',

        format: [12.5, 17]
    };
    useTitle("Successful Order")
    return (
        <div className='lg:mx-7  mx-2'>
            <div className='flex justify-between lg:my-7 my-7'>
                <div className='text-green-500 font-medium '>
                    <h1>
                        Congratulations! {orderData?.customerName} order's has been submitted successfully.
                    </h1>
                </div>
                <div>
                    {/* <button className='border w-full p-2 bg-[#FCB800] font-semibold hover:bg-black hover:text-white'><HiDownload className='inline mr-1 ' />Download Invoice </button> */}
                </div>
            </div>

            <div>
                <div ref={ref} className='lg:mx-auto lg:w-[700px]  lg:my-10 my-8 border border-amber-500 lg:px-14 lg:pt-5 lg:pb-14 p-3'>
                    <div className=''>
                        <div className='text-center'>
                            <h1 className='font-semibold text-3xl'>BLOOM INDUSTRY LIMITED</h1>
                            <p className='text-sm mt-2'>Location: Mirzapur, Mohadevpur, Naogaon</p>
                        </div>
                        <div className='editFirstTable flex justify-end mt-12 gap-5'>

                            <table className='table-1'>
                                <tbody>
                                    <tr>
                                        <td className='font-medium tableBorder-1 pl-2'>Order Date</td>
                                        <td className='tableBorder-1 pl-2'>{orderData?.orderDate} <span>(MM/DD/YY)</span></td>
                                    </tr>
                                    <tr>
                                        <td className='font-medium tableBorder-1 pl-2'>Name: </td>
                                        <td className='tableBorder-1 pl-2'>{orderData?.customerName}</td>
                                    </tr>
                                    <tr>
                                        <td className='font-medium tableBorder-1 pl-2'>Email:</td>
                                        <td className='tableBorder-1 pl-2'>{orderData?.customerEmail}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className='mt-10 mainTable'>
                            <table className='tableCss'>
                                <thead>
                                    <tr>
                                        <th className='tableHead p-2'>Order Description</th>
                                        <th className='tableHead p-2'>Order Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='tableData pl-3'>Product Name</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.productName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Product Price</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.price} /-
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Quantity</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.customerQuantity}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Total Price</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.totalPrice} /-
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Delivery status</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.deliveryStatus}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Transaction Id</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.transactionId}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Payment status</td>
                                        <td className='tableData  p-2'>
                                            {
                                                orderData?.paid === "true" ? <p className='text-green-500'>Paid</p> : <p>Unpaid</p>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='mt-10 mainTable'>
                            <table className='tableCss'>
                                <thead>
                                    <tr>
                                        <th className='tableHead p-2'>Shipping Description</th>
                                        <th className='tableHead p-2'>Shipping Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='tableData pl-3'>Name</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.firstName} {orderData?.lastName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Address</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>City</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.city}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='tableData pl-3'>Postal Code</td>
                                        <td className='tableData  p-2'>
                                            {orderData?.postalCode}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <Pdf
                    targetRef={ref} filename={orderData?.transactionId}
                    options={options}
                    // scale={window.devicePixelRatio}
                    scale={1.73}
                >
                    {({ toPdf }) => (
                        <button onClick={toPdf} className='border my-10 p-2 bg-[#FCB800] font-semibold hover:bg-black hover:text-white'><HiDownload className='inline mr-1 ' />Download Invoice </button>
                    )}
                </Pdf>
                {/* <button className='border my-10 p-2 bg-[#FCB800] font-semibold hover:bg-black hover:text-white'><HiDownload className='inline mr-1 ' />Download Invoice </button> */}
            </div>
            <div className='my-24'>
                <Newsletter></Newsletter>
            </div>
        </div>
    );
};

export default SuccessfullOrder;