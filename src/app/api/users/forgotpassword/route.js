import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../helpers/mailer";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    console.log(reqBody);
    if (!email) {
      return NextResponse.json(
        { error: "pls enter your email please " },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }
    console.log(user);

    const response = await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });
    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
