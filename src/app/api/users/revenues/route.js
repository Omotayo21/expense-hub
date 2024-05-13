
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { dataid, revenueItem } = reqBody;

    // Fetch the user document
    const user = await User.findById(dataid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add the new expense item to the user's expenses array
    user.revenues.push(revenueItem);
    console.log("sucessssfllll");
    // Save the updated user document
    await user.save();

    return NextResponse.json(user.revenues);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
