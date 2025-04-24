// deno-lint-ignore-file


//response method to use in every api
export function response(message: string, status: number, data?: any) {
    const body = data ? { message, data }: { message };
  
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
  