import React from 'react';
import './Technology.css'

const TechnologyChild = ({ technology }) => {
    const { id, name, img, bg } = technology
    return (
        <div>
            <div className='containerSkill tooltip tooltip-warning' data-tip={name}>
                <img className={`${bg} image`} src={img} alt="" />
                {/* <h2>{name}</h2> */}
            </div>
        </div>
    );
};

export default TechnologyChild;