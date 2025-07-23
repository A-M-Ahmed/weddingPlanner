import supabase from "./supabase"

export const contactUsers = async (userContact) => {

    try {

        const { data, error } = await supabase.from("contact").insert(userContact).select()
        if (error) throw error
        console.log("Contacted created", data)
        return data
        
    } catch (error) {

        throw new Error(`Oops! fialed to create contacted ${error.message}`)

    }

}