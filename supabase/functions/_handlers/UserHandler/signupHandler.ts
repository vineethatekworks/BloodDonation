import { User, UserSchema } from "../../_models/userModel.ts";
import { createUser } from "../../_repository/createuser.ts";
import { checkUserExist } from "../../_repository/UserRepo.ts";

export async function signUpHandler(req: Request): Promise<Response> {
    try {
        // Parse and validate the incoming JSON data using the User schema
        const requestData: User = await req.json();
        const validationResult = UserSchema.safeParse(requestData);

        // If validation fails, return the errors
        if (!validationResult.success) {
                const errors = validationResult.error.flatten().fieldErrors;
                return new Response(JSON.stringify({ errors }), {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                });
            
        }

        // Check if the user already exists
        const existingUser = await checkUserExist(validationResult.data.email);
        if (existingUser) {
            return new Response(
                JSON.stringify({ error: "User already exists" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // If the user doesn't exist, create a new user
        const user = await createUser(validationResult.data);
        return new Response(JSON.stringify({ message: "User created successfully", data: user }), {
            status: 201,
        });

    } catch (error) {
        console.error("Error in handler:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }}