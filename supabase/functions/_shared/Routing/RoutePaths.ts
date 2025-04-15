
export const USER_ROUTES = {
    REGISTER_USER: "/UserModule/register",
    UPDATE_PROFILE: "/UserModule/updateprofile/:id",
  };
  
  export const RECIPIENT_ROUTES = {
    CREATE_BLOOD_REQUEST: "/RecipientModule/createbloodrequest",
    CANCEL_BLOOD_REQUEST: "/RecipientModule/cancelbloodrequest/:id",
    GET_MY_REQUESTS: "/RecipientModule/getmyrequests/:userId",
    MARK_DONATION_COMPLETE: "/RecipientModule/markdonationascomplete/:requestId",
  };
  
  export const DONOR_ROUTES = {
    ACCEPT_DONATION: "/DonorModule/acceptdonation/:requestId",
    GET_NEARBY_REQUESTS: "/DonorModule/getnearbyrequests",
  };
  