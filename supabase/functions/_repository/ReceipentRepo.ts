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

export async function markDonationComplete( request_id: string, donor_id: string, recipient_id: string) {
    const { error: updateError } = await supabase
      .from("donation_requests")
      .update({ status: "completed" })
      .eq("status", "accepted")
      .eq("id", request_id);

    if (updateError) throw updateError;

    const { data, error: insertError } = await supabase
      .from("donations")
      .insert([{ request_id, donor_id, recipient_id }])
      .select();

    if (insertError) throw insertError;

    return data;
}


export async function cancelBloodRequest(request_id: string, user_id: string) {
    const { error } = await supabase
      .from("donation_requests")
      .delete()
      .eq("id", request_id)
      .eq("requested_by", user_id)
      .eq("status", "pending");

    if (error) throw error;
    return { message: "Request cancelled successfully." };
}
