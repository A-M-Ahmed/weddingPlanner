import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarAlt,
  FaFemale,
  FaMale,
  FaMapMarkerAlt
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import { FiCamera } from "react-icons/fi";
import { MdMeetingRoom } from "react-icons/md";
import { useAuth } from "../context/AuthProvider";

const CreateWedding = () => {
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [location, setLocation] = useState("");
  const [dateWedding, setDateWedding] = useState(new Date());
  const [groomPic, setGroomPic] = useState(null);
  const [bridePic, setBridePic] = useState(null);
  const [meetLink, setMeetLink] = useState("");
  const {sendContentToAi,dataAi} = useAuth();

  const handleImageUpload = async (file) => {
    const filePath = `${uuidv4()}-${file.name}`;
    // const { data, error } = await supabase.storage
    //   .from("wedding-photos")
    //   .upload(filePath, file);
    // if (error) return null;
    // const { data: publicURL } = supabase.storage
    //   .from("wedding-photos")
    //   .getPublicUrl(filePath);
    // return publicURL.publicUrl;
    return filePath;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const groomPicUrl = await handleImageUpload(groomPic);
    const bridePicUrl = await handleImageUpload(bridePic);
    const content = await sendContentToAi(groomName,brideName,dateWedding)

    console.log("data", {
      groom_name: groomName,
      bride_name: brideName,
      groom_pic: groomPicUrl,
      bride_pic: bridePicUrl,
      location,
      date_time: dateWedding.toISOString(),
      meet_link: meetLink,
      content
    });

    // const { data, error } = await supabase.from("wedding_events").insert([
    //   {
    //     groom_name: groomName,
    //     bride_name: brideName,
    //     groom_pic: groomPicUrl,
    //     bride_pic: bridePicUrl,
    //     location,
    //     date_time: date.toISOString(),
    //     meet_link: meetLink,
    //   },
    // ]);
    // if (!error) alert("Wedding created!");
  };

  return (
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
              required
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
              required
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
        <label className="my-5 block cursor-pointer">
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
          className="w-full cursor-pointer rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};
export default CreateWedding;
