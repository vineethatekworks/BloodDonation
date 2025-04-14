import { BloodRequest } from "../../_models/BloodRequestModel.ts";
import { createBloodRequestRepo } from "../../_repository/ReceipentRepo.ts";

export async function createBloodRequestHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body: BloodRequest = await req.json();

    const { requested_by, blood_group_needed, location, urgency } = body;
    if (!requested_by || !blood_group_needed || !location || !urgency) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const result = await createBloodRequestRepo(body);

    return new Response(JSON.stringify({ message: "Blood request created", data: result }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error in handler:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
