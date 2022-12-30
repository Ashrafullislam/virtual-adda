import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaCamera, FaImage, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Loading from './../../../Loading/Loading';
import './About.css';


  const AboutMeInfo = () => {
    const {user,loading,updateUser} = useContext(AuthContext);
    const [error,setError] = useState(null);
    const {register, formState:{errors}, handleSubmit} = useForm();
    const imageHostKey = process.env.REACT_APP_IMAGEBB_API_KEY;
    const [load,setLoad] = useState('')


    // get all  users from database and set it ui 
  const url = `http://localhost:5000/aboutme/${user?.email}`;
  const {data:users = [], isLoading,refetch} = useQuery({
     queryKey:['user'],
     queryFn: async() => {
       const res = await fetch(url)
       const data = res.json() ;
       return data ;
     }        
  })
  console.log(users)


  // handlar for confiramtion 
  const imageUpdateMessage = () => {
    toast("Update processing now  , please waite for confirmation  message ")
  }

//============ user image upload handlar===============//
const userImageUpdateHandlar =  (data,event)  => {
    event.preventDefault()
    //  input image position 0 
    const image = data.userImage[0];
    const  formData = new FormData();
    // append image for post imagbb  with name  and value  ;
    formData.append('image', image);
    // hostin user profile img in imgbb
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url,{
        method:'POST',
        body:formData
    })
    .then(res => res.json())
    .then(imgData => {
        refetch()
        
        if(imgData.success){
            const imageUrl = imgData.data.url;
            const userImg = {userImg:imageUrl}
            toast.success("Profile picture has been uploaded")
            // send user profile image link in  database 
            fetch(`http://localhost:5000/updateUser/${user?.email}`,{
                method:'POST',
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(userImg)
                
            })
            .then(res => res.json())
            .then(updateImage => {
                if(updateImage.modifiedCount > 0){
                    refetch() 
                }
                // console.log(updateImage)
            } )
            // console.log(imageUrl)
        }
        // console.log(imgData)
    })
    .catch(error =>  {
        console.log(error)
        setError(error)
    })
    
  }

  // =============== user cover photo  like  as banner change or upload part =====================\\
  const userCoverPhotoUpdateHandlar =  (data,event)  => {
    event.preventDefault()
    //  input image position 0 
    const image = data.bannerImg[0];
    console.log(image,'banner file input')

    const  formData = new FormData();
    // append image for post imagbb  with name  and value  ;
    formData.append('image', image);
    // hostin user profile img in imgbb
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url,{
        method:'POST',
        body:formData
    })
    .then(res => res.json())
    .then(imgData => {
      refetch()
      if(imgData.success){
        const bannerImg = imgData.data.url;
        const userBanner = {userBanner:bannerImg}
        // send new banner image in backend to database 
          fetch(`http://localhost:5000/updateUser/coverphoto/${user?.email}`,{
                method:'POST',
                headers:{
                    'Content-Type':"application/json"
                },
                body: JSON.stringify(userBanner)
                
            })
            .then(res => res.json())
            .then( updateBanner  => {
              refetch()
              if(updateBanner.matchedCount > 0){
                toast.success('Cover photo has been successfully uploaded ')
              }
              // console.log(updateBanner,'updateBanner Image')
            })
        // console.log(userBanner,'userbanner ')
      }
      // console.log(imgData,'imgdata')
    } )
    .catch(err => {
      console.log(err.message)
      setError(err)
    })

  }
   

  if(loading){
    return <Loading> </Loading>
  }
  if(isLoading){
    return <Loading> </Loading>
  }

    return (
    <section>

            {/* banner of about me  */}
        <div className='w-full bg-info  h-56   relative'  >
             <img src={users?.userBanner} alt="Cover Img "  className='w-full h-full ' />

           <label  htmlFor="userImageBannerModal " className='bg-zinc-200 text-neutral float-right h-12 w-12 hover:bg-zinc-400 rounded-full bottom-3/4 relative border-none btn mr-4 '> <FaPen className='text-xl ' /> </label> 

            {/* user profile image modal  */}
            <label htmlFor="my-modal-3" className="  bottom-1/2 relative ">
            {
              users?.userImg ?
              <img  src={users?.userImg} alt='Profile '  className='w-36 h-36 rounded-full lg:ml-12 profile'/>
              :
             <>
              <FaCamera className='w-12 h-12 rounded-full lg:ml-12 ml-5 mt-8' />
              <span className='lg:ml-12 ml-5'> Add Profile  Picture </span>
             </>

            }
             </label>

            {/* <button  className=' bottom-1/2 relative' > </button>  */}
         </div>
        {
            users.length  === 0 && 
            <Loading> </Loading>
        }
    {/* Info  part of about me  */}
        <div className='flex justify-between  mt-24 px-6'>
          <div className='px-8 pb-5 lg:text-xl text-lg font-bold mt-8'> 
            <h2 > Name :{users?.name}  </h2>
                <br/>
              <h2> Email : {users?.email} </h2>
                <br/>
             <h2> Education : {users?.education}  </h2> 
                <br/>
            <h2> Institute : {users?.institute} </h2>   
            <br/>
            <h2> Address: {users?.address} </h2>         
        </div>
        
        <Link t className='mt-6   rounded-full btn bg-white border-none text-neutral hover:bg-gray-400' to={'/aboutmeupdate'}>  <FaPen />  </Link>
     </div>

     {/* user bannerImage upload modal part start */}
        <div>
          <input type="checkbox" id="userImageBannerModal " className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label htmlFor="userImageBannerModal " className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="text-lg font-bold"> Cover Photo  </h3>
                <p className="py-4">You can change this cover  photo </p>
                <div>
                <img src={users?.userBanner} className=' h-52  w-full' alt='Cover img ' />
             </div>
            <form className='mt-6'  onSubmit={handleSubmit(userCoverPhotoUpdateHandlar) }  >
            <div className='flex items-center justify-between'>
              <div className=' '>
              <FaImage className='text-primary text-2xl ml-7' />
              <input type='file'{...register('bannerImg')}/>
              </div>
              <input type='submit' onClick={imageUpdateMessage} className='btn bg-primary btn-sm border-none self-end text-white' value="  Save Change " />
            </div>
            </form>
          </div>
        </div>
      {/* user banner Image upload modal part end */}



    {/* User Image upload modal start  */}
    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
       <div className="modal">
         <div className="modal-box relative">
           <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold"> Update your profile picture  </h3>
             <div>
                <img src={users?.userImg} className=' h-52  w-full' alt='user profile pic' />
             </div>
            <form className='mt-6'  onSubmit={handleSubmit(userImageUpdateHandlar) }  >
         <div className='flex items-center justify-between'>
            <div className=' '>
              <FaImage className='text-primary text-2xl ml-7' />
              <input type='file'{...register('userImage')}/>
              </div>
              <input type='submit' onClick={imageUpdateMessage} className='btn bg-primary btn-sm border-none self-end text-white' value="  Save Change " />
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