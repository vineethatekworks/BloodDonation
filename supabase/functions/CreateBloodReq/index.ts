import { createBloodRequestHandler } from "../_handlers/RecipientHandlers/createBloodRequestHandler.ts";


Deno.serve(createBloodRequestHandler);