import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDown, AiOutlineBars } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import './Menubar.css';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { CiUser } from 'react-icons/ci';
import { AuthContext } from '../../../../ContextApi/UserContext';
import { BiLogOutCircle } from 'react-icons/bi';
import { useAdmin } from '../../../../Components/useAdmin';


const Menubar = () => {
    const [openModal, setOpenModal] = useState(false);
    const onOpenModal = () => setOpenModal(true);
    const onCloseModal = () => setOpenModal(false);

    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const onCloseLogoutModal = () => setOpenLogoutModal(false)
    const onOpenLogoutModal = () => setOpenLogoutModal(true)
    const [isAdmin, adminLoading] = useAdmin(user?.email)
    // console.log(isAdmin)

    const logOutHandler = () => {

        logOut()
            .then(() => {
                navigate('/')
                setOpenLogoutModal(false)

            })
            .catch(error => {
                // console.log(error.message)

            })



    }
    return (
        <div className=''>
            <hr />
            <div className='hidden lg:block'>
                <div className='flex justify-between bg-[#FCB800] px-14 py-3 font-medium'>
                    <ul className='flex  gap-14'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='dropdown'>
                            <button >Shop <AiOutlineDown className='inline' /></button>
                            <ul className="dropdown-content">
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Clothing & Apparel")}`}>Clothing & Apparel</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Garden & Kitchen")}`}>Garden & Kitchen</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Consumer Electrics")}`}>Consumer Electrics</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Health & Beauty")}`}>Health & Beauty</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Computers & Technologies")}`}>Computers & Technologies</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Jewelry & Watches")}`}>Jewelry & Watches</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Phone & Accessories")}`}>Phone & Accessories</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Sport & Outdoor")}`}>Sport & Outdoor</Link>
                                </li>
                                <li>
                                    <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Fruits")}`}>Fruits</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to='/aboutUs'>About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        {
                            user && isAdmin &&
                            <li className='dropdown'>
                                <button>Dashboard</button>
                                <ul className='dropdown-content'>
                                    <li>
                                        <Link to="/allProduct" className='linkCss'>All Product</Link>
                                    </li>
                                    <li>
                                        <Link to='/orderHistory' className='linkCss'>Order History</Link>
                                    </li>
                                    <li>
                                        <Link to='/allUsers' className='linkCss'>All Users</Link>
                                    </li>
                                </ul>
                            </li>
                        }

                    </ul>
                    <ul className='flex gap-14'>
                        <li className='cursor-pointer'>
                            Sell on Bloom Store
                        </li>
                        <li>
                            <Link to="/yourOrder">Your Order</Link>
                        </li>

                    </ul>
                </div>
            </div>
            {/* for small screen */}
            <div className='bg-[#FCB800] block lg:hidden px-2 py-1'>
                <div className='flex justify-between'>
                    <div onClick={onOpenModal} className="cursor-pointer">
                        <AiOutlineBars size="30px" />
                    </div>
                    <div>
                        <div>
                            {
                                user ? <div>
                                    <div title='logout' onClick={onOpenLogoutModal}>
                                        <BiLogOutCircle size="28px" className='hover:cursor-pointer hover:text-white' />
                                    </div>
                                </div> :
                                    <Link title='Login/Register' to='/login'><CiUser className='hover:text-white' size="28px" /></Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* ..... bars navbar responsive */}
            {
                openModal &&
                <div >
                    <Modal className='' open={openModal} onClose={onCloseModal} center>
                        <div className='w-80 h-96 mt-10 font-medium'>
                            <ul className=''>
                                <li className='mb-3'>
                                    <Link to='/' className='hover:bg-[#FCB800] p-3'>Home</Link>
                                </li>
                                <li className='dropdown'>
                                    <button className='hover:bg-[#FCB800] p-3' >Shop <AiOutlineDown className='inline' /></button>
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Clothing & Apparel")}`}>Clothing & Apparel</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Garden & Kitchen")}`}>Garden & Kitchen</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Consumer Electrics")}`}>Consumer Electrics</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Health & Beauty")}`}>Health & Beauty</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Computers & Technologies")}`}>Computers & Technologies</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Jewelry & Watches")}`}>Jewelry & Watches</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Phone & Accessories")}`}>Phone & Accessories</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Sport & Outdoor")}`}>Sport & Outdoor</Link>
                                        </li>
                                        <li>
                                            <Link className='linkCss' to={`/productsByCatClick?category=${encodeURIComponent("Fruits")}`}>Fruits</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className='my-3'>
                                    <Link to='/aboutUs' className='hover:bg-[#FCB800] p-3'>About</Link>
                                </li>
                                <li className='my-6'>
                                    <Link to="/contact" className='hover:bg-[#FCB800] p-3'>Contact</Link>
                                </li>

                                <li className='my-3'>
                                    <Link className='hover:bg-[#FCB800] p-3 cursor-pointer'>Sell on Bloom Store</Link>
                                </li>
                                <li className='mt-6 mb-3'>
                                    <Link to="/yourOrder" className='hover:bg-[#FCB800] p-3'>Your Order</Link>
                                </li>
                                {
                                    user && isAdmin &&
                                    <li className='dropdown'>
                                        <button className='hover:bg-[#FCB800] p-3' >Dashboard</button>
                                        <ul className='dropdown-content'>
                                            <li>
                                                <Link to="/allProduct" className='linkCss'>All Product</Link>
                                            </li>
                                            <li>
                                                <Link to='/orderHistory' className='linkCss'>Order History</Link>
                                            </li>
                                            <li>
                                                <Link to='/allUsers' className='linkCss'>All Users</Link>
                                            </li>
                                        </ul>
                                    </li>
                                }

                            </ul>




                        </div>
                    </Modal>
                </div>
            }
            {openLogoutModal &&
                <Modal open={openLogoutModal} onClose={onCloseLogoutModal} center>
                    <div className='pr-10 pt-3'>
                        <h1 className='font-semibold'>Hello, {user?.displayName}. Are you want to log out now?</h1>
                        <button onClick={logOutHandler} className="bg-amber-500  px-4 pb-2 pt-1  mt-7 text-white hover:text-black">Log out</button>
                    </div>
                </Modal>
            }
        </div>
    );
};

export default Menubar;