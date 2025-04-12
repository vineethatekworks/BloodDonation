export interface User {
    id?: string;
    full_name: string;
    email: string;
    password?: string; // only used during signup
    blood_group: string;
    contact: string;
    location: string;
    role?: string[]; // defaults to ['donor']
    available_to_donate?: boolean;
    created_at?: string;
  }
  