import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// Validates the Supabase session from the request cookies.
// Returns true only if getUser() confirms a live authenticated session.
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();
    return user !== null;
  } catch {
    return false;
  }
}
