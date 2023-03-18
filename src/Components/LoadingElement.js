import React from 'react';
import { Oval, ProgressBar } from 'react-loader-spinner'

const LoadingElement = () => {
    return (
        <div>
            <div className='flex justify-center my-44'>
                <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor='black'
                    barColor='#FCB800'
                />
            </div>
        </div>
    );
};

export default LoadingElement;