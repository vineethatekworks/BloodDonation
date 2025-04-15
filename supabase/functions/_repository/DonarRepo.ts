import { supabase } from "../_shared/database/dbconfig.ts";

export async function acceptDonationRequestRepo(requested_by: string, donor_id: string) {

    const { data, error } = await supabase
      .from("donation_requests")
      .update({ status: "accepted", accepted_by: donor_id })
      .eq("id", requested_by)
      .eq("status", "pending")
      .select();
    
    if (!data || error) {
      console.error("Error updating donation request: ", error);
      throw new Error(`Failed to accept donation request: ${error}`);
    }
    return data[0]; // Return the updated donation request data
}


export async function getNearbyRequests(donor_location: string, blood_group: string ) {
    const { data, error } = await supabase
      .from("donation_requests")
      .select("*")
      .eq("location", donor_location)
      .eq("blood_group_needed", blood_group)
      .eq("status", "pending");

    console.log(data);
    if (!data || error) {
      console.error("Error inserting into donation_requests:", error);
      throw new Error(`Failed to get nearby donation requests: ${error}`);
    }
    return data;
  } 
