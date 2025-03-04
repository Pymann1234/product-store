import React from 'react';
import { FaHome, FaPlus, FaStore } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-evenly">
        <div className="flex items-center space-x-2 text-white">
          <FaStore />
          <Link to="/"><h1 className="text-xl font-bold">Product Store</h1></Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white flex items-center space-x-2 hover:text-gray-400">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/create" className="text-white flex items-center space-x-2 hover:text-gray-400">
              <FaPlus />
              <span>Create</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;