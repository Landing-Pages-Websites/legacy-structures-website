import { Resend } from "resend";
import { NextResponse } from "next/server";
import { BRAND } from "@/lib/constants";
import { sendMegaLead } from "@/lib/megaLead";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, email, phone, comment } = await request.json();

  try {
    await resend.emails.send({
      from: "Legacy Structures <onboarding@resend.dev>",
      to: BRAND.email,
      replyTo: email,
      subject: `Rent-to-Own Brochure Request – ${firstName} ${lastName}`,
      html: `
        <h2>Rent-to-Own Brochure Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${comment ? `<hr /><p><strong>Comment:</strong></p><p>${comment.replace(/\n/g, "<br />")}</p>` : ""}
      `,
    });
    // Forward to MEGA Keystone lead store (website lead). Non-blocking.
    await sendMegaLead({ firstName, lastName, email, phone, comment });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
