import React from 'react';
import HeaderTop from './HeaderTop/HeaderTop';
import Menubar from './MenuBar/Menubar';

const Header = () => {
    return (
        <div>
            <div>
                <HeaderTop></HeaderTop>
            </div>
            <div>
                <Menubar></Menubar>
            </div>
        </div>
    );
};

export default Header;