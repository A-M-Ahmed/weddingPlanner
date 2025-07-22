import supabase from "./supabase"

import toast from "react-hot-toast";


//** fetching guests */
export const fetchGuestsAll = async () => {


    try {
        const { data, error } = await supabase.from("guests").select()
        if (error) {
            console.log("Error for fetching all guests", error)
            throw error
        }
        console.log("fetching data guests successed", data)
        return data
    } catch (error) {

        console.error("Error for fetching data guests", error)
        toast.error("Oops! failed to fecth guest all")
        throw error
    }
}


// * feching individuel based on event



export default async function fetchGuestByEventId(eventId) {

    try {
        const { data, error } = await supabase.from("guests").select().eq("event_id", eventId).order("created_at", { ascending: false })

        if (error) throw error

        return data
    } catch (error) {
        console.error("Error for fetching data from guests by eventID", error)
        toast.error("Oops! failed to fecth guest by eventId")
        throw error

    }

}

