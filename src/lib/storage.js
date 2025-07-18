import { v4 as uuidV4 } from "uuid"
import supabase from "./supabase"
export const uploadingImage = async (file, userId, bucket = "featured-image") => {

    try {

        //* making file extensions
        const fileExt = file.name.split(".").pop().toLowerCase()

        //* giving a name the file

        const filename = `${uuidV4()}.${fileExt}`
        //* now generate file path
        const filePath = `${userId}/${filename}`

        //* now upload the image or file to supabase

        const { error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: true,
            })

        if (error) {
            console.log("Error for uploading image", error)
            throw error
        }

        //* if it is successfully to upload the image then get the url

        const { data: url } = supabase.storage.from(bucket).getPublicUrl(filePath)

        return {
            path: filePath,
            url: url.publicUrl
        }
    } catch (error) {

        console.error("Error uploading", error)
        throw error

    }
}