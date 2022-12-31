import React, { useContext, useState } from 'react';
import { FaHeart, FaRegHandPointRight, FaSmile } from 'react-icons/fa';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const LoveReact = ({_id,reactions}) => {
    const [hearts,setHearts]  = useState(0);
    const [like,setLike] = useState(0);
    const [smile,setSmile]  = useState(0);
    const [reactName,setReactName] = useState(null);
    const [postId,setPostId] = useState(null);
    // set reaction loaclstorage and get it 
    const {user} = useContext(AuthContext) 
    
  // get all  users from database and set it ui 
const url = `https://virtual-meet-server.vercel.app/aboutme/${user?.email}`;
  const {data:users = [], isLoading,refetch} = useQuery({
     queryKey:['user'],
     queryFn: async() => {
       const res = await fetch(url)
       const data = res.json() 
       return data ;
     }        
  })

 
    const total = hearts + like + smile ;
    if(total === 0){
      const newTotal = total + 1 ;
      console.log(newTotal,'new total ')
    }
    const heartHandlar = (_id) => {
        setHearts(hearts + 1)
        setReactName('Love')
        localStorage.setItem(reactName,hearts)
        // console.log(heartReaction)
        reactionPostHandlar(_id) 

  
    }
    
    const likeHandlar = (_id) => {
        setLike(like + 1) 
        setReactName('Like')
        reactionPostHandlar(_id) 

    }

    const smileHanlar = (_id) => {
        setSmile(smile + 1) 
        setReactName('Smile')
        reactionPostHandlar(_id) 

    }
  
    // comment handlar save comment 
    const commentHandlar = (e) => { 
    e.preventDefault();
     const comment = e.target.comment.value ;
     const commentSenderUid = user?.uid;
     const commentSenderEmail = user?.email ;
     const commentSenderImg = users?.userImg ;
     const postInfoId = postId ; 
     const postOwnerUid = users?.postedUserId;
     const postOwnerEmail = users?.postedUserEamil;
     const commentInfo = {comment,commentSenderUid,commentSenderEmail,commentSenderImg,postInfoId,postOwnerUid,postOwnerEmail}

     const url = `https://virtual-meet-server.vercel.app/comment`;
     fetch(url,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(commentInfo)
     })
     .then(res => res.json())
     .then(data => {
      if(data.acknowledged){
        toast.success('Your comment hasbeen send')
      }
      console.log(data,'comment')
     })
     .catch(err => {
      console.log(err)
     })
    }
  
    // reaction send data  base and save it 
    const reactionPostHandlar = (id) => {
      //  console.log(name,value)
       const reaction = {total}
       console.log(reaction)
      const reactionUrl = `https://virtual-meet-server.vercel.app/reactions/${id}`;
      fetch(reactionUrl,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(reaction)
      })
      .then(res =>res.json())
      .then(reaction => {
        if(reaction.modifiedCount > 0){

        }
      })
      .catch(err => {
        console.log(err)
      })

    }



    return (
      <section>
     <div className="  gap-4  my-5 px-8" >
      
      <div>
      <span className='font-bold'>  {reactions} </span>
      <span className='font-semibold text-blue-600'> {reactName} </span>
       
      </div>
    
      
       <div className=' flex gap-1 w-56  '>
        
        <div  className='w-8 h-16 '>
        <button onClick={()=>heartHandlar(_id)}>️  <FaHeart title='Love'    className='text-red-500 hover:text-red-600  text-2xl hover:text-3xl' /> </button>
        </div>

        <div className='w-8 h-16  ' >
        <button onClick={()=> likeHandlar(_id)}>️  <FaRegHandPointRight title='Like'  className='text-primary hover:text-blue-700 mx-auto text-2xl hover:text-3xl' /> </button>
        </div>

       <div  className='w-8 h-16 '>
       <button onClick={()=> smileHanlar(_id)}>️  <FaSmile title='Smile' className='text-amber-500 hover:text-amber-600 text-2xl hover:text-3xl mx-auto' /> </button>
       </div>

      </div>      
      </div>
      <div className=' flex gap-4 justify-between w-full '>
        <div className='w-28  '>
        <img src={users?.userImg} className='w-16 h-16 rounded-full ml-8'  alt=''  />
        </div>
         
        <form className='lg:w-11/12 md:w-10/12 w-10/12 mb-5' onSubmit={commentHandlar}>
        <textarea name='comment' className="textarea textarea-secondary w-full float-right py-0 mb-5 h-5 mt-1 mr-3 rounded-full" placeholder="Add your comment"></textarea>
        
        <input type='submit' onClick={()=>setPostId(_id)} value={'Post'} className='btn btn-primary btn-sm  ' />
        </form>
      </div>
    </section>
    );
};

export default LoveReact;