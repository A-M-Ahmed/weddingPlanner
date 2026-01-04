import { formatDate } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({
  eventWedd: {
    prepare: { username, avatar_url },
    groomName,
    brideName,
    id,
    content,
    created_at,
    image_hero,
 
  },
}) => {
  // ** to remove all tags
  const createHTML = (htmlContent) => {
    if (!htmlContent) return "";

    const textContent = htmlContent.replace(/<[^>]*>?/g, "");
    return textContent.substring(0, 150) + (textContent.length > 150
      ? "..."
      : "");
  };

  return (
    <div>
      <div  className="rounded-md shadow-md hover:-translate-y-2 group duration-500 ">
        {image_hero && (
          <div className=" overflow-hidden group-hover:rounded-md rounded-t-md h-48">
            <img
              src={image_hero}
              className="w-full h-full group-hover:scale-105 object-cover rounded-t-md duration-500  group-hover:rounded-md"
              alt=""
            />
          </div>
        )}
        <div className="px-6 py-12">
          {/* //* tagas */}
        
          {/* //* title  */}
          <Link className="py-2 block" to={`/weddingEvent/${id}`}>
            <h2 className="text-xl py-2 font-medium text-gray-900 hover:text-gray-950 duration-200 transition-colors">
              {groomName} & {brideName}
            </h2>
          </Link>
          {/* //* option 1 to dispayl */}
          {/* <p className="line-clamp-2" dangerouslySetInnerHTML={{__html : content}}>



          </p> */}
          <p>{createHTML(content)}</p>

          <div className="border-t border-gray-200 pt-3 pb-2 mt-4">
            <div className=" flex space-x-3 items-center">
              <img src={avatar_url} className="w-10 h-10 rounded-full object-cover" alt={username} />
              {/* //* content  and profile */}
              <div>
                <Link className="font-medium text-lg capitalize" to="/profile">{username}</Link>
                <p className="text-gray-500 mt-1 text-lg">{formatDate(created_at," MMM d, y")}</p>
              </div>
            </div>
            {/* //* */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
