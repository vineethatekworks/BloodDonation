import { getMyRequestsRepo } from "../../_repository/ReceipentRepo.ts";

export async function GetMyRequestshandler(req: Request): Promise<Response> {
 
      // Check if the method is GET
      if (req.method !== "GET") {
        return new Response(
          JSON.stringify({ error: "Method Not Allowed. Use GET." }),
          { status: 405 }
        );
      }
    
      try {
        // Get user_id from query parameters
        const url = new URL(req.url);
        const user_id = url.searchParams.get("user_id");
    
        // Validate user_id
        if (!user_id) {
          return new Response(
            JSON.stringify({ error: "Missing required parameter: user_id" }),
            { status: 400 }
          );
        }
    
        // Fetch donation requests
        const requests = await getMyRequestsRepo(user_id);
    
        // If no requests found
        if (requests.length === 0) {
          return new Response(
            JSON.stringify({ message: "No donation requests found for this user" }),
            { status: 404 }
          );
        }
    
        // Return the donation requests
        return new Response(JSON.stringify(requests), { status: 200 });
      } catch (error) {
        console.error("Error in handleGetMyRequests:", error); // Log the full error
        return new Response(
          JSON.stringify({ error: "Internal Server Error", details: error }),
          { status: 500 }
        );
      }
    }
    