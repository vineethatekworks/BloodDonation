import { User } from "../_models/userModel.ts";
import { supabase } from "../_shared/database/dbconfig.ts";


export  async function insertUser(user: User) {
  const { data, error } = await supabase
    .from("user")
    .insert({
      full_name: user.full_name,
      email: user.email,
      blood_group: user.blood_group,
      contact: user.contact,
      location: user.location,
      role: user.role || ['donor'],
      available_to_donate: user.available_to_donate ?? false,
    })
    .select("*")
    .single();

  return { data, error };
};


//check user already exist or not
export async function checkUserExist(email: string) {

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .maybeSingle(); 

    console.log(data,error);
  if(error) throw error;
  return data;
};