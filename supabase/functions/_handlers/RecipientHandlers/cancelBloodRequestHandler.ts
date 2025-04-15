import { cancelBloodRequest } from "../../_repository/ReceipentRepo.ts";

export async function handleCancelBloodRequest(req: Request): Promise<Response> {
  console.log("Received request:", req);
  if (req.method !== "DELETE") {
    return new Response(JSON.stringify({ error: "Method Not Allowed. Use DELETE." }), {
      status: 405,
    });
  }

  try {
    const { request_id, user_id } = await req.json();

    if (!request_id || !user_id) {
      return new Response(JSON.stringify({
        error: "Missing required fields: request_id or user_id"
      }), { status: 400 });
    }

    const result = await cancelBloodRequest(request_id, user_id);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      details: error,
    }), { status: 500 });
  }
}
