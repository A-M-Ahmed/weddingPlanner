import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarAlt,
  FaFemale,
  FaMale,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { FiCamera } from "react-icons/fi";
import { MdMeetingRoom } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";
import {
  CreateEventToSupabase,
  getEventById,
  updatingEventWedding,
} from "../lib/event";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { uploadingImage } from "../lib/storage";
import { format } from "date-fns";

const CreateWedding = () => {
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [location, setLocation] = useState("");
  const [dateWedding, setDateWedding] = useState(new Date());
  const [groomPic, setGroomPic] = useState(null);
  const [bridePic, setBridePic] = useState(null);
  const [meetLink, setMeetLink] = useState("");
  const { sendContentToAi, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ** unsplash
  const unsplash = import.meta.env.VITE_UNSPLASH_API;
  const { id } = useParams();
  const isEditedMode = Boolean(id);
  const navigate = useNavigate();
  // const handleImageUpload = async (file) => {
  //   const filePath = `${uuidv4()}-${file.name}`;
  //   // const { data, error } = await supabase.storage
  //   //   .from("wedding-photos")
  //   //   .upload(filePath, file);
  //   // if (error) return null;
  //   // const { data: publicURL } = supabase.storage
  //   //   .from("wedding-photos")
  //   //   .getPublicUrl(filePath);
  //   // return publicURL.publicUrl;
  //   return filePath;
  // };

  const navigator = useNavigate();
  useEffect(() => {
    if (isEditedMode) {
      const fetchEventById = async () => {
        setGroomPic("")
        setBridePic("")
        try {
          const weddingEvent = await getEventById(id);
          console.log("Event fetch by id ", weddingEvent);

          if (!weddingEvent) {
            console.log("Article fetch not exist", weddingEvent);
            return;
          }

          if (weddingEvent.createrId.id !== user.id) {
            toast.error("You don't have permission to edit");
            return navigator("/signin");
          }

          //* then now update all the states

          setGroomName(weddingEvent.groomName);
          setBrideName(weddingEvent.brideName);
          setLocation(weddingEvent.location);
          setMeetLink(weddingEvent.meetLink);
  
          //** */ @todo
          //          let newDateWedding = new Date(weddingEvent.dataWedding);
          // setDateWedding(format(newDateWedding, "yyyy-MM-dd HH:mm"));

          // if (article.featured_img) {
          //   setFeaturedImageUrl(article.featured_img);
          // } else {
          //   setFeaturedImageUrl("");
          // }
        } catch (error) {
          toast.error(`${error.message}`);
        }
      };

      fetchEventById();
    }
  }, [id, isEditedMode]);

    //  console.log("groomURL",groomPic)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login Thank you.");
      navigate("./signin");
      return;
    }
    if (isEditedMode) {
      if (!groomName.trim() || !brideName.trim()) {
        return toast("Please fill the form");
      }
    } else {
      if (!groomName.trim() && !brideName.trim()) {
        return toast("Please fill the form");
      }
    }

    if (!groomPic && !bridePic) {
      toast.error("Please select the images-");
      return;
    }

    setIsSubmitting(true);
    let weddingDataAll = null;
    try {
      let groomPicUrl = null;
   

        groomPicUrl = await uploadingImage(groomPic, user.id, "wedding-events");
   

      console.log("groomURL",groomPic)
      const { url: brideUrl } = await uploadingImage(
        bridePic,
        user.id,
        "wedding-events",
      );
      // setBridePic(brideUrl);

      console.log("data", {
        groom_name: groomName,
        bride_name: brideName,
        location,
        meet_link: meetLink,
      });
      let newEvent = {
        creater_id: user.id,
        groomName: groomName,
        brideName: brideName,
        groomPic: groomPicUrl.url,
        bridePic: brideUrl,
        location: location,
        dateWedding: dateWedding,
        meetLink: meetLink,
      };
      if (isEditedMode) {
        // update
        weddingDataAll = await updatingEventWedding(id, newEvent);
      } else {
        //* ai content
        const content = await sendContentToAi(
          groomName,
          brideName,
          dateWedding,
        );
        const unsplashImage = await fetchWeddingImage(unsplash);

        console.log("nweEvents",newEvent)
        newEvent = {
          ...newEvent,
          content: content,
          imageHero: unsplashImage,
        };
        weddingDataAll = await CreateEventToSupabase(newEvent);
        console.log("Data reached to the tabale", weddingDataAll);
        toast.success("Data created successfully 😊");
        setGroomPic("")
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("Failed to insert data:\n" + JSON.stringify(error, null, 2));
      return;
    } finally {
      setIsSubmitting(false);
    }
  };
  const fetchWeddingImage = async (unsplashKey) => {
    try {
      // Keywords to emphasize the venue/place itself, minimizing people
      const query =
        "wedding venue empty OR wedding ceremony location OR wedding reception setup OR chapel interior OR outdoor wedding space OR picturesque wedding spot";

      // Step 1: Get total pages for the query
      const countRes = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${unsplashKey}`,
      );
      const countData = await countRes.json();
      console.log("countData for initial query:", countData);
      const totalPages = Math.min(countData.total_pages, 100); // Unsplash limits to 100 pages for search results

      if (totalPages === 0) {
        return "no image available";
      }

      // Step 2: Pick a random page
      const randomPage = Math.floor(Math.random() * totalPages) + 1;

      // Step 3: Fetch random images from that page
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&page=${randomPage}&orientation=landscape&client_id=${unsplashKey}`,
      );
      const data = await res.json();

      const results = data.results;
      if (!results || results.length === 0) {
        // Fallback if the random page didn't yield results
        // Try fetching from page 1 as a last resort, or return no image
        const fallbackRes = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&page=1&orientation=landscape&client_id=${unsplashKey}`,
        );
        const fallbackData = await fallbackRes.json();
        const fallbackResults = fallbackData.results;
        if (!fallbackResults || fallbackResults.length === 0) {
          return "no image found";
        }
        const randomImage =
          fallbackResults[Math.floor(Math.random() * fallbackResults.length)];
        return randomImage.urls.regular;
      }

      // Step 4: Pick a random image from the retrieved results
      const randomImage = results[Math.floor(Math.random() * results.length)];

      return randomImage.urls.regular;
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      return "fallback-image.jpg"; // Optional default image
    }
  };

  return (
    <div className="relative">
      <div className="mx-auto max-w-xl px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 rounded-md bg-white px-6 py-8 pb-10 shadow shadow-indigo-300"
        >
          <h2 className="py-2 text-center text-xl font-bold uppercase">
            Create Wedding Event
          </h2>
          <div className="flex gap-2">
            <label className="flex-1">
              <span className="flex items-center gap-1 text-indigo-500">
                <FaMale /> Groom
              </span>
              <input
                type="text"
                placeholder="groom (male) name"
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                required
                className="w-full rounded border border-indigo-200 p-2 focus:outline-indigo-200"
              />
            </label>
            <label className="flex-1">
              <span className="flex items-center gap-1 text-indigo-600">
                <FaFemale /> Bride
              </span>
              <input
                type="text"
                placeholder="bride (woman) name"
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                required
                className="w-full rounded border border-indigo-200 p-2 focus:outline-indigo-200"
              />
            </label>
          </div>
          <div className="flex gap-2">
            <label className="flex-1">
              <span>
                Groom Picture{" "}
                <FiCamera className="ml-0.5 inline-block text-indigo-500" />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setGroomPic(e.target.files[0])}
            
              />
              {/* //* at todo later */}
              {/* {
              groomPic && <img src={groomPic} alt="" />
            } */}
            </label>
            <label className="flex-1 overflow-hidden">
              <span>
                Bride Picture{" "}
                <FiCamera className="ml-0.5 inline-block text-indigo-500" />
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBridePic(e.target.files[0])}
          
              />
            </label>
          </div>
          <label className="my-2 block">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-indigo-500" /> Location
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded border border-indigo-200 p-2 focus:outline-indigo-200"
            />
          </label>
          <label className="my-5 block">
            <span className="flex items-center gap-1">
              <MdMeetingRoom className="text-indigo-500" />
              Link meeting
            </span>
            <input
              type="text"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              required
              className="w-full rounded border border-indigo-200 p-2 focus:outline-indigo-200"
            />
          </label>
          <label className="my-5 cursor-pointer">
            <span className="my-2 flex items-center gap-1">
              <FaCalendarAlt className="text-indigo-500" /> Date & Time
            </span>
            <DatePicker
              selected={dateWedding}
              onChange={(newDate) => setDateWedding(newDate)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded border border-indigo-200 p-2 focus:outline-indigo-200"
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="my-2 mt-6 w-full cursor-pointer rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 disabled:bg-indigo-200"
          >
            {isSubmitting
              ? isEditedMode
                ? "updating..."
                : "Creating...."
              : isEditedMode
                ? "update"
                : "   Create Event "}
          </button>
          <button
            type="button"
            className="my-2 mt-6 w-full cursor-pointer rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 disabled:bg-indigo-200"
          >
            Cancel
          </button>
        </form>
        {/* <img src={groomPic} alt="" className="absolute left-0 w-[490px] h-[490px]  object-contain top-0"/>
      <img src={groomPic} alt="" className="absolute right-0 w-[490px] h-[490px]  object-contain top-0"/> */}
      </div>
    </div>
  );
};
export default CreateWedding;
