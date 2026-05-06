import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // In a real production app, you would integrate Resend, SendGrid, or Nodemailer here
    // to actually send an email to the agency. 
    
    // For this boilerplate, we'll just log it and return success to simulate API behavior.
    console.log("Contact Form Submission:", { name, email, message });

    return NextResponse.json({ success: true, message: "Message received successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
  }
}
