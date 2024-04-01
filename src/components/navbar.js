import React from 'react'
import Link from 'next/link';

const Navbar = ({ toggleCart }) => {
  return (
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
                  <li>
                      <Link href="/add">
                          <span className="hover:text-gray-300">Add</span>
                      </Link>
                  </li>
                  <li>
                      <button onClick={toggleCart} className="hover:text-gray-300">Cart</button>
                  </li>
              </ul>
          </div>
      </nav>
  )
}

export default Navbar