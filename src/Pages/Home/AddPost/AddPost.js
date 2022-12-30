import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import {
  FaImage,
  FaListAlt,
  FaNewspaper,
  FaPlayCircle,
  FaUserCircle,
} from "react-icons/fa";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Loading from "../../../Loading/Loading";
import "./AddPost.css";
import AddPostModal from "./AddPostModal";

const AddPost = () => {
  const { user } = useContext(AuthContext);

  // get about me information from  database
  const url = `https://virtual-meet-server.vercel.app/aboutme/${user?.email}`;
  const {
    data: users = [], isLoading, refetch,} = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(url)
      const data = res.json()
      return data
    },
  });
  console.log(users);

  refetch();

  return (
    <section className="w-full bg-white flex gap-4 py-7 rounded-lg px-5">
      <div className=" w-full">
        <div className="flex gap-3">
          {/* user image part */}
          {users?.userImg ? (
            <img
              src={users?.userImg}
              className="w-16  h-16 rounded-full ml-5"
              alt="Profile"
            />
          )
         :
           (
            <div>
              <FaUserCircle className="text-primary text-5xl" />
            </div>
          )}

          {/* input, text part  */}
          <div className="w-full">
            {/* The button to open modal */}
            <label
              htmlFor="addpost"
              className=" btn post-modal btn-outline outline-neutral bg-white hover:bg-slate-100  w-10/12 hover:text-neutral text-neutral "
            >
              Start your post
            </label>
          </div>
        </div>

        <div className="flex justify-start mt-4 flex-wrap lg:gap-12">
          <label
            htmlFor="addpost"
            className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning "
          >
            <FaImage className="text-primary text-2xl" /> Photo
          </label>

          <label
            htmlFor="addpost"
            className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning"
          >
            <FaPlayCircle className="text-orange-500 text-2xl " /> Video
          </label>

          <label
            htmlFor="addpost"
            className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning"
          >
            <FaNewspaper className="text-cyan-600 text-2xl " /> Event
          </label>

          <label
            htmlFor="addpost"
            className="flex gap-3  btn bg-zinc-50 border-none text-neutral hover:bg-warning"
          >
            <FaListAlt className="text-yellow-500 text-2xl " /> Write Article
          </label>
        </div>
      </div>

      {/* Add post modal part start here  */}
      {/*  */}
      <AddPostModal  > </AddPostModal>
      {/* Add post modal part end here  */}
    </section>
  );
};

export default AddPost;
