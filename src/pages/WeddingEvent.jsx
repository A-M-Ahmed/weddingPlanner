import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getEventById } from "../lib/event";
import { format } from "date-fns";
import { remarkGfm } from "remark-gfm";
import ReactMarkdown from "react-markdown";
import removeMarkdown from "remove-markdown";
import ContactFormEvent from "../components/RvspFormEvent";
import RequestEmails from "../components/RequestEmails";

const WeddingEvent = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [weddingEventDataObj, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        if (!id) return;
        setIsLoading(true);
        const eventWedding = await getEventById(id);

        setEvents(eventWedding);
        // console.log("eventWedding.", eventWedding);
        // await new Promise(resolve => setTimeout(resolve, 5000))
      } catch (error) {
        console.error("Ops! there is error for fetching");
        console.error(
          `Error for view article by id${JSON.stringify(error, null, 2)}`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventById();

  }, [id, user]);



  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b border-b-orange-400"></div>
      </div>
    );
  }

  if (!weddingEventDataObj) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="my-2 text-xl font-medium text-gray-800 md:text-2xl">
            Wedding event not Found
          </h3>
          <p className="text-lg text-gray-600">
            The wedding you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/articles"
            className="my-2 inline-block text-xl font-medium tracking-wide text-blue-500 underline decoration-2 underline-offset-2"
          >
            Browser all weddings
          </Link>
        </div>
      </div>
    );
  }

  const plainText = removeMarkdown(weddingEventDataObj.content ?? "");
  // console.log("id for event",id)
  return (
    <div className="mb-25 min-h-screen bg-gray-100">
      {/* //* hero section */}

      {weddingEventDataObj.image_hero && (
        <div className="relative h-[70vh] w-full bg-gray-900">
          <img
            src={weddingEventDataObj.image_hero}
            alt={weddingEventDataObj.groomName}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#112021e6] to-transparent text-white">
            <h3 className="text-2xl font-medium lg:text-5xl">Events Details</h3>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl bg-gray-100 py-12">
        {/* //* display the two pictures */}
        <div className="my-12 rounded-md bg-white/20 py-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-md px-4 md:grid-cols-2 md:gap-2">
            {/* groom name */}
            <div className="relative h-[400px] overflow-hidden rounded-md">
              <img
                src={weddingEventDataObj.groomPic}
                alt={weddingEventDataObj.groomName}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
            <div className="h-[400px] w-full overflow-hidden rounded-md">
              <img
                src={weddingEventDataObj.bridePic}
                alt={weddingEventDataObj.brideName}
                className="w-full rounded-md object-cover duration-200 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* //* Date that wedding will happening  */}
        <div className="mx-auto my-12 max-w-4xl rounded-md bg-gray-300/30 p-6 md:py-12">
          <div className="px-2">
            <div className="flex justify-between">
              <div>
                <h3 className="my-3 text-xl font-medium text-gray-600">Date</h3>
                <p className="">
                  {format(weddingEventDataObj.created_at, "MMM dd, yyyy")}
                </p>
              </div>
              <div>
                <h3 className="my-3 text-xl font-medium text-gray-600">Time</h3>
                <p className="">{format(weddingEventDataObj.created_at, "h:mm a")}</p>
              </div>
              <div>
                <h3 className="my-3 text-xl font-medium text-gray-600">
                  Venue
                </h3>
                <p>{weddingEventDataObj.location}</p>
              </div>
              <div>
                <h3 className="my-3 text-xl font-medium text-gray-600">
                  Phone
                </h3>
                <p className="">000-8888-7777</p>
              </div>
            </div>
          </div>
        </div>

        {/* //* Here to Know About This Event */}
        <div>
          <h3 className="my-5 text-xl lg:text-4xl">
            Here to Know About This Event
          </h3>
          <div>
            <p className="text-lg leading-8">{plainText}</p>
          </div>
        </div>

        {/* //*Form RVSp and map */}
        <div className="my-7">
                {/* //* Comment section */}
   
        {/* //* then create the card */}
        <div className=" rounded-lg shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* //* then create component */}
          <div className="  py-8">
          <ContactFormEvent eventId = {id}/>
          </div>
          <div className="w-full">

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795828!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sug!4v1753033818874!5m2!1sen!2sug"   style={{border: 0}}  loading="lazy" className="w-full md:h-full h-70 " ></iframe>
          </div>
        </div>
   
        </div>
        {/* //* To display all requested people but should only see if the user and event same */}
        {
          user && user.id == weddingEventDataObj.creater_id && weddingEventDataObj.groomName == weddingEventDataObj.groomName && (
            <div className="my-5">

            <RequestEmails eventId = {id} weddingInfo = {weddingEventDataObj} />
            </div>
          )
        }
        <div>
      
        </div>
      </div>
    </div>
  );
};

export default WeddingEvent;
