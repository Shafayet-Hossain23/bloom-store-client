import React from 'react';
import HomeCateChild from './HomeCateChild';

const HomeCategories = () => {
    const categoriesList =
        [
            {
                id: 1,
                name: "Clothing & Apparel",
                img: "https://reactstorefronts.com/static/img/categories/shop/1.jpg"
            },
            {
                id: 2,
                name: "Garden & Kitchen",
                img: "https://reactstorefronts.com/static/img/categories/shop/2.jpg"
            },
            {
                id: 3,
                name: "Consumer Electrics",
                img: "https://reactstorefronts.com/static/img/categories/shop/3.jpg"
            },
            {
                id: 4,
                name: "Health & Beauty",
                img: "https://reactstorefronts.com/static/img/categories/shop/4.jpg"
            },
            {
                id: 5,
                name: "Computers & Technologies",
                img: "https://reactstorefronts.com/static/img/categories/shop/5.jpg"
            },
            {
                id: 6,
                name: "Jewelry & Watches",
                img: "https://reactstorefronts.com/static/img/categories/shop/6.jpg"
            },
            {
                id: 7,
                name: "Phone & Accessories",
                img: "https://reactstorefronts.com/static/img/categories/shop/7.jpg"
            },
            {
                id: 8,
                name: "Sport & Outdoor",
                img: "https://reactstorefronts.com/static/img/categories/shop/8.jpg"
            },
        ]
    return (
        <div className='lg:mt-7 mt-4'>
            <h1 className='p-2 text-2xl font-semibold mb-4 bg-[#F4F4F4]'>Categories</h1>
            <div className='grid lg:grid-cols-4 grid-cols-2 mt-4 gap-7'>
                {
                    categoriesList.map(category => <HomeCateChild
                        key={category.id}
                        category={category}
                    ></HomeCateChild>)
                }
            </div>
        </div>
    );
};

export default HomeCategories;