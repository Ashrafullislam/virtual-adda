// import { GoogleAuthProvider } from 'firebase/auth';
// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../../AuthProvider/AuthProvider';
// import useToken from '../../../Hook/UseToken/UseToken';


//  const SignUpForm = () => {

//     const {user,createUser,GoogleLogin,UpdateUser} = useContext(AuthContext)
//     const googleProvider = new GoogleAuthProvider() ;
//     const [error,setError] = useState(null)
//     const [signUpError , setSignUpError] = useState('')
//     const navigate = useNavigate()
//     const {register, formState:{errors}, handleSubmit} = useForm ();
//       // useToken part 
//     const [createdUserEmail,setCreatedUserEmail] = useState('')
//     const [token] = useToken(createdUserEmail)

//     if(token){
//         navigate('/')
//     }

//   // %%%%%%   handle sign up form  %%%%%%%%% 
//     const handleSignUp = (data,e) => {
//     const role = e.target.role.value;
//     const verify = "null";
//     createUser(data.email, data.password)
//     // console.log(userType)
//     .then(result => {
//        const  userResult = result.user ;
//        toast.success('User created successfull ')
//        const userInfo = {displayName:data.name}
//        UpdateUser(userInfo)
//         .then(()=> { 
//         // save user function call for created user data save in  database    
//          saveUser(data.name,data.email,role,verify)
//         })
//         .catch (err => { console.log(err.message)  } )
//         e.target.reset()
//         // user verify with  email send from firebase
//     })
//     .catch(error => { 
//         const err = error.message ;
//         console.log(err)
//         setSignUpError(err)
//     })

    
//     const saveUser = (name,email,role,verify) =>  {
//         console.log(name,email,role,'saveuser ')
//         const user = {name,email,role,verify};
//         fetch(`https://computer-reseller-server.vercel.app/users`,{
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body:JSON.stringify(user)
//         })
//         .then(res => res.json())
//         .then(userData => {
//         if(userData.acknowledged){
//             console.log(userData)
//             setCreatedUserEmail(email)
//         }

//         })
       
//     }
//   }

// // user Sign up  by google 
//     const GoogleLogIn = () => {
//         GoogleLogin(googleProvider)
//         .then(result => {
//             const userResult = result.user ;
//             const email = userResult.email;
//             const name = userResult.displayName;
//             googleSignSaveUser(name,email)
//             toast.success(" Google Log in successfull ")
//         })
//         .catch(err => {
//             const error = err.message ;
//             console.log(error)
//             setSignUpError(error)
           
//         })
//                // make a function to save user info in database and get create token 
//     const googleSignSaveUser = (name,email) => {
//         const user = {name,email,role:'buyer'};
//         fetch(`https://computer-reseller-server.vercel.app/users`, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body:JSON.stringify(user)
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log('save  user ',data)
//             if(data.acknowledged){
//                 setCreatedUserEmail(email)
//             }                
  
//         })
//     }
//     }
 
//     return (
//     <div className=' lg:w-96 w-11/12 mx-auto text-primary py-5 px-8  mb-5 shadow-lg  mt-3 '>
//         <h2 className='text-2xl font-semibold text-center mb-6'> Sign up  </h2>
//       <form onSubmit={handleSubmit(handleSignUp) } > 

//       <label className="label"> <span className="">  Name </span> </label>
//         <input  type="text" {...register ("name",{required: "Name  is requerd"})}
//          className="input input-bordered w-full "/>
//          {errors.name && <p role='alert' className='text-red-600'> {errors.name.message}  </p>}
         

//         <label className="label"> <span className=""> Email </span> </label>
//         <input  type="email" {...register ("email",{required: "Email address is requerd"})}
//          className="input input-bordered w-full "/>
//          {errors.email && <p role='alert' className='text-red-600'> {errors.email.message}  </p>}
         
//         <label className="label"> <span className=""> Password </span> </label>
//         <input  type="password" {...register ('password',{required:"Password is requierd",
//          minLength:{value:6, message:'Password should atleast 6 characters'}, })} className="input input-bordered w-full "/> 
//         {errors.password && <p role="alert" className='text-red-600'> {errors?.password.message}
//         </p> }

//         <br />

//         <label > Select account type buyer or seller </label>
//         <select   className="mt-3 select select-primary w-full max-w-xs" name='role' >
//         <option value="buyer">Buyer</option>
//         <option value="seller">Seller</option>
        
//          </select>
      
//          {
//             signUpError && <p className='text-red-600'> {signUpError} </p>
//          }
//         <input type="Submit"  value={'Sign up '}className="btn btn-primary mt-4 w-full" />
//         <p className='my-2'> Already have an account ? <Link to='/login' className='text-blue-700  ' >Log in  here  </Link> </p>
//         <div className="divider ">OR</div>
      
//        <button onClick={GoogleLogIn} className='btn border-primary bordered btn-outline text-primary hover:btn-primary    w-full ' > Continue with google </button>

//       </form>
//         </div>
//     );
// };


// export default SignUpForm ;
