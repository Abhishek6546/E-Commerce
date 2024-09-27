// import React,{useState,useEffect,useContext} from 'react'
// import { ShopContext } from '../context/ShopContext'

// import Title from "./Title"
// import ProductItem from './ProductItem';
// const LatestCollection = () => {
   
//     const { products } = useContext(ShopContext);
//     console.log(products)
//     const [latestProducts, setLatestProducts] = useState([]);
   
//     useEffect(() => {
//           if (products.length > 0) {
   // const update = products.slice(0, 10);
   //   setLatestProducts(update);
//    }
//     }, []);
    
//     return (
//         <div className='my-10'>
//             <div className='text-center py-8 text-3xl'>
//                 <Title text1={'LATEST'} text2={'COLLECTIONS'} />
//                 <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//                     Explore our latest curated products, blending style and function for your everyday needs.
//                 </p>
//             </div>

//          {/* Rendering products */}
//          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
//             {
//                products.map((item,index)=>(
//                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
//                 ))
//             }
//          </div>
//         </div>
//     )
// }

// export default LatestCollection


import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from "./Title";
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const update = products.slice(0, 10);
            setLatestProducts(update);
        }
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Explore our latest curated products, blending style and function for your everyday needs.
                </p>
            </div>

            {/* Rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item,index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    );
}

export default LatestCollection;
