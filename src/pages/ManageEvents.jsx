import {
    useEffect,
    useOptimistic,
    useState,
    useTransition,
} from "react";
import toast from "react-hot-toast";
import {
    FiAlertTriangle,
    FiEdit2,
    FiEye,
    FiLoader,
    FiPlus,
    FiTrash2
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { deleteEvent, getEventsByCreater } from "../lib/event";
import WeddingEvent from './WeddingEvent';

const ManageEvents = () => {
  /* -------------------------------------------------------------------------- */
  /*          //* States  ,the authuser , useOptimistic and useTransition           */
  /* -------------------------------------------------------------------------- */
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvent] = useState([]);
  const [errors, setErrors] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [eventDeleting, setEventDeleting] = useState(null); //? as object
  const [isDeleting, setIsDeleting] = useState(false); //? to be busy the user

  //* useOptimistic = means to see the update immediately
  const [optimisticEvents, updatedOptimisticEvents] = useOptimistic(
    events,
    (state, eventToRemove) =>
      state.filter((event) => event.id !== eventToRemove)
  );

 
  const [isPending, startTransitions] = useTransition();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchDataCreaterEvent = async () => {
    setIsLoading(true);
    try {
      const { events, count } = await getEventsByCreater(user.id, {
        limit: 100,
      });

      setEvent(events);
      setTotalCount(count);
      console.log("Successfully loaded or fetch", events);
      // toast.success("Successfully loaded");
    } catch (error) {
      console.error("Failed to load or fetch ", error);
      setErrors(error || "Failed to load");
      toast.error(`Failed to load or fetch ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };




  useEffect(() => {
  

  }, []);
  useEffect(() => {
    if (user) {
      fetchDataCreaterEvent();
      // console.log("woringkk");
        

    } else {
      navigate("/signin");
    }
  }, [user]);


  //* format the date

  const format = (dateToString) => {
    if (!dateToString) return "";

    const date = new Date(dateToString);
    console.log(date);
    return date.toLocaleDateString("en-Us", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  /* ------------------- //*confirmation of deleting a article to see modal or pop ------------------- */

  const confirmationDelete = (event) => {
    setEventDeleting(event);
  };
  /* -------------------------------------------------------------------------- */
  /*             //! handle delete it is the time to delete the article             */
  /* -------------------------------------------------------------------------- */

  const handleDelete = async () => {
    //* first check if articleDelete has data
    if (!eventDeleting) return;

    setIsDeleting(true);

    try {
      startTransitions(() => updatedOptimisticEvents(eventDeleting.id));
      setEvent((prev) =>
        prev.filter((prev) => prev.id !== eventDeleting.id)
      );
      setTotalCount((prev) => prev - 1);

      await deleteEvent(eventDeleting.id);
      setEventDeleting(null);
      toast.success("Deleting is Successfully");
      console.log("Deleting is Successfully");
    } catch (error) {
      console.error("Error deleting in compennt", error);
      fetchDataCreaterEvent();
    } finally {
      setIsDeleting(false);
    }
  };

  /* ---------------------- //*cancel deletatins for article --------------------- */

  const handleCancelDelete = () => {
    if (!eventDeleting) return;

   
    setEventDeleting(null)
  };
  return (
    <div className=" min-h-screen bg-gradient-to-b from-indigo-50 to-white bg-cover bg-no-repeat " style={{backgroundImage:`url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlZGRpbmclMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D)`}}>
      <div className="  py-10 px-12 backdrop-blur-md">
        {/* //* Hero Sections */}
        <div className="max-w-7xl mx-auto py-6 flex flex-col px-5 md:flex-row md:items-center md:justify-between">
          {/* //* manage articles */}
          <div>
            <h2 className="text-xl md:text-4xl capitalize font-bold tracking-wide  py-2 text-white">
              manage your wedding
            </h2>
            <p className="text-sm text-white">
              Create, edit and manage your wedding
            </p>
          </div>

          {/* //* button new create wedding */}
          <Link
            to="/create-event"
            className="bg-white py-2 px-8 rounded-md inline-flex  items-center font-medium content-center  text-indigo-700 text-lg cursor-pointer md:text-xl hover:bg-indigo-50 duration-200 hover:scale-102 capitalize"
          >
            <FiPlus className="mr-2 flex bg-amber-100 w-6 h-6 rounded-full" />{" "}
            create new wedding
          </Link>
        </div>
      </div>

      {/* //*Display articles */}

      <div className="py-5 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
          <div className="overflow-auto">
            {
              //* check first is loading
              isLoading ? (
                <div className="flex justify-center items-center py-3 ">
                  <div className="w-12 h-12 rounded-full border-b animate-spin border-indigo-500"></div>
                </div>
              ) : errors ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                  <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                  <h3 className="text-lg font-medium text-red-800 mb-2">
                    {errors}
                  </h3>
                  <button
                    onClick={fetchDataCreaterEvent}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              ) : optimisticEvents.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                    <FiPlus className="h-10 w-10 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    No Events wedding Yet
                  </h2>
                  <p className="text-gray-500 max-w-md mx-auto mb-8">
                    You haven't created any wedding yet. Start create your
                    first wedding and share it.
                  </p>
                  <Link
                    to="/create-event"
                    className=" inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-colors duration-200"
                  >
                    <FiPlus className="mr-2" />
                    Create Your First Wedding
                  </Link>
                </div>
              ) : (
                <div>
                  <h3 className="flex py-2 space-x-2.5 items-center">
                    <span className="capitalize font-bold tracking-wide text-xl md:text-2xl">
                      Wedding Events
                    </span>
                    {optimisticEvents.length > 0 && (
                      <span className="bg-green-300 w-8 h-8 rounded-full inline-flex justify-center items-center text-xl ">
                        {optimisticEvents.length}
                      </span>
                    )}
                  </h3>
                  {/* //* table */}
                  {optimisticEvents.length > 0 ? (
                    <div className=" rounded-md px-5 py-3 my-5 shadow-sm  backdrop-brightness-80 backdrop-blur-2xl">
                      <div className="">
                        <table className="divide-y-4 divide-gray-50 min-w-full">
                          <thead className="">
                            <tr className=" divide-x-4 divide-gray-50">
                              <th
                                scope="col"
                                className=" capitalize tracking-wide text-left px-2 py-2"
                              >
                                groom Name
                              </th>
                              <th
                                scope="col"
                                className=" capitalize tracking-wide text-left px-2 py-2"
                              >
                                bride Name
                              </th>
                              <th
                                scope="col"
                                className=" capitalize tracking-wide text-left px-2"
                              >
                                date
                              </th>
                              <th
                                scope="col"
                                className=" capitalize tracking-wide text-left px-2"
                              >
                                guests
                              </th>
                           
                              <th
                                scope="col"
                                className=" capitalize tracking-wide text-left px-2"
                              >
                                actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y-4 divide-gray-50 px-2 ">
                            {optimisticEvents.map((event, ind) => (
                              <tr
                                className={`divide-gray-50 p-2 md:divide-x-4 `}
                                key={event.id}
                              >
                                <td className="py-2">
                                  <div>{event.groomName}</div>
                                </td>
                                <td className="py-2">
                                  <div>{event.brideName}</div>
                                </td>
                                <td className="px-2">
                                  <div>{format(event.created_at)}</div>
                                </td>
                                <td className="px-2">
                                  <div>
                                    {event.singleEventGuest.map(
                                      (count) => count.count
                                    )}
                                  </div>
                                </td>
                               

                                {/* //* actins */}
                                <td className="px-2 ">
                                  <div className="flex justify-around">
                                    <Link
                                      title="view Article"
                                      to={`/weddingEvents/${event.id}`}
                                    >
                                      <FiEye className="text-indigo-500 hover:text-indigo-700 duration-150" />
                                    </Link>
                                    <Link
                                      title="create-event"
                                      to={`/create-event/${event.id}`}
                                    >
                                      <FiEdit2 className="text-indigo-500 hover:text-indigo-700 duration-150" />
                                    </Link>
                                    <button
                                      title="delete"
                                      onClick={() =>
                                        confirmationDelete(event)
                                      }
                                      className="cursor-pointer "
                                      type="button"
                                    >
                                      <FiTrash2 className="text-indigo-500 hover:text-indigo-700 duration-150" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                      <p className="text-gray-500">
                        You don't have any published wedding yet
                      </p>
                    </div>
                  )}
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* ---------------------------- //* display the modal --------------------------- */}
      {eventDeleting && (
        <div className="fixed inset-0 z-10 bg-indigo-500/50 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white rounded-md py-3 px-5 shadow-md w-full max-w-md">
            <h3 className="my-2 capitalize font-bold text-lg md:text-xl py-2">
              Confirm deletion
            </h3>
            <p className="text-gray-500 text-lg my-2">
              Are you sure to delete{" "}
              <span className="font-bold italic">
               Wedding
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2 py-3">
              <button
                onClick={handleCancelDelete}
                type="button"
                disabled={isDeleting}
                className="py-2 px-3 bg-gray-400 text-gray-100 cursor-pointer rounded-md shadow-sm text-lg disabled:bg-gray-300 disabled:cursor-not-allowed capitalize"
              >
                cancel
              </button>
              <button
                onClick={handleDelete}
                type="button"
                disabled={isDeleting}
                className="bg-rose-500 text-white py-2 px-3 rounded-md shadow-sm cursor-pointer flex items-center capitalize disabled:bg-red-300 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiTrash2 className=" mr-2" />
                )}
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
