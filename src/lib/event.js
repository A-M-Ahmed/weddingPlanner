// *insert event wedding 

import toast from "react-hot-toast";
import supabase from "./supabase";

export async function CreateEventToSupabase(newEvent) {
console.log("Insert payload:", {
  creater_id: newEvent.createrId,
  groomName: newEvent.groomName,
  brideName: newEvent.brideName,
  groomPic: newEvent.groomPic,
  bridePic: newEvent.bridePic,
  location: newEvent.location,
  dateWedding: newEvent.dateWedding,
  meetLink: newEvent.meetLink,
  content: newEvent.content,
  image_hero: newEvent.imageHero
});
    try {
        const { data, error } = await supabase.from("events")
            .insert({
                
                creater_id: newEvent.createrId,
                groomName: newEvent.groomName,
                brideName: newEvent.brideName,
                groomPic: newEvent.groomPic,
                bridePic: newEvent.bridePic,
                location: newEvent.location,
                dateWedding: newEvent.dateWedding,
                meetLink: newEvent.meetLink,
                content: newEvent.content,
                image_hero : newEvent.imageHero
            })
            .select()
            .maybeSingle()
        if (error) {
            console.log("Oops! Failed to insert data into table:", error);
          
        } else {
            console.log("Success! Data created successfully:",);
           
        }
        return data
    } catch (error) {
        throw new Error`Oops! Failed to insert data ${error}`
    }

}



//* get the events's user online

//* offset means skip e.g 2 means start 2 becoust array starts 0 , e.g offset = 5  means start 6
//* limit means take always the limet

export const getEventsByCreater = async (createrId, {  limit = 10, offset = 0 }) => {

    let query = supabase
        .from("events")
        .select(` 
                    *,
                    singleEventGuest : guests(count)
                    `, { count: "exact" })  //* <-- add this to get total count
        .eq('creater_id', createrId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1) //* range(start,end)

    const { data, error, count } = await query
    if (error) throw error

    return {
        events: data,
        count
    }

}

// * deleting article

export const deleteEvent = async (id) => {

    //* first check the id 
    console.log(`Attempting to delete event with ID:${id}  `)


    //* first delete comments from comment table
    try {

        const { error: guestsError } = await supabase
            .from("guests")
            .delete()
            .eq("event_id", id)
        //* check if it has error

        if (guestsError) {
            console.error("Error for comment", guestsError)
            toast.error(`Error deleting comment ${JSON.stringify(guestsError.message, null, 0)}`)
            throw guestsError

        } else {
            console.log("Deleting guestsError is successfull")
        }

        //* then delete the events 

        const { data, error } = await supabase
            .from("events")
            .delete()
            .eq("id", id)
            .select()

        if (error) {
            console.error("Failed to delete events", error)
            toast.error(`Ops! failed to delete events ${JSON.stringify(error.message, null, 0)}`)
            throw error
        }

        return data

    } catch (error) {

        throw new Error(`Faile to delete`, error)

    }
}


//** fetch the article or data */

export const getEventById = async (id) => {

    try {
        //* get the wedding and guests also the user name and its image profile
        const { data, error } = await supabase.from("events")
            .select(`*,
                    singleGuest: guests(id,
                    name,
                    email,
                    message,
                    created_at
                     
                       ),
         createrId:creater_id(id,username,avatar_url)`)
            .eq("id", id)
            .single()
        if (error) throw error
        return data
    } catch (error) {

        console.log("Failed to fetch events the wedding as id", error)
        throw error

    }
}


export const updatingEventWedding = async (id, updates) => {

    try {
        console.log(`updating wedding ${id}`, updates)


        const { data, error } = await supabase.from("events").update(updates)
            .eq("id", id)
            .select()
            .maybeSingle()

        if (error) {
            console.log("Updating wedding error", JSON.stringify(error, null, 2))
            toast.error(`Updating error ${error}`)
            throw error
        }

        console.log("Updating weddng is successfully", data)
        toast.success(`Updating wedding is successfull`)
    } catch (error) {

        throw new Error(`Error wedding updating ${error.message}`)
    }
}