import React from "react";
import { FaClock, FaImage, FaListAlt, FaNewspaper, FaPlayCircle, FaUserCircle, FaVideo } from "react-icons/fa";
import './AddPost.css';

const AddPost = () => {
  return (
    <section className="w-full bg-white flex gap-4 py-7">
    
     <div className=" w-full">
        <div className="flex gap-3">
         {/* user image part */}
         <div>
          <FaUserCircle className="text-primary text-5xl" />
          </div>

           {/* input, text part  */}
               <div className="w-full">
                {/* The button to open modal */}
              <label htmlFor="addpost"  className=" btn post-modal btn-outline outline-neutral bg-white hover:bg-slate-100  w-10/12 hover:text-neutral text-neutral ">
             Start your post 
            </label>
         </div>
        </div>
       

        <div className="flex justify-start mt-4 flex-wrap lg:gap-12">
            <label htmlFor="addpost" className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning ">
                
             <FaImage className="text-primary text-2xl" /> Photo
            </label>

            <label   htmlFor="addpost" className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning">
                <FaPlayCircle className="text-orange-500 text-2xl " /> Video 
            </label>
         
            <label  htmlFor="addpost" className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning">
                <FaNewspaper className="text-cyan-600 text-2xl " /> Event  
            </label>
           
            <label  htmlFor="addpost" className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning">
                <FaListAlt className="text-yellow-500 text-2xl " /> Write Article 
            </label>
      </div>
    </div>
   

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="addpost" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">  
              <label
                htmlFor="addpost"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              
              <h3 className="text-lg font-bold">
                Create Post 
              </h3>
              <div>
                <FaUserCircle className="text-3xl text-neutral" />
              </div>
              <p className="py-4">
               Share your  post what do you want .
              </p>

           {/* form section  */}
            <form>
              <textarea name="message" className="textarea w-full bg-warning" placeholder="What  do you want to talk about? "></textarea>

            <div className="flex items-center justify-around">
            <div>
             <div class="wrapper">
               <div class="file-upload flex flex-row-reverse items-center gap-2">
                <input type="file" name="image" />
              
                  </div>
                 </div>
            </div>

            <div className="flex gap-3 items-center">
                <FaClock className="text-2xl text-zinc-700" />
                 <input  value={'Post'} type='submit' className="btn btn-primary text-white px-6 py-0 " />
            </div>
            </div>
          


              </form>
            </div>
          </div>
        
      
    </section>
  );
};

export default AddPost;
