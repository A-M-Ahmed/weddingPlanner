import { useState } from "react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";

const RvspFormEvent = ({ eventId }) => {
  const [formData, setFormData] = useState({
    name: "",
    emailEvent: "",
    messageEvent: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitted:", formData);

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("guests")
        .insert({
          event_id: eventId,
          name: formData.name,
          email: formData.emailEvent,
          message: formData.messageEvent,
        })
        .select();

      if (error) {
        console.error("Failed to insert Data", error);
        throw error;
      }
      console.log("Data is successfully to insert", data);
      toast.success(
        "Wow We will contact you soon. Thank you for attending the wedding.",
      );
    } catch (error) {
      console.error("Error for insert RVSP message", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // console.log("Evnet for revsp",eventId)
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl rounded p-6 shadow"
      >
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          RSVP to the Event
        </h2>

        <label className="mb-4 block">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            required
          />
        </label>

        <label className="mb-4 block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="emailEvent"
            placeholder="Enter your name"
            value={formData.emailEvent}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            disabled={isSubmitting}
            required
          />
        </label>
        {/* <label className="mb-4 block">
          <span className="text-gray-700">Attend</span>
          <input
            type="checkbox"
            name="attend"
       
            // value={formData.emailEvent}
            // onChange={handleChange}
            className="  ml-3 inline-block"
            disabled={isSubmitting}
            required
          />
        </label> */}

        <label className="mb-6 block">
          <span className="text-gray-700">Message</span>
          <textarea
            name="messageEvent"
            rows="4"
            placeholder="Leave a message"
            disabled={isSubmitting}
            value={formData.messageEvent}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border p-2"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-500 px-6 py-2 text-white transition duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RvspFormEvent;
