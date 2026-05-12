import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Alert } from "react-native";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const checkSession = async () => {
      try {
        const { session } = await supabase.auth.getSession();
        if (session) {
          const userData = await fetchUser(session.user.id);
          setUser(userData);
        } else {;
          setUser(null);
        }
        setLoading(false);
      } catch (err) {
        Alert.alert("error in checking the session");
        setLoading(false);
      }
    };
    checkSession();
    const {data: { subscription },} = supabase.auth.onAuthStateChange(async (_event, session) => {
      if(session){
        try{
          const userData = await fetchUser(session.user.id)
          setUser(userData)
        }catch(error){
        setUser(null)
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchUser = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      if (!data) throw new Error("User not found");

      const authUser = await supabase.auth.getUser();
      if (!authUser.data.user) throw new Error("Authenticated user not found");

      const userData = {
        id: data.id,
        name: data.name,
        username: data.username,
        email: authUser.data.user.email,
        profilePicture: data.profileImage_url,
        onboardingComplete: data.onboarding_Complete,
      };
      console.log("Fetched user data:", userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const signUp = async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    if (error) throw error;
    if (data.user) {
      const profiles = await fetchUser(data.user.id);
      setUser(profiles);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const updateUser = async (updates) => {
    if (!user) return;
    try {
      const updateData = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.profilePicture)
        updateData.profileImage_url = updates.profilePicture;
      if (updates.onboardingComplete !== undefined) {
        updateData.onboarding_Complete = updates.onboardingComplete;
      }

      console.log("Updating user with data:", updateData);
      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id);
      if (error) throw error;
    } catch (error) {
      console.error("Error updating user profile:", error);
      Alert.alert(
        "Failed to update profile",
        "An error occurred while updating your profile. Please try again.",
      );
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, updateUser, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
