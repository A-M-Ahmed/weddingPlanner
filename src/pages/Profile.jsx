import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineLinkedCamera } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";
import { CiMail, CiUser } from "react-icons/ci";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";
import { getUserProfile } from "../lib/auth";

const Profile = () => {
  const [avatar, setAvatar] = useState("");
  const { profile, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar_url, setAvatar_url] = useState(null);

//   const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    console.log("useEffect is running");
    if (user) {
      fetchProfile();
    }
  }, [user]);

  /* -------------------------------------------------------------------------- */
  /*          //* fetch the avatar_url and user name from the table             */
  /* -------------------------------------------------------------------------- */

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    try {
      const { username, avatar_url } = await getUserProfile(user.id);
      if (username) {
        setAvatar_url(avatar_url);
        setUsername(username);
      }
    } catch (error) {
      toast.error(`Error for fetching ${error.message}`);
    }
  }, [user]);

  // ** first to see the image as UI how does look like the avatar

  const handleAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 2 * 1024 * 1024) {
        toast.error("hey file is too large");
        console.log("working");
        return;
      }
      //* then upload to ui first

      const previw = URL.createObjectURL(file);

      // console.log(URL.createObjectURL(file));

      console.log("preview", previw); //** having blobs= so dont use direct this */
      setAvatar_url(previw);
      setAvatar(file); //* to take to the storage
    }
  };

  // console.log("avatar here", avatar)
  const handleChangeStatus = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let updates = {
      username: username,
    };
    try {
      if (avatar) {
        //*! first get the extention of the imge
        const fileExtention = avatar.name.split(".").pop();
        // console.log("fileEx", fileExtention);

        //* second get the file name with base of 36

        const fileName = `${user.id}-${Math.random().toString(36).substring(2)}`;
        // console.log("file name",fileName)

        //* new create the filepath

        const filePath = `profileAvatars/${fileName}.${fileExtention}`;
        // console.log("filepath", filePath)

        //* so now upload to the storage

        const { error: errorUpload, data: uploadData } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatar);

        if (errorUpload) throw errorUpload;

        if (uploadData) {
          toast.success("uploading success");
          // console.log(uploadData)
        }

        //* now the img is in the storage of avatars folder so get from the storage now of getUrl

        const { data: fetchAvatarUrl, error: errorAvatarUrl } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        if (errorAvatarUrl) throw errorAvatarUrl;

        console.log(fetchAvatarUrl);

        updates = {
          ...updates,
          avatar_url: fetchAvatarUrl.publicUrl,
        };
      }

      console.log("avarte after updatn username", { avatar, avatar_url });

      const { data: updatngProfile, error: updatngProError } = await supabase
        .from("users")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single(); //** or you can use maySingle() */

      if (updatngProError) throw updatngProError;

      //* if is success then updat teh usernam and avatar
      if (updatngProfile) {
        setAvatar_url(updatngProfile.avatar_url);
        setUsername(updatngProfile.username);
      }
    } catch (error) {
      throw toast.error(`${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen lg:py-12 py-4 sm:py-6">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-md shadow-md ">
          {/* //* Profile div */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 py-4 sm:py-6 lg:py-8  rounded-t-md flex flex-col items-center">
            {/* //* image div container */}
            <div className="flex flex-col items-center">
              {/* //* profile image */}
              <div className="relative ">
                <div className="w-32 h-32 border-4 border-white rounded-full  shadow-lg">
                  <img
                    src={
                      avatar_url || "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="user"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                {/* input image upload */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg rounded-full"
                >
                  <MdOutlineLinkedCamera className=" bg-white w-10 h-10 rounded-full text-indigo-500 p-2 " />
                </label>
                <input
                  type="file"
                  onChange={handleAvatar}
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            {/* //* profile context */}
            <div className="my-3 text-center">
              <h1 className="capitalize lg:text-2xl text-xl font-bold text-gray-50 my-2">
                {username || profile?.username}
              </h1>
              <p className="text-gray-200 font-medium text-lg tracking-wide">
                {user?.email}
              </p>
            </div>
          </div>
          {/* //* form */}
          <form onSubmit={handleChangeStatus} className="py-7 px-4">
            <div className="lg:space-y-6 space-y-4">
              <div className="">
                <label htmlFor="username" className="text-lg font-medium my-4 ">
                  Username
                </label>
                <div className="relative flex flex-col justify-center items-center my-2">
                  <div className="absolute top-50% left-3 flex justify-center items-center content-center h-7 w-7  ">
                    <CiUser className="w-full h-full  pointer-events-none " />
                  </div>
                  <input
                    type="text"
                    id="username"
                    disabled={isLoading}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="py-3 disabled:cursor-not-allowed disabled:bg-gray-200  px-4 pl-12 focus:outline-indigo-500  rounded-md shadow-md border-gray-300 border w-full text-lg"
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="email" className="text-lg font-medium my-4 ">
                  Email
                </label>
                <div className="relative flex flex-col justify-center items-center my-2">
                  <div className="absolute top-50% left-3 flex justify-center items-center content-center h-7 w-7  ">
                    <CiMail className="w-full h-full pointer-events-none " />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="py-3 px-4 pl-12 focus:outline-indigo-500 bg-gray-200 rounded-md shadow-md border-gray-300 border w-full text-lg"
                  />
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={handleChangeStatus}
                //   disabled={
                //     isLoading || username?.length <= profile?.username.length
                //   }
                  className="bg-indigo-500 py-2 px-8 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md shadow-sm cursor-pointer capitalize font-medium text-white"
                  type="submit"
                >
                  {isLoading ? "Saving..." : "Save change"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
