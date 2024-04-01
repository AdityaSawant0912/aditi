import React from 'react'
import Link from 'next/link';

const layout = ({ children }) => {
    return (
        <>
            <nav className="bg-gray-800 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/">
                        <span className="text-xl font-semibold">E-commerce</span>
                    </Link>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/products">
                                <span className="hover:text-gray-300">Products</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </>
    )
}

export default layout