import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Session-aware client for authenticated routes (reads session from cookies).
export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component context — middleware handles session refresh.
        }
      },
    },
  });
};

// Anon client for public reads (no session, no auth, subject to RLS SELECT policies).
export const createAnonClient = () =>
  createServerClient(supabaseUrl, supabaseKey, {
    cookies: { getAll: () => [], setAll: () => {} },
  });

// Service-role client — server-side Route Handlers only.
// Uses SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix — never sent to browser).
// Bypasses RLS entirely. Only needed if session-authenticated client is insufficient.
export const createServiceClient = () =>
  createServerClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );
