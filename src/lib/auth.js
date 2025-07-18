import supabase from "./supabase"

export async function signUp(email, password, username = "") {

    //** to sign up */

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options : {
                emailRedirectTo : "",
                data : {
                    username : username
                }
            }
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
                    username: displayName || data?.user?.user_metadata?.username,
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

///** sign in with auth */

export async function signIn(email, password) {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) throw error

        if (data?.user) {


            const profile = await getUserProfile(data?.user.id)
            console.log("Profile successfully", profile)
        }
        return data
    } catch (error) {
        throw new Error(`Sing-in ${error.message}`)
    }
}
//* The reason for this is to combine two things into one 1.for sing in, 2.authProvider
export async function getUserProfile(userId) {

    const { data, error } = await supabase.from("users")
        .select('*')
        .eq("id", userId)
        .single()

    //* if the user is not exist then create it now
    if (error && error.code === "PGRST116") {

        console.log('No profile found, attempting to create one for user:', userId)

        const { data: userData, error: userError } = await supabase.auth.getUser()


        console.log("True data", userData)

        const email = userData?.user?.email

        const defualtName = email ? email.split("@")[0] : `user_${Date.now()}`


        //* now create the user profile

        const { data: profile, error: profileError } = await supabase.from("users")
            .insert({
                id: userId,
                username: userData?.user?.user_metadata?.username || defualtName,
                email : userData?.user?.email,
                avatar_url: null
            })
            .select()
            .single()

        if (profileError) {
            console.log("Profile creation error", profileError)
        } else {
            console.log("Profile creation is successfully", profile)
        }

        return profile
    }


    if (error) {
        console.log("Error fetching profile", error)
        throw error
    }

    // console.log("Profile already exiting")
    return data

}
