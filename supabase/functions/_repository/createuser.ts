import { User } from "../_models/userModel.ts";
import { supabase } from "../_shared/database/dbconfig.ts";
  

export async function createUser(userData: Omit<User, 'id' | 'created_at'>) {
  const { full_name, email, blood_group, contact, location, role, available_to_donate,password } = userData;

  
  // Sign up the user with Supabase Auth
  const { data, error } = await supabase.auth.signUp({email,password });

  if (error) {
    console.error('Error signing up:', error.message);
    throw new Error(error.message);
  }

  // Insert user data into the 'user' table
  const { user, session } = data;

  const { error: insertError } = await supabase
    .from('user')
    .insert([
      {
        id: user?.id,
        full_name,
        email,
        blood_group,
        contact,
        location,
        role,
        available_to_donate,
      }
    ])
    .select("id");

  if (insertError) {
    console.error('Error inserting user data:', insertError.message);
    throw new Error(insertError.message);
  }

  // Return the JWT token (session.access_token) after successful sign-up
  return session?.access_token;  // Return the JWT token
}
