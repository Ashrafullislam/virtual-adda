 import React from "react";

 const MediaCard = ({postData}) => {
 console.log(postData)
 const {hostingPostImg,date, message, postedUserId,postedUserEamil,postedUserName,_id,postedUserImg} = postData ;
 const handleReact = (e) => {
   const like = e.form.target.like.value ;
   console.log(like)
 }
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
          <img src={hostingPostImg} className="w-full  max-h-[70vh] " alt=" " />
        </figure>
        <div>
      <form onSubmit={handleReact} className="form-control">
  <label className="cursor-pointer label">
    <span className="label-text">Remember me</span>
    <input type="text"  name="like"  className="checkbox checkbox-secondary" />
  </label>
      </form>
        </div>
      </div>
      
    </div>
   );
 };

export default MediaCard;
