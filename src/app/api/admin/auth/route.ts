import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Build a Supabase client that reads cookies from the request and writes
// them onto the response object — required pattern for Route Handlers.
function makeSupabase(req: NextRequest, res: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  // Response is created first so the Supabase client can attach session cookies to it.
  const response = NextResponse.json({ success: true });
  const supabase = makeSupabase(request, response);

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }
  return response;
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  const supabase = makeSupabase(request, response);
  await supabase.auth.signOut();
  return response;
}
