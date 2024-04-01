"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        author: '',
        price: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the product data to your backend for saving to the database
        fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => response.json())
            .then(data => {
                if(data?.error)
                    alert(data.error);
                else{
                    alert('Product added successfully');
                    router.push('/products');
                }
                
            })
        console.log('Product data:', product);
        // You can add the logic here to send the data to your backend API
    };

    return (
        <>
            
            <div>
                <main className='bg-gray-100'>
                    <div className='min-h-screen flex justify-center items-center'>
                        <div className="bg-white p-8 rounded-lg shadow-md w-96">
                            <h1 className="text-3xl text-gray-700 font-bold mb-8">Add New Book</h1>
                            <form onSubmit={handleSubmit} className='text-gray-500'>
                                <div className="mb-4">
                                    <label className="text-gray-700 block">Name:</label>
                                    <input type="text" name="name" value={product.name} onChange={handleChange} required className="border border-gray-300 px-3 py-2 rounded-md w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-700 block">Description:</label>
                                    <textarea name="description" value={product.description} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full"></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-700 block">Author:</label>
                                    <input type="text" name="author" value={product.author} onChange={handleChange} required className="border border-gray-300 px-3 py-2 rounded-md w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-700 block">Price:</label>
                                    <input type="number" name="price" value={product.price} onChange={handleChange} required className="border border-gray-300 px-3 py-2 rounded-md w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="text-gray-700 block">Image URL:</label>
                                    <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md w-full" />
                                </div>
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Add Product</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AddProduct;
