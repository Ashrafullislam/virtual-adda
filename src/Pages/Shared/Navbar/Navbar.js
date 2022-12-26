import React from 'react';
import { NavLink } from 'react-router-dom';
import {  FaPager, FaSignInAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from "react-icons/ai";



const Navbar = () => {



  const menu = 
  <> 
  <li> <NavLink to="/home" > <AiFillHome className='text-2xl text-blue-700' />Home </NavLink> </li>
  <li> <NavLink to="/media" > <FaPager className='text-2xl text-blue-700' /> Media </NavLink> </li>
  <li> <NavLink to="/about" > <FaUserCircle className='text-2xl text-blue-700' /> About </NavLink> </li>
  <li> <NavLink to="/login" >   <FaSignInAlt  className='text-2xl text-blue-700' /> Login </NavLink> </li>
  </>
    return (
        <div>
<div className="navbar bg-base-100 ">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        {menu}
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl"> <span className='text-3xl italic font-bold text-blue-700'>V</span>irtual <span className='text-blue-700 font-bold italic text-2xl'>M</span>  <span className='test'>eet</span> </a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {menu}
    </ul>
  </div>
  <div className="navbar-end">
    <div>
    <FaUser className='text-3xl  ' />
    </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;