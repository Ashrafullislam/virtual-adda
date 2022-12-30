import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaClock, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const AddPostModal = () => {
    const {user} = useContext(AuthContext);
    const [error ,setError  ] = useState(null)
    const {register, formState:{errors}, handleSubmit} = useForm();
    const imageHostKey = process.env.REACT_APP_IMAGEBB_API_KEY;
    

    // post confirmation message 
    const postConfirmation = () => {
      if(error == null){
        toast('Your post is now uploading . Please waite for confirmation ')

      }
    }


  // get about me information from  database
  const url = `http://localhost:5000/aboutme/${user?.email}`;
  const {
    data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(url)
      const data = res.json()
      return data;
    },
  });
  console.log(users);
  const postedUserImg  = users?.userImg ; 
  const postedUserName = user?.displayName ;
  const postedUserId = user?.uid ;
  const postedUserEamil = user?.email ;
  let d = new Date();
  let date = d.toLocaleDateString();
  console.log(user)

  // ============ post submit handlar  ================//
  const postSubmitHandlar = (data,event) =>  {
    event.preventDefault();
    const image = data.postImg[0];
    const message = data.postMessage ;
    if(image === undefined){
      setError('Please add a photo ')
      return 
    }
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
    .then(hostImg => {
      if(hostImg.success){
         const hostingPostImg = hostImg.data.url;
         const postInfoData = {hostingPostImg,message,postedUserImg,postedUserName,date,postedUserId,postedUserEamil}
         console.log(postInfoData,'postinfodata')
         fetch(`http://localhost:5000/postdata`,{
          method:'POST',
          headers:{
            'Content-type':'application/json',
            
          },
          body:JSON.stringify(postInfoData)
          
         })
         .then(res => res.json())
         .then( postData => {
          if(postData.acknowledged){
            toast.success('Successfully your post hasbeen  added ')
            event.target.reset()
          }
          console.log(postData)
         } )
         .catch(err => {
          setError(err.message)
         })
      }
    })
    .catch(err => {
       setError(err.message)
    })
  
  }


    return (
        <div>
            {/* Add post modal part start here  */}
      <input type="checkbox" id="addpost" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="addpost"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="text-lg font-bold">Create Post Now</h3>
          <div>
            {/* modal head image part  */}
          {users?.userImg ? (
            <img
              src={users?.userImg}
              className="w-16  h-16 rounded-full"
              alt="Profile"
            />
          )
         :
           (
            <div>
              <FaUserCircle className="text-primary text-5xl" />
            </div>
          )}
          </div>
          <p className="py-4">Share your post what do you want .</p>

          {/* form section  */}
          <form  onSubmit={handleSubmit(postSubmitHandlar) }>
            <textarea
              {...register('postMessage')}
              className="textarea w-full bg-warning"
              placeholder="What  do you want to talk about? "
            ></textarea>

            <div className="flex items-center justify-around">
              <div>
                <div class="wrapper">
                  <div class="file-upload flex flex-row-reverse items-center gap-2">
                  <input type="file" {...register('postImg')}/>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <FaClock className="text-2xl text-zinc-700" />
                <input
                  value={"Post"}
                  type="submit"
                  onClick={postConfirmation}
                  className="btn btn-primary text-white px-6 py-0 "
                />
              </div>
            </div>
          </form> 
          {
            error && <p className='text-error'> {error} </p>          }
        </div>
      </div>
      {/* Add post modal part end here  */}
        </div>
    );
};

export default AddPostModal;