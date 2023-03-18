import React from 'react';
import useTitle from '../../Components/useTitle';
import Newsletter from '../Home/Newsletter';

const FailedOrder = () => {
    useTitle("Order Failed")
    return (
        <div className=''>
            <div className='text-center font-medium text-red-500 my-40'>
                <h1>
                    Something went wrong. Try again later...
                </h1>
            </div>
            <div className='my-24'>
                <Newsletter></Newsletter>
            </div>
        </div>
    );
};

export default FailedOrder;