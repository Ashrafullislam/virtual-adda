import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Pages/Shared/Footer/Footer';
import LeftSideUserInfo from '../../Pages/Shared/LeftSideUserInfo/LeftSideUserInfo';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import  './Main.css';

const Main = () => {
    return (
        <div className='' >
            <Navbar > </Navbar>
            <section className=" container w-11/12 mx-auto lg:flex mt-6 gap-8"  >
            <div className='lg:w-1/4 md:w-11/12 w-11/12 mx-auto left-side h-56 bg-white'>
               <LeftSideUserInfo> </LeftSideUserInfo>             
            </div>

            <div className='lg:w-3/4 md:w-11/12 w-11/12 mx-auto bg-white lg:mt-0 mt-8 '> 
            <Outlet > </Outlet>

            </div>
            </section>
            <Footer > </Footer>
        </div>
    );
};

export default Main;