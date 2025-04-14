import { createBloodRequestHandler } from "../../_handlers/RecipientHandlers/createBloodRequestHandler.ts";

type Path = "/recipientRequests/createBloodRequest";

type Handler = (req: Request) => Promise<Response>;

export const recipientPaths: Record<Path, Handler> = {
  "/recipientRequests/createBloodRequest": createBloodRequestHandler,
};

export function matchPath(pathname: string): Handler | null {
  return recipientPaths[pathname as Path] || null;
}
