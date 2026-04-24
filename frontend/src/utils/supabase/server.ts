import { createServerClient } from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = (req: NextApiRequest, res: NextApiResponse) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return Object.entries(req.cookies ?? {}).map(([name, value]) => ({
          name,
          value: value ?? "",
        }));
      },
      setAll(cookiesToSet) {
        const setCookie = cookiesToSet.map(({ name, value, options }) =>
          serialize(name, value, {
            path: "/",
            ...options,
          })
        );

        const existing = res.getHeader("Set-Cookie");
        const existingArr =
          typeof existing === "string"
            ? [existing]
            : Array.isArray(existing)
              ? existing
              : [];

        res.setHeader("Set-Cookie", [...existingArr, ...setCookie]);
      },
    },
  });
};

