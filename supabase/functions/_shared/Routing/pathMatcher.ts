import { matchPath } from "./recipientPaths.ts";

export async function requestHandler(req: Request): Promise<Response> {
  const { pathname } = new URL(req.url);

  // Match the path to the appropriate handler
  const action = matchPath(pathname);

  if (!action) {
    return new Response("Not Found", { status: 404 });
  }

  // Call the matched handler
  return await action(req);
}
