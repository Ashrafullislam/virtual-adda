import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import  './Main.css';

const Main = () => {
    return (
        <div className='' >
            <Navbar > </Navbar>
            <section className=" container w-11/12 mx-auto mt-6"  >
            <div className='w-1/4 left-side h-56 bg-white'>
                <h1> This page </h1>
             
            </div>

            <div className='w-3/4 bg-white  '> 
            <Outlet > </Outlet>

            </div>
            </section>
            <Footer > </Footer>
        </div>
    );
};

export default Main;