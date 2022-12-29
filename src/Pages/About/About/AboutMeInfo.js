import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaImage, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import banner from '../../../Images/Logo/logo.png'
import image from '../../../Images/Logo/logo1.png'
import Loading from './../../../Loading/Loading';


const AboutMeInfo = () => {
    const {user,loading,updateUser} = useContext(AuthContext);
    const {register, formState:{errors}, handleSubmit} = useForm();
    const imageHostKey = process.env.REACT_APP_IMAGEBB_API_KEY;
    const [load,setLoad] = useState('')
// user image upload handlar 
const userImageUpdateHandlar =  (data,event)  => {
    event.preventDefault()
    //  input image position 0 
    const image = data.userImage[0];
    const  formData = new FormData();
    // append image for post imagbb  with name  and value  ;
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url,{
        method:'POST',
        body:formData
    })
    .then(res => res.json())
    .then(imgData => {
        if(loading){
            setLoad('Loading')
        }
        if(imgData.success){
            const imageUrl = imgData.data.url;
            toast.success("Profile picture has been uploaded")


            console.log(imageUrl)
        }
        // console.log(imgData)
    })
    .catch(error =>  {
        console.log(error)
    })
    

}
if(loading){
    return <Loading> </Loading>
}


    return (
    <section>

            {/* banner of about me  */}
        <div className='w-full bg-info  h-40 relative'  >
             <img src={banner} alt="about banner "  className='w-full h-full ' />

           <label  htmlFor="userImageBannerModal " className='bg-zinc-200 text-neutral float-right h-12 w-12 hover:bg-zinc-400 rounded-full bottom-3/4 relative border-none btn mr-4 '> <FaPen className='text-xl ' /> </label> 

            {/* user profile image  */}
            <label htmlFor="my-modal-3" className="  bottom-1/2 relative"> <img  src={image} alt='profile'  className='w-24 h-24 rounded-full btn'/> </label>

            {/* <button  className=' bottom-1/2 relative' > </button>  */}
         </div>

    {/* Info  part of about me  */}
        <div className='flex justify-between  mt-20 px-6'>
          <div className='px-8 pb-5 lg:text-xl text-lg font-bold mt-8'> 
            <h2 > Name :  </h2>
                <br/>
              <h2> Email :  </h2>
                <br/>
             <h2> Education :  </h2> 
                <br/>
            <h2> Address : </h2>            
        </div>
        
        <Link t className='mt-4   rounded-full btn bg-white border-none text-neutral hover:bg-gray-400' to={'/aboutmeupdate'}>  <FaPen />  </Link>

        </div>

     {/* user bannerImage upload modal part start */}
        <div>
          <input type="checkbox" id="userImageBannerModal " className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label htmlFor="userImageBannerModal " className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
              </div>
          </div>
      {/* user banner Image upload modal part end */}



    {/* User Image upload modal start  */}
    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
       <div className="modal">
         <div className="modal-box relative">
           <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold"> Update your profile picture  </h3>
            
            <form className='mt-6'  onSubmit={handleSubmit(userImageUpdateHandlar) }  >
            <div className='flex items-center justify-between'>
              <div className=' '>
              <FaImage className='text-primary text-2xl ml-7' />
              <input type='file'{...register('userImage')}/>
              </div>
              <input type='submit' className='btn bg-primary btn-sm border-none self-end text-white' value="  Save Change " />
            </div>
          
            
            </form>
          
         </div>
        </div>
      {/* User Image upload modal end   */}

        </div>
      </section>
    );
};

export default AboutMeInfo;