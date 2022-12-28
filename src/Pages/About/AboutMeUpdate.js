import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../AuthProvider/AuthProvider';

 
 const SignUpForm = () => {

    const {user,UpdateUser,UpdateUserEmail} = useContext(AuthContext)
    const [error,setError] = useState(null)
    const navigate = useNavigate();
    const imageHost = process.env.REACT_APP_imagehosting;
    
    const {register, formState:{errors}, handleSubmit} = useForm ();
      // useToken part 
    const [createdUserEmail,setCreatedUserEmail] = useState('')
    // const [token] = useToken(createdUserEmail)

    // if(token){
    //     navigate('/')
    // }

    const handleUpdateUserForm = (data,e) => {
      // const url = `https://api.imgbb.com/1/upload?key=${imageHost}`
      const userInfo = {displayName:data.name}
      UpdateUser(userInfo)
      .then(()=> {
        // update  user name successull
        UpdateUserEmail(data.email)
        .then(()=> {
          toast.success("  User information has been updated")
        })
        .catch(err => {
            setError(err.message)
        })

      })
      .catch(err => {
        setError(err.message)
      })
    
     console.log(data)

 

    }
 
    return (
    <div className=' lg:w-10/12 mt-10  w-11/12 mx-auto h-auto text-primary py-8 px-8  mb-5 shadow-lg  '>
        <h2 className='text-2xl font-semibold text-center mb-6'> Update your information  </h2>
      <form onSubmit={handleSubmit(handleUpdateUserForm) } > 

      <label className="label"> <span className="">  Name </span> </label>
        <input  type="text" defaultValue={user?.displayName} {...register ("name")}
         className="input input-bordered w-full text-black "/>
         
         

        <label className="label"> <span className=""> Email </span> </label>
        <input  type="email" defaultValue={user?.email} {...register ("email")}
         className="input input-bordered w-full text-black "/>
         
         
        <label className="label"> <span className=""> Last Education   </span> </label>
        <input  type="text"  {...register ("education")}
         className="input input-bordered w-full text-black "/>

       <label className="label"> <span className=""> Institute name    </span> </label>
        <input  type="text"  {...register ("institute")}
         className="input input-bordered w-full text-black "/>
         
         <label className="label"> <span className="">  Address   </span> </label>
        <input  type="text"  {...register ("address")} 
         className="input input-bordered w-full text-black "/>
      
         {error && <p className='text-error'>  {error} </p> }
         <div className='w-10/12 mx-auto mt-8'>
         <input type="Submit"  value={'Save '}className="btn btn-primary  w-full " />

         </div>
        
        </form>
      </div>
    );
};


export default SignUpForm ;
