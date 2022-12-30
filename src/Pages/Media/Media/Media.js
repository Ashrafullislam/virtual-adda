import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import MediaCard from '../MediaCard';

const Media = () => {

// load all post data from database by react-query 

const url = `https://virtual-meet-server.vercel.app/postdata`;

 const {data:allPosts = [], isLoading,refetch} = useQuery({
    queryKey:['postdata'],
    queryFn: async() => {
        const res =   await  fetch(url)
        const data = res.json()
        return data  ;
    }
 })

 console.log(allPosts)
    return (
    <div className='  mx-auto  w-full  mb-4 rounded-lg '>
            <div className='rounded-md shadow-lg mb-4 h-24 py-5 px-6 bg-white '>
            <h2 className='font-semibold text-2xl my-3 items-center flex'> News Feed <FaBookOpen className='ml-2 text-2xl text-primary' /> </h2>
            </div>
          
            <div>
                {
                 allPosts.map(postsData => <MediaCard key={postsData._id} postData={postsData} > </MediaCard>)
                }
            </div>
        </div>
    );
};

export default Media;