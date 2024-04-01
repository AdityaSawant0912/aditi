"use client"
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/navbar';

const Home = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const cartRef = useRef(null);
    // setProducts(data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/book');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);
                setProducts(data);
                console.log(products);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("Products:", products);
    }, [products]);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || {};
        setCartItems(storedCartItems);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const addToCart = (productId, quantity) => {
        const updatedCartItems = { ...cartItems };
        updatedCartItems[productId] = (updatedCartItems[productId] || 0) + quantity;
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    };

    const incrementQuantity = (productId) => {
        const updatedCartItems = { ...cartItems };
        updatedCartItems[productId]++;
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const decrementQuantity = (productId) => {
        const updatedCartItems = { ...cartItems };
        if (updatedCartItems[productId] > 1) {
            updatedCartItems[productId]--;
            setCartItems(updatedCartItems);
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        }
    };

    const deleteProduct = (productId) => {
        const updatedCartItems = { ...cartItems };
        delete updatedCartItems[productId];
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }

    const getTotalPrice = () => {
        let total = 0;
        for (const [productId, quantity] of Object.entries(cartItems)) {
            let product = products.find(product => product._id === productId);
            // Calculate total price for each product (replace this with your own logic based on your product data)
            total += quantity * product?.price; // Assuming each product costs $10
        }
        return total;
    };

    const checkOut = () => {
        alert('Checkout Successful!');
        const updatedCartItems = {};
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    }
    
    return (
        <div>

            <Navbar toggleCart={toggleCart} ></Navbar>


            <main className="bg-gray-100 ">
                <div className='min-h-screen flex flex-col justify-center items-center'>
                    <h1 className="text-3xl text-gray-700 font-bold mb-4">Welcome to Our E-commerce Store <span className='text-pink-500 underline'>Readopia</span></h1>
                    <p className="text-lg text-gray-700 mb-8 max-w-[800px] text-center">
                        Introducing Readopia - your literary paradise awaits! Immerse yourself in a world of boundless imagination and endless adventure. From timeless classics to contemporary masterpieces, Readopia offers a curated selection of books to satisfy every reader&apos;s craving. Explore diverse genres, discover hidden gems, and embark on unforgettable journeys through the power of storytelling. With Readopia, your next great read is just a click away. Join us and unlock the magic of literature today.</p>
                </div>
                

            </main>

            <div ref={cartRef} className={`fixed top-0 right-0 bg-white lg:w-[32rem] w-64 h-full overflow-y-auto transition-transform duration-300 transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <header className="bg-gray-800 text-white py-4 px-6">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                </header>
                <div className="p-4 flex flex-col">
                    {Object.entries(cartItems).map(([productId, quantity]) => {

                        let product = products.find(product => product._id === productId);

                        return (

                            <div key={productId} className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="text-lg text-gray-800 font-medium">{product?.name}</p>
                                    <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                                    {/* Add product details here */}
                                </div>
                                <div className='min-w-[100px]'>
                                    <button onClick={() => incrementQuantity(productId)} className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2">+</button>
                                    <button onClick={() => decrementQuantity(productId)} className="bg-red-500 text-white py-1 px-2 rounded-md mr-2">-</button>
                                    <button onClick={() => deleteProduct(productId)} className="bg-red-500 text-white py-1 px-2 rounded-md ">X</button>
                                </div>
                            </div>
                        )

                    })}
                    <div className="flex-grow"></div>
                    <div className='mt-auto bg-white text-white py-4 px-6 flex flex-col justify-end h-max'>

                        <div className="p-4 ">
                            <p className="text-lg text-gray-500">Total: <span className='text-gray-700 font-bold'>₹ {getTotalPrice().toFixed(2)}</span></p>
                            <button className="bg-green-500 text-white py-2 px-4 rounded-md m-auto w-full text-xl" onClick={checkOut}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;
