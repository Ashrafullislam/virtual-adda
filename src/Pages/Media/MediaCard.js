 import React from "react";
import LoveReact from "./Reactions/LoveReact";

 const MediaCard = ({postData}) => {
 const {hostingPostImg,date,reactions, message, postedUserId,postedUserEamil,postedUserName,_id,postedUserImg} = postData ;
 console.log(postData)
  return (
    <div className="mt-5 ">
      <div className="card w-full bg-white">
        <div className="card-body">
          <div>
             <div className="flex gap-4">
                <img src={postedUserImg} alt="" className="w-16 h-16  rounded-full " />
                <h2 className="text-2xl font-semibold"> {postedUserName} </h2>
             </div>
          </div>

          <p className="text-lg font-semibold"> {message} </p>
          <p> Posted Date: {date} </p>
        </div>
        <figure>
          <img src={hostingPostImg} className="w-full  h-full" alt=" " />
        </figure>
        <LoveReact key={_id} _id={_id} reactions = {reactions} > </LoveReact>
        <div>
  
        </div>
      </div>
      
    </div>
   );
 };

export default MediaCard;
