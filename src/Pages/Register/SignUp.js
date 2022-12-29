import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../AuthProvider/AuthProvider';

 
 const SignUpForm = () => {

    const {user,createUser,GoogleLogIn,UpdateUser,VerifyUser} = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider() ;
    const [error,setError] = useState(null)
    const navigate = useNavigate();
    const imageHost = process.env.REACT_APP_imagehosting;
    const location = useLocation();
    const from  = location.state?.from?.pathname || "/"

    
    const {register, formState:{errors}, handleSubmit} = useForm ();
      // useToken part 
    const [createdUserEmail,setCreatedUserEmail] = useState('')
    // const [token] = useToken(createdUserEmail)

    // if(token){
    //     navigate('/')
    // }

  // %%%%%%   handle sign up form  %%%%%%%%% 
    const handleSignUp = (data,e) => {
      // const url = `https://api.imgbb.com/1/upload?key=${imageHost}` 

    createUser(data.email, data.password)
    // console.log(userType)
    .then(result => {
       const  userResult = result.user ;
       const userInfo = {displayName:data.name}
       UpdateUser(userInfo)
        .then(()=> { 
        // save user function call for created user data save in  database   
        VerifyUser(data.email)
        toast.success('Your account created successfull ')
        e.target.reset()
        navigate('/')
         saveUser(data.name,data.email)
        })
        .catch (err => { console.log(err.message)  } )
     
        // user verify with  email send from firebase
    })
    .catch(error => { 
        const err = error.message ;
        console.log(err)
        setError(err)
    })
   
    
    const saveUser = (name,email) =>  {
        const education = null ;
        const institute = null ;
        const address = null  ;
        const userImg = null ;
        const userBanner = null ;
        const user = {name,email,education,institute,address,userImg,userBanner};
        fetch(`http://localhost:5000/usersData`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(userData => {
        if(userData.acknowledged){
            setCreatedUserEmail(email)
        }

        })
        .catch(err => {
          const error = err.message;
          setError(error);
        })

    }

  }





   // user Sign up  by google 
    const GoogleLogin = () => {
        GoogleLogIn(googleProvider)
        .then(result => {
            const userResult = result.user ;
            const email = userResult.email;
            const name = userResult.displayName;
            googleSignSaveUser(name,email)
            toast.success(" Google Log in successfull ")

        })
        .catch(err => {
            const error = err.message ;
            console.log(error)
            setError(error)
           
        })

    // make a function to save user info in database  by google sign in
    const googleSignSaveUser = (name,email) => {
      const education = null ;
      const institute = null ;
      const address = null  ;
      const userImg = null ;
      const userBanner = null ;
        const user = {name,email,education,institute,address,userImg,userBanner};
        fetch(`http://localhost:5000/usersData`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                setCreatedUserEmail(email)
                
                
            }                
  
        })
        .catch(err =>  {
          setError(err.message)
        })
    }


    }
 
    return (
    <div className=' lg:w-96 w-11/12 mx-auto h-auto text-primary py-8 px-8  mb-5 shadow-lg  mt-3 '>
        <h2 className='text-2xl font-semibold text-center mb-6'> Sign up  </h2>
      <form onSubmit={handleSubmit(handleSignUp) } > 

      <label className="label"> <span className="">  Name </span> </label>
        <input  type="text" {...register ("name",{required: "Name  is requerd"})}
         className="input input-bordered w-full text-black "/>
         {errors.name && <p role='alert' className='text-red-600'> {errors.name.message}  </p>}
         

        <label className="label"> <span className=""> Email </span> </label>
        <input  type="email" {...register ("email",{required: "Email address is requierd"})}
         className="input input-bordered w-full text-black "/>
         {errors.email && <p role='alert' className='text-red-600'> {errors.email.message}  </p>}
         
        <label className="label"> <span className=""> Password </span> </label>
        <input  type="password" {...register ('password',{required:"Password is requierd",
         minLength:{value:6, message:'Password should atleast 6 characters'}, })} className="input input-bordered w-full text-black"/> 
        {errors.password && <p role="alert" className='text-red-600'> {errors?.password.message}
        </p> }

        <br />
      

       
        {/* <div div className="wrapper">
               <div className="file-upload" >
               <label  > Upload image </label>

                <input type="file" name="userImg" />
                 
                  </div>
                 
            </div>   */}

        {/* <label className="label"> <span className="">  Upload photo </span> </label>
        <input  type="file" {...register ("userImg",{required: true })}
         className="input input-bordered w-full text-black "/>
         {errors.userImg && <p role='alert' className='text-red-600'> {errors.userImg.message}  </p>} */}
        {
          error && <p className='text-error'> {error} </p>
        }
        <input type="Submit"  value={'Sign up '}className="btn btn-primary mt-4 w-full" />
        <p className='my-2'> Already have an account ? <Link to='/login' className='text-blue-700 font-bold ' >Log in  here  </Link> </p>
        <div className="divider ">OR</div>
      
       <button onClick={GoogleLogin} className='btn border-primary bordered btn-outline text-primary hover:btn-primary  w-full ' > Continue with google </button>

      </form>
     

        </div>
    );
};


export default SignUpForm ;
