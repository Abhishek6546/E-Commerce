import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
export const ShopContext = createContext();
import { useNavigate } from "react-router-dom";
import axios from "axios"
const ShopContextProvider = (props) => {

    const currency = '₹';
    const delivery_fee = 10;
    const backendurl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('');
    const [showSearch, setshowSearch] = useState(false);
    const [cartItems, setcartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select product Size');
            return;
        }
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setcartItems(cartData);
        if (token) {
            try {
                await axios.post(backendurl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setcartItems(cartData);

        if (token) {
            try {
                await axios.post(backendurl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount;
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id == items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                     console.log(error)
                }
            }
        }
        return totalAmount;
    }

    const getproductsdata = async () => {
        try {
            const response = await axios.get(backendurl + "/api/product/list")
            if (response.data.success) {
                setProducts(response.data.products)
            }

            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUsercart = async (token) => {
        try {
            const response = await axios.post(backendurl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setcartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    useEffect(() => {
        getproductsdata();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUsercart(localStorage.getItem('token'));
        }
    }, [])
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setshowSearch,
        cartItems,setcartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, backendurl, setToken, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider