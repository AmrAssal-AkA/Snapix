import { supabase } from "../lib/supabase";


export async function createPost(userId, body, file){
    try{
        const {data, error} = await supabase.from("posts").insert({body, userId, file});
        if(error){
            console.error("Error creating post:", error);
        }else{
            console.log("Post created successfully:", data);
        }
    }catch(error){
        console.error("Error creating post:", error);
    }
}