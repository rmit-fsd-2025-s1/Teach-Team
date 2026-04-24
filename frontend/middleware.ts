import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // Refresh session cookies (if any) on each request.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Refresh sessions for all routes except static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

