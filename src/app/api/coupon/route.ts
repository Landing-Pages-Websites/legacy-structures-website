import { Resend } from "resend";
import { NextResponse } from "next/server";
import { BRAND } from "@/lib/constants";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { selectedState } = await request.json();

  try {
    await resend.emails.send({
      from: "Legacy Structures <onboarding@resend.dev>",
      to: BRAND.email,
      subject: `New Coupon Request – ${selectedState}`,
      html: `
        <h2>New Coupon Request</h2>
        <p>A visitor requested a coupon for the following state:</p>
        <p><strong>State:</strong> ${selectedState}</p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
