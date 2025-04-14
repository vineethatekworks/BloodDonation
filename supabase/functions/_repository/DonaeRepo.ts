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
