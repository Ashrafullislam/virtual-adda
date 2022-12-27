import React from "react";
import { FaImage, FaUser, FaUserCircle } from "react-icons/fa";
import './AddPost.css';

const AddPost = () => {
  return (
    <section className="w-full bg-white flex gap-4 py-7">
      {/* user image part */}
      <div>
        <FaUserCircle className="text-priamary text-5xl" />
      </div>
      {/* input, text part  */}
      <div className="w-full">
        <div className="">
          {/* The button to open modal */}
          <label htmlFor="addpost"  className=" btn btn-outline btn-neutral outline-neutral bg-white hover:bg-slate-100  w-full hover:text-neutral text-neutral ">
           Start your post 
          </label>

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

            <form>
              <textarea name="message" className="textarea w-full " placeholder="What  do you want to talk about? "></textarea>

            <div>
             <div class="wrapper">
               <div class="file-upload">
                <input type="file" name="image" />
                 <FaImage/>
                  </div>
                 </div>
                 <label  > Upload image </label>
            </div>
           

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPost;
