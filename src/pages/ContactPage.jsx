import React from "react";
import { useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import { FiMessageCircle, FiPhoneCall } from "react-icons/fi";
import { contactUsers } from "../lib/contact";
import toast from "react-hot-toast";

const ContactPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // form
  const onSubmit = async (data) => {
    try {
     
      const response= await contactUsers(data);
        console.log("Success:", response);
      toast.success(
        "Thank you for contacting us. We will reach out to you as soon as possible.",
      );
    } catch (error) {
      console.log("Error for contact ");
       toast.error("Something went wrong. Please try again later.");
      throw error
    }
  };
  return (
    <div className="bg-gray-50">
      {/* //* hero section */}
      <div
        className={`relative min-h-[80vh] bg-cover bg-top bg-no-repeat`}
        style={{
          backgroundImage: `url("https://habibi-react.wpocean.com/static/media/page-title.a0b25eac647630380324.jpg")`,
        }}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 to-white/20"></div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-8 md:py-24 lg:px-12">
          <div className="flex flex-col items-center justify-center py-32">
            <p className="relative text-xl font-medium text-white md:text-4xl">
              {" "}
              Contact Us
            </p>
          </div>
        </div>
      </div>

      {/* contact address */}
      <section id="address" className="text-gray-100">
        <div className="mx-auto max-w-7xl py-40">
          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
            <div className="translate-all rounded-md p-4 shadow-md duration-200 hover:-translate-y-2">
              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-indigo-400 text-white">
                <CiLocationOn size={"30px"} className="" />
              </div>
              <h3 className="my-3 text-2xl font-medium">Address</h3>
              <p className="text-xl text-gray-600">somalia</p>
            </div>
            <div className="translate-all rounded-md p-4 shadow-md duration-200 hover:-translate-y-2">
              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-indigo-400 text-white">
                <FiMessageCircle size={"30px"} className="" />
              </div>
              <h3 className="my-3 text-2xl font-medium"> Email Us</h3>

              <p className="text-xl text-gray-600">Wedding@gmail.com</p>
            </div>
            <div className="translate-all rounded-md p-4 shadow-md duration-200 hover:-translate-y-2">
              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-indigo-400 text-white">
                <FiPhoneCall size={"30px"} className="" />
              </div>
              <h3 className="my-3 text-2xl font-medium">Call Now</h3>
              <p className="text-xl text-gray-600">777-8888-9999</p>
            </div>
          </div>
        </div>
      </section>
      {/* //Any question */}
      <section>
        <div className="mx-auto max-w-7xl py-12 pt-0">
          <div>
            <h3 className="text-center text-xl font-bold text-gray-900 md:text-4xl">
              Have Any Question?
            </h3>
          </div>
        </div>
      </section>
      <div className="mx-auto my-22 max-w-7xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid h-full w-full grid-cols-1 gap-12 rounded-md bg-white p-16 shadow-lg md:grid-cols-2"
        >
          {/* //* name */}
          <label htmlFor="contactName ">
            <input
              type="text"
              placeholder="Enter your name"
              name="contactName"
              className="w-full rounded-sm border border-gray-400 p-4 focus:outline-indigo-400"
              {...register("contactName", {
                required: "Please enter your name",
              })}
            />
            {errors.contactName && (
              <p className="text-red-500">{errors.contactName.message}</p>
            )}
          </label>
          {/* //* email */}
          <label htmlFor="contactEmail">
            <input
              type="email"
              placeholder="Enter your email"
              name="contactEmail"
              className="w-full rounded-sm border border-gray-400 p-4 focus:outline-indigo-400"
              {...register("contactEmail", {
                required: "Please enter your email",
              })}
            />
            {errors.contactEmail && (
              <p className="text-red-500">{errors.contactEmail.message}</p>
            )}
          </label>
          {/* //* phone */}
          <label htmlFor="contactPhone" className="col-span-1">
            <input
              type="number"
              placeholder="7777-8888-9999"
              name="contactPhone"
              className="w-full rounded-sm border border-gray-400 p-4 focus:outline-indigo-400"
              {...register("contactPhone", {
                required: "Please enter your number",
              })}
            />

            {errors.contactPhone && (
              <p className="text-red-500">{errors.contactPhone.message}</p>
            )}
          </label>
          {/* //* message */}
          <textarea
            name="messageContact"
            placeholder="Enter your message here"
            className="w-full rounded-sm border border-gray-400 p-4 focus:outline-indigo-400"
            id=""
            rows={5}
            cols={5}
          ></textarea>
          <div>
            <button
              disabled={isSubmitting}
              className="cursor-pointer rounded-md bg-indigo-500 px-5 py-2 text-lg text-white hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-indigo-300"
              type="submit"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
