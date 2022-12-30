import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import AboutMeInfo from './AboutMeInfo';

const About = () => {
    const {user} = useContext(AuthContext);
   
 
    return (
        <div className='bg-white rounded-lg'>
           
             <div>
                <AboutMeInfo > </AboutMeInfo>  

             </div> 
        </div>
    );
};

export default About;  