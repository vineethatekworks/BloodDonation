export interface BloodRequest {
    requested_by: string;
    blood_group_needed: string;
    location: string;
    urgency: string;
    description?: string;
  }
  