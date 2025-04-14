
  export interface User {
    full_name: string;
    email: string;
    blood_group: string;
    contact: string;
    location: string;
    role?: string[]; // Optional (default = ['donor'])
    available_to_donate?: boolean; // Optional (default = false)
  }
  