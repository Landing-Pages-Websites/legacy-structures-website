import { Resend } from "resend";
import { NextResponse } from "next/server";
import { BRAND } from "@/lib/constants";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, email, phone, state, model, size, message } = await request.json();

  try {
    await resend.emails.send({
      from: "Legacy Structures <onboarding@resend.dev>",
      to: BRAND.email,
      replyTo: email,
      subject: `New Contact Form Submission – ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Model Interest:</strong> ${model || "Not specified"}</p>
        <p><strong>Size Interest:</strong> ${size || "Not specified"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
