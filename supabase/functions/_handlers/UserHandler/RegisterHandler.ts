import { User } from "../../_models/userModel.ts";
import { insertUser } from "../../_repository/UserRepo.ts";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function  RegisterHandler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user: User = await req.json();

    // Field validation
    if (
      !user.full_name ||
      !user.email ||
      !user.blood_group ||
      !user.contact ||
      !user.location
    ) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Email format validation
    if (!isValidEmail(user.email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data, error } = await insertUser(user);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Signup successful", user: data }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Invalid JSON or Server Error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
