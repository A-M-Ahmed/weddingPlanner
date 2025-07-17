import supabase from "./supabase"

export async function signUp(email, password, username = "") {

    //** to sign up */

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if (error) {
            throw error
        } else {
            console.log("Auth successfully", data)
        }

        //** to check if the user is in data then create profile incase it has session */
        if (data?.user) {

            ///** first check if there is session or active user */
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

            //** to check if there is no session to return the data */
            if (!sessionData.session || sessionError) {
                console.log("No active session yet so profile will create on first sign in", sessionError)
                return data
            }
            //** if there is session */

            const displayName = username || email.split("@")[0]

            //* Now create profile
            const { data: ProfileData, error: profileError } = await supabase.from("users")
                .insert({
                    id: data?.user?.id,
                    username: displayName,
                    avatar_url: null
                })
                .select()
                .single()
            if (profileError) {
                throw profileError
            } else {
                console.log("Profile creation is successfully")
            }
        }
        return data

    } catch (error) {
        throw new Error(`${error.message}`)
    }

}
