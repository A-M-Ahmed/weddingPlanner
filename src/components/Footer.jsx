import React from "react";
import { AiFillMessage } from "react-icons/ai";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { FiFacebook, FiInstagram, FiLink, FiMap, FiMessageCircle, FiMessageSquare, FiPhone } from "react-icons/fi";
import Wave from "react-wavify";

const Footer = () => {
  return (
    <footer className="relative bg-indigo-500 pt-20">
      <div className=" ">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between space-y-3 divide-y divide-gray-400 px-5 text-white md:flex-row md:space-y-0 md:divide-y-0">
            {/* //* social media */}
            <div className="py-2">
              <h2 className="my-5 text-xl text-gray-200 hover:text-white lg:text-2xl">
                Wedding Planner
              </h2>

              <ul className="flex flex-col space-y-3 space-x-2 lg:flex-row lg:space-y-0">
                <li>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-center text-indigo-900 duration-200 hover:scale-105"
                  >
                    <FiFacebook size={"20px"} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-center text-indigo-900 duration-200 hover:scale-105"
                  >
                    <FiInstagram size={"20px"} />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-center text-indigo-900 duration-200 hover:scale-105"
                  >
                    <FiLink size={"20px"} />
                  </a>
                </li>
              </ul>
            </div>
            {/* //* useful links */}
            <div>
              <h2 className="my-5 text-xl text-gray-200 hover:text-white lg:text-2xl">
                Useful Links
              </h2>

              <ul className="flex flex-col space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Wedding Planning
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Decoration
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Food & Feast
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Team Members
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* //* About us */}
            <div>
              <h2 className="my-5 text-xl text-gray-200 hover:text-white lg:text-2xl">
                About Us
              </h2>

              <ul className="flex flex-col space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Career
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Our Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Weeding Package
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Team Members
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    Policy
                  </a>
                </li>
              </ul>
            </div>
            {/* //* */}
            <div>
              <h2 className="my-5 text-xl text-gray-200 hover:text-white lg:text-2xl">
                Contact Us
                
              </h2>

              <ul className="flex flex-col space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    <FiPhone className="inline-block mr-1"/>
                    777-8888-9999
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                   <FiMessageCircle  className="inline-block mr-1"/>
                   info@me.com
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-center text-gray-200 decoration-gray-400 transition-all duration-200 hover:scale-105 hover:text-white hover:underline"
                  >
                    <FiMap className="inline-block mr-1" />
                    somalia
                  </a>
                </li>
                
               
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Wave
        fill="#3f2accff"
        paused={false}
        style={{ display: "flex" }}
        className=""
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.15,
          points: 3,
        }}
      />
    </footer>
  );
};

export default Footer;
