import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import supabase from "../lib/supabase";
import fetchGuestByEventId from "../lib/guests";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const serviceId = import.meta.env.VITE_service_ID;
const templateId = import.meta.env.VITE_TEMPLATE_ID;
const apiEmail = import.meta.env.VITE_EMAIL_API;

const RequestEmails = ({ eventId, weddingInfo }) => {
  const { user } = useAuth();
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(true);
  const [isSendingId, setIsSendingId] = useState(null);

  // setIsSending(true)
  useEffect(() => {
    const fetchDataNow = async () => {
      const requestDataById = await fetchGuestByEventId(eventId);
      setRequestData(requestDataById);
      setIsSending(false);
    };

    fetchDataNow();
    // ** verify the supabase conneciton the table i want to use it and how many channels exist
    const verifySupabaseRealTime = async () => {
      try {
        //* check how many channles exist
        const existChannles = supabase.getChannels();
        console.log("Current channles exists", existChannles);

        //* check the connection your supabase

        const { data, error } = await supabase
          .from("guests")
          .select("count")
          .eq("event_id", eventId);

        if (error) {
          console.log(
            "Connection error to supabase spacial the guests table",
            error,
          );
        } else {
          console.log(
            "Connected is successfully to supabase guests table",
            data,
          );
        }
      } catch (error) {
        console.error("Error channles", error);
      }
    };
    verifySupabaseRealTime();

    /* -------------------------------------------------------------------------- */
    /*               then now clean all exist channles if they eist               */
    /* -------------------------------------------------------------------------- */

    supabase.getChannels().forEach((channel) => {
      console.log("Found channel", channel.topic);
      supabase.removeAllChannels(channel);
    });
    // ** now create the real time live
    // ** insert
    const guestChannels = supabase
      .channel(`guestsChannle-${eventId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT", //* or use "*" at one time
          schema: "public",
          table: "guests",
          // filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          console.log("Added new row", payload);
          fetchDataNow();
        },
      )

      // ** Deleting listen also you dont need to use filter
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "guests",
          // filter: `article_id=eq.${articleId}` //* will not get payload so dont use it
        },
        (payload) => {
          // ** you have two options
          //* option 1 to use this for large project like this
          console.log("Deleting data payload", payload);
          if (payload.old && payload.old.id) {
            setRequestData((prev) => {
              // ** first check this if exist
              const existGuest = prev.some(
                (eventW) => eventW.id == payload.old.id,
              );
              if (existGuest) {
                const deletedGuest = prev.filter(
                  (comment) => comment.id !== payload.old.id,
                );
                console.log(
                  "Deleted the comment in real time side",
                  deletedGuest,
                );
                return deletedGuest;
              } else {
                console.log("Nothing happen in the real time", prev);
                return prev;
              }
            });
          } else {
            console.log("Deleting data payload", payload);
          }

          // **==== option 2 you dont need to delet agian from UI just call the supabase data thsi for small project use it======
          // fetchComments()
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "guests",
          // filter: `article_id=eq.${eventId}`,
        },
        (payload) => {
          console.log("Updating guest is successfully payload", payload);
          fetchDataNow();
        },
      )
      .subscribe((status) => console.log("subscribe guestChannels", status));
    // console.log("evnet id inside of useevffet",eventId)
    //* then clean up
    return () => {
      // ** this line can be coused error to be remove the channel and see console websocet or connection fialed what you do is just do unsubscribe
      // supabase.removeAllChannels(commentChannels);
      guestChannels.unsubscribe();
    };
  }, [eventId]);

  const sendMeetingInvite = (guestName, guestEmail) => {
    emailjs
      .send(
        serviceId,
        templateId,
        {
          guest_name: guestName,
          guest_email: guestEmail,
          meeting_link: weddingInfo.meetLink,
        },
        apiEmail,
      )
      .then(() => {
        toast.success("Check the email");
        console.log("Meeting invite sent!");
        setIsSendingId(null);
      })
      .catch((err) => {
        setIsSending(null);
        console.error("Failed to send invite:", err);
      });
  };
  //** @ todo loading */
  return (
    <div className="my-3">
      <h3 className="my-3 text-2xl font-medium lg:text-2xl">
        Requests attendees: {requestData.length}
      </h3>
      {requestData.length === 0 ? (
        <div>
          <p>
            {" "}
            No one has RSVP'd yet. Please fill out the form if you'd like to
            attend the wedding.
          </p>
        </div>
      ) : (
        <>
          <table className="w-full rounded-md border border-slate-500 text-left">
            <thead>
              <tr>
                <th className="border border-slate-600 p-4 text-xl text-gray-500">
                  Name
                </th>
                <th className="border border-slate-600 p-4 text-xl text-gray-500">
                  Email
                </th>
                <th className="border border-slate-600 p-4 text-xl text-gray-500">
                  Status
                </th>
                <th className="border border-slate-600 p-4 text-xl text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {requestData.map((req) => (
                <tr key={req.id}>
                  <td className="border border-slate-600 p-4">{req.name}</td>
                  <td className="border border-slate-600 p-4">{req.email}</td>
                  <td className="border border-slate-600 p-4">pendding..</td>
                  <td className="border border-slate-600 p-4">
                    <div className="flex justify-between">
                      <button
                        disabled={req.id == isSendingId}
                        onClick={() => {
                          setIsSendingId(req.id);
                          sendMeetingInvite(req.name, req.email);
                        }}
                        className="inline-block cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-center text-xl text-white duration-200 hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-blue-400"
                      >
                        {req.id == isSendingId ? "Sending..." : "Send Link"}
                      </button>
                      <button className="inline-block cursor-pointer rounded-md bg-red-500 px-4 py-2 text-center text-xl text-white duration-200 hover:bg-red-400">
                        remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RequestEmails;
