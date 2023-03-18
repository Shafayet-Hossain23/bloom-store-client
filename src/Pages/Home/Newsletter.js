import React from 'react';

const Newsletter = () => {
    return (
        <div className='mt-6'>
            <div className='lg:flex justify-between border lg:p-10 p-5'>
                <div className='lg:mt-10 lg:mb-0 mb-4'>
                    <div>
                        <h1 className='font-semibold text-xl'>Newsletter</h1>
                        <p>Subcribe to get information about    products and coupons.</p>
                    </div>
                </div>
                <div>
                    <label>
                        <span className="text-sm font-medium text-slate-700">Email Address</span>

                        <input name='email' type="email" className="mt-1 w-full px-3 py-2 bg-white border border-slate-300  text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" required placeholder='Email Address' />
                    </label>
                    <button className='border mt-7 w-full py-2 bg-[#FCB800] font-bold hover:bg-black hover:text-white'>Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;