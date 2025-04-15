import { User } from "../../_models/userModel.ts";
import { createUser } from "../../_repository/createuser.ts";
import { checkUserExist } from "../../_repository/UserRepo.ts";

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export async function signUpHandler(req: Request): Promise<Response> {
    try {
        const { email, full_name, blood_group, contact, location, password }:
            User = await req.json();

        // Field validation
        if (!email || !full_name || !blood_group || !contact || !location || !password) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
{
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        // Email format validation
        if (!isValidEmail(email)) {
            console.log("Invalid email format");
            return new Response(
                JSON.stringify({ error: "Invalid email format" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        // check user exists
        const existingUser = await checkUserExist(email);
        console.log("checking user exist");
        if (existingUser) {

            return new Response(
                JSON.stringify({ error: "User already exists" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
                );
        }
        // Call the repository to create a user
        const userData = {full_name, email, blood_group, contact, location, password};

        const jwtToken = await createUser(userData); 

        // Return the JWT token in the response
        return new Response(
            JSON.stringify({
                jwt_token: jwtToken,
                message: "User created successfully",
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error) {
        console.error("Error in sign-up handler:", error);
        return new Response(JSON.stringify({ message: error }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
