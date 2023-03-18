import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BsSuitHeart, BsBagCheck } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import { BiLogOut, BiLogOutCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../ContextApi/UserContext';
import Modal from 'react-responsive-modal';



const HeaderTop = () => {
    const { user, logOut, searchProductText, setSearchProductText } = useContext(AuthContext)
    const navigate = useNavigate()
    const [openLogoutModal, setOpenLogoutModal] = useState(false)
    const onCloseLogoutModal = () => setOpenLogoutModal(false)
    const onOpenLogoutModal = () => setOpenLogoutModal(true)

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
    const searchTextHandler = (event) => {
        event.preventDefault()
        const form = event.target
        const searchProduct = form.searchProduct.value
        // console.log(searchProduct)
        setSearchProductText(searchProduct)
        navigate('/searchProduct')
    }
    return (
        <div>
            {/* for large device */}
            <div className='hidden lg:block'>
                <div className='flex justify-between px-14 pt-5 pb-3 bg-[#FCB800]'>
                    <div>
                        <h1 className='text-2xl font-bold'>BLOOM<span className='text-white'>STORE</span></h1>
                    </div>
                    <div>
                        <form onSubmit={searchTextHandler} className='flex'>
                            <div className='ml-3 '>
                                <label className="relative  flex">
                                    {/* <span className="sr-only">Search</span> */}

                                    <input className="placeholder:text-slate-400 block bg-white w-80 border border-slate-300 pr-3 pl-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 sm:text-sm h-9" placeholder="I am shopping for..." type="text" name="searchProduct" />
                                    <button type="submit" className='ml-4  bg-black text-white px-2 h-9 '><FaSearch /></button>
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className='flex'>
                        <div className=''>
                            <Link to="wishlist">
                                <BsSuitHeart title='Wishlist' className='hover:cursor-pointer hover:text-white' size="30px" />
                            </Link>
                        </div>
                        <div className='ml-14'>
                            <Link to="/cart"><BsBagCheck title='Cart' className='hover:cursor-pointer hover:text-white' size="30px" /></Link>
                        </div>
                        {
                            user ?
                                <div className='ml-14 '>
                                    <div title='logout' onClick={onOpenLogoutModal}>
                                        <BiLogOutCircle size="30px" className='hover:cursor-pointer hover:text-white' />
                                    </div>
                                </div>
                                :
                                <div className='flex justify-center ml-14'>
                                    <div>
                                        <Link to='/login'><CiUser className='hover:text-white' size="33px" /></Link>
                                    </div>
                                    <div className='mt-[-7px] ml-2'>
                                        <Link to='/login' className='font-semibold hover:text-white'>Login</Link> <br />
                                        <Link to='/Register' className='font-semibold hover:text-white'>Register</Link>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
            {/* for small device */}
            <div className='block lg:hidden '>
                <div className='flex justify-between pl-2 pr-3 pt-2 pb-2  bg-[#FCB800] w-full'>
                    {/* <div>
                        <h1 className='text-2xl font-bold'>Bloom<span className='text-white'>Store</span></h1>
                    </div> */}
                    <form onSubmit={searchTextHandler} className='flex'>
                        <div className='ml-0 '>
                            <label className="relative  flex">
                                {/* <span className="sr-only">Search</span> */}

                                <input className=" placeholder:text-slate-400 block bg-white w-40 border border-slate-300 pr-3 pl-2 shadow-sm focus:outline-none focus:border-black focus:ring-black focus:ring-1 sm:text-sm h-8 " placeholder="I am shopping for..." type="text" name="searchProduct" />
                                <button type="submit" className='ml-0  bg-black text-white px-2 h-8 '><FaSearch /></button>
                            </label>
                        </div>
                    </form>
                    <div className='flex pt-1'>
                        <div className='ml-3'>
                            <Link to="wishlist">
                                <BsSuitHeart title='Wishlist' className='hover:cursor-pointer hover:text-white' size="30px" />
                            </Link>
                        </div>
                        <div className='ml-4'>
                            <Link to="/cart"><BsBagCheck title='Cart' className='hover:cursor-pointer hover:text-white' size="30px" /></Link>
                        </div>
                        {/* <div className='ml-7'>
                            <div>
                                <Link title='Login/Register' to='/login'><CiUser className='hover:text-white' size="28px" /></Link>
                            </div>

                        </div> */}

                    </div>
                </div>
            </div>
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

export default HeaderTop;






