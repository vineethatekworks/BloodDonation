import { handleAcceptDonationRequest } from "../_handlers/DonarHandler/AcceptDonationRequestHandler.ts";


Deno.serve(handleAcceptDonationRequest);