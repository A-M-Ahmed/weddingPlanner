import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiMessageCircle, FiPhoneCall } from 'react-icons/fi';

const ContactPage = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-4">
            <div className="rounded-md p-4 shadow-md hover:-translate-y-2 translate-all duration-200">
              <div className="w-18 h-18 rounded-full bg-indigo-400 flex justify-center items-center mx-auto text-white ">
                <CiLocationOn size={"30px"} className=""/>
              </div>
              <h3 className="text-2xl font-medium my-3">Address</h3>
              <p className="text-gray-600 text-xl">somalia</p>
            </div>
            <div className="rounded-md p-4 shadow-md hover:-translate-y-2 translate-all duration-200">
              <div className="w-18 h-18 rounded-full bg-indigo-400 flex justify-center items-center mx-auto text-white">
                <FiMessageCircle size={"30px"} className=""/>
             
              </div>
              <h3 className="text-2xl font-medium my-3">  Email Us</h3>
            



              <p className="text-gray-600 text-xl">Wedding@gmail.com</p>
            </div>
            <div className="rounded-md p-4 shadow-md hover:-translate-y-2 translate-all duration-200">
              <div className="w-18 h-18 rounded-full bg-indigo-400 mx-auto flex justify-center items-center text-white">
                <FiPhoneCall size={"30px"} className=""/>
              </div>
              <h3 className="text-2xl font-medium my-3">Call Now</h3>
              <p className="text-gray-600 text-xl">777-8888-9999</p>
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
      <div className="max-w-7xl mx-auto my-22">
        <form action="" className="rounded-md shadow-lg bg-white w-full h-full grid grid-cols-1 md:grid-cols-2 p-16 gap-12">
          {/* //* name */}
          <label htmlFor="contactName ">
            <input type="text" placeholder="Enter your name" name="contactName" className="w-full p-4 border border-gray-400 rounded-sm focus:outline-indigo-400" />
          </label>
          {/* //* email */}
          <label htmlFor="contactEmail">
            <input type="email" placeholder="Enter your email" name="contactEmail" className="w-full p-4 border border-gray-400 rounded-sm focus:outline-indigo-400"/>
          </label>
          {/* //* phone */}
          <label htmlFor="contactPhone" className="col-span-1">
            <input type="number" placeholder="7777-8888-9999" name="contactPhone" className="w-full p-4  border border-gray-400 rounded-sm focus:outline-indigo-400" />
          </label>
          {/* //* message */}
       <textarea name="messageContact" placeholder="Enter your message here" className="w-full p-4 border border-gray-400 rounded-sm focus:outline-indigo-400" id="" rows={5} cols={5}></textarea>
       <div>

       <button className="py-2 px-5 rounded-md hover:bg-indigo-400 bg-indigo-500 text-lg text-white cursor-pointer" type="submit">Submit</button>
       </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
