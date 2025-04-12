// deno-lint-ignore-file
import { User } from "../_models/userModel.ts";
import { insertUser } from "../_repository/UserRepo.ts";
import { supabase } from "../_shared/database/dbconfig.ts";


export const signupHandler = async (req: Request): Promise<Response> => {
  try {
    const body: User = await req.json();

    const { email, password, ...rest } = body;
    



    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: body.password ?? '', // Use the optional chaining operator to safely access the password property
      });


    if (authError) {
      return new Response(JSON.stringify({ error: authError.message }), {
        status: 400,
      });
    }

    // Step 2: Store user profile in 'users' table
    const { data, error } = await insertUser({ ...rest, email });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: authData.user,
      }),
      { status: 201 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err || "Unexpected error" }),
      { status: 500 },
    );
  }
};
