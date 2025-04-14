import { BloodRequest } from "../_models/BloodRequestModel.ts";
import { supabase } from "../_shared/database/dbconfig.ts";

export async function createBloodRequestRepo(request: BloodRequest) {
  const { data, error } = await supabase
    .from("donation_requests")
    .insert([request])
    .select()
    .single();

  if (error) {
    console.error("Error inserting into donation_requests:", error);
    throw error;
  }

  return data;
}



export async function getMyRequestsRepo(user_id: string)  {
  
    const { data, error } = await supabase
      .from('donation_requests')
      .select('*')
      .eq('requested_by', user_id);
        
    if (error) {
      console.error("Error inserting into donation_requests:", error);
      throw error;
    }
  
    return data;
}
