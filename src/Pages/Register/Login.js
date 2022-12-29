import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../AuthProvider/AuthProvider';


 const LogInForm = () => {

    const {user,GoogleLogIn,LogInUser} = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider() ;
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    const {register, formState:{errors}, handleSubmit} = useForm ();
    const location = useLocation();
    const from  = location.state?.from?.pathname || "/"

      // useToken part 
    const [createdUserEmail,setCreatedUserEmail] = useState('')
    // const [token] = useToken(createdUserEmail)

    // if(token){
    //     navigate('/')
    // }

  // %%%%%%   handle sign up form  %%%%%%%%% 
    const handleLogIn = (data,e) => {
   
    LogInUser(data.email, data.password)
    // console.log(userType)
    .then(result => {
       const  userResult = result.user ;
       toast.success('Successfully Login ')
       e.target.reset()
        navigate( from ,{replace:true});
        // user verify with  email send from firebase
    })
    .catch(error => { 
        const err = error.message ;
        console.log(err)
        setError(err)
    })

    

  }

// user Sign up  by google 
    const GoogleLogin = () => {
        GoogleLogIn(googleProvider)
        .then(result => {
            const userResult = result.user ;
            const email = userResult.email;
            const name = userResult.displayName;
            
            // googleSignSaveUser(name,email)
            toast.success(" Google Log in successfull ")
            googleSignSaveUser(name,email)
        })
        .catch(err => {
            const error = err.message ;
            console.log(error)
            setError(error)
           
        })
   // make a function to save user info in database and get create token 
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
            console.log('save  user ',data)
            if(data.acknowledged){
                setCreatedUserEmail(email)
                navigate( from ,{replace:true});


            }                
  
        })
    }
    }
 
    return (
    <div className=' lg:w-96 w-11/12 mx-auto text-primary py-5 px-8  mb-5 shadow-lg  mt-3 '>
        <h2 className='text-2xl font-semibold text-center mb-6'> Log in   </h2>
      <form onSubmit={handleSubmit(handleLogIn) } > 

     

        <label className="label"> <span className=""> Email </span> </label>
        <input  type="email" {...register ("email",{required: "Email address is requerd"})}
         className="input input-bordered w-full  text-black"/>
         {errors.email && <p role='alert' className='text-red-600'> {errors.email.message}  </p>}
         
        <label className="label"> <span className=""> Password </span> </label>
        <input  type="password" {...register ('password',{required:"Password is requierd",
         minLength:{value:6, message:'Password should atleast 6 characters'}, })} className="input input-bordered w-full text-black "/> 
        {errors.password && <p role="alert" className='text-red-600'> {errors?.password.message}
        </p> }

        <br />

      
         {
           Error && <p className='text-red-600'> {error} </p>
         }
        <input type="Submit"  value={'Log in '}className="btn btn-primary mt-4 w-full" />
        <p className='my-2'> You  have  no account ? <Link to='/signup' className='text-blue-700 font-bold  ' >Sign  up  here  </Link> </p>
        <div className="divider ">OR</div>
      
       <button onClick={GoogleLogin} className='btn border-primary bordered btn-outline text-primary hover:btn-primary    w-full ' > Continue with google </button>

      </form>
        </div>
    );
};


export default LogInForm ;
