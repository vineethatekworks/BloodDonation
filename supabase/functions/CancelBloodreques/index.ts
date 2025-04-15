import { handleCancelBloodRequest } from "../_handlers/RecipientHandlers/cancelBloodRequestHandler.ts";


Deno.serve(handleCancelBloodRequest);