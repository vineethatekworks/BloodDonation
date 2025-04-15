import { getNearbyRequests } from "../../_repository/DonarRepo.ts";

export async function handleGetNearbyRequests(req: Request): Promise<Response> {
  console.log("Received request:", req);
  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed. Use GET." }), {
      status: 405,
    });
  }

  try {
    const { donor_location, blood_group } = await req.json();

    if (!donor_location || !blood_group ) {
      return new Response(JSON.stringify({
        error: "Missing required fields: donor_location or blood_group",
      }), { status: 400 });
    }

    const nearbyRequests = await getNearbyRequests(donor_location, blood_group );
    return new Response(JSON.stringify(nearbyRequests), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      details: error,
    }), { status: 500 });
  }
}
