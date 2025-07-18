// *insert event wedding 

import toast from "react-hot-toast";
import supabase from "./supabase";

export async function CreateEventToSupabase(newEvent) {

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
                content: newEvent.content
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



