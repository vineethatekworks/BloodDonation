import { acceptDonationRequestRepo } from "../../_repository/DonaeRepo.ts";

export async function handleAcceptDonationRequest(req: Request): Promise<Response> {
  // Check if the method is PUT (since we're updating data)
  if (req.method !== "PUT") {
    return new Response(
      JSON.stringify({ error: "Method Not Allowed. Use PUT." }),
      { status: 405 }
    );
  }

  try {
    const { requested_by, donor_id } = await req.json();

    if (!requested_by || !donor_id) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: requested_by or donor_id" }),
        { status: 400 }
      );
    }

    // Call the repo function to accept the donation request
    const updatedRequest = await acceptDonationRequestRepo(requested_by, donor_id);

    // If the request could not be updated
    if (!updatedRequest) {
      return new Response(
        JSON.stringify({ error: "Failed to accept donation request" }),
        { status: 500 }
      );
    }

    // Return the updated request data
    return new Response(JSON.stringify(updatedRequest), { status: 200 });
  } catch (error) {
    console.error("Error in handleAcceptDonationRequest:", error); // Log the error for debugging
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error }),
      { status: 500 }
    );
  }
}
