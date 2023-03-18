import React from 'react';
import useTitle from './useTitle';

const NoAccess = () => {
    useTitle("No Access")
    return (
        <div className='w-3/5  mx-auto shadow-xl bg-[#FCB800] flex justify-center my-52 text-white p-10 rounded-sm'>
            <div>
                OOPS! YOU HAVE NO ACCESS. CONTACT TO THE AUTHORITY.
            </div>
        </div>
    );
};

export default NoAccess;