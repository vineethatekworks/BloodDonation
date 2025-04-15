import { markDonationComplete } from "../../_repository/ReceipentRepo.ts";

export async function handleMarkDonationComplete(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed. Use POST." }), {
      status: 405,
    });
  }

  try {
    const { request_id, donor_id, recipient_id } = await req.json();

    if (!request_id || !donor_id || !recipient_id) {
      return new Response(JSON.stringify({
        error: "Missing required fields: request_id, donor_id, or recipient_id"
      }), { status: 400 });
    }

    const result = await markDonationComplete(request_id, donor_id, recipient_id);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      details: error,
    }), { status: 500 });
  }
}
