import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const {
    firstName, lastName, email, phone,
    buildingType, buildingSize, sidingOption, roofOption,
    zipCode, state, message,
  } = await request.json();

  try {
    await resend.emails.send({
      from: "Legacy Structures <onboarding@resend.dev>",
      to: "stephen@legacystructuresusa.com",
      replyTo: email,
      subject: `New Quote Request – ${firstName} ${lastName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr />
        <p><strong>Building Type:</strong> ${buildingType || "Not specified"}</p>
        <p><strong>Building Size:</strong> ${buildingSize || "Not specified"}</p>
        <p><strong>Siding Option:</strong> ${sidingOption || "Not specified"}</p>
        <p><strong>Roof Option:</strong> ${roofOption || "Not specified"}</p>
        <p><strong>Zip Code:</strong> ${zipCode}</p>
        <p><strong>State:</strong> ${state}</p>
        ${message ? `<hr /><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>` : ""}
      `,
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
