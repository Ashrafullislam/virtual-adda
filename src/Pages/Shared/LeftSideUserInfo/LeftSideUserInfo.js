import React, { useContext } from 'react';
import { AuthContext } from './../../../AuthProvider/AuthProvider';

const LeftSideUserInfo = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <h2 className='text-2xl font-bold'> {user?.displayName} </h2>
            
        </div>
    );
};

export default LeftSideUserInfo;