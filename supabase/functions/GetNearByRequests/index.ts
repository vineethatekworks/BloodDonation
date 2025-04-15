import { handleGetNearbyRequests } from "../_handlers/DonarHandler/getnearbyrequests.ts";


Deno.serve(handleGetNearbyRequests);