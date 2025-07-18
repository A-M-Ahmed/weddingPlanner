import { GoogleGenerativeAI } from "@google/generative-ai";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, signOut } from "../lib/auth";

const googleApi = import.meta.env.VITE_GOOGLE_API_KEY;
// import { Content } from './../../node_modules/@google/generative-ai/dist/server/types/content';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  //**  Stores the authenticated user's data (null if not logged in)
  const [user, setUser] = useState(null);
  //* Stores the user's profile details (null if not loaded)
  const [profile, setProfile] = useState(null);
  // * Controls loading state (true = show spinner, false = hide spinner)

  const [isLoading, setIsLoading] = useState(true);

  const [dataAi, setDataAi] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                        //* Gemini ai using for content                        */
  /* -------------------------------------------------------------------------- */
  const ai = new GoogleGenerativeAI(googleApi);
  const sendContentToAi = async (groomName,brideName,DateWedding) => {
    let content = `groom name : ${groomName} bride name ${brideName} date will happen the wedding,${DateWedding} make like 2 pragarah about this people `
    try {
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });


      const result = await model.generateContent(content);

      const responses = await result.response.text();

      setDataAi(responses);

      console.log(result);
      console.log(dataAi);
      return responses;
    } catch (error) {
      console.error("Gemini error:", error);
    }
  };
  useEffect(() => {
    const cleanUp = onAuthChange(async (user) => {
      setUser(user);

      if (user) {
        try {
          const useProfile = await getUserProfile(user.id);
          setProfile(useProfile);
        } catch (error) {
          console.log("Error fetching user Profile", error);
          throw error;
        }
      } else {
        setProfile(null);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    });

    return cleanUp;
  }, []);

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error for sign out", error);
    }
  };
  const values = {
    user,
    isLoading,
    logout,
    profile,
    isLoggedIn: !!user,
    dataAi,
    sendContentToAi,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

//* to use very where thsi hook

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
        "Ensure your component is wrapped inside <AuthProvider>."
    );
  }

  return context;
}
