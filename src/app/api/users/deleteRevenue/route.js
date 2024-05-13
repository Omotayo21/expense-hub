import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";

connect();



export async function DELETE(request) {
  try {
     console.log("Request received:", request); // Log entire request object
     const reqBody = await request.json();
   
    // Access data from request body
    const { dataid, revenueId } = reqBody; // Extract data from request body
  console.log("Request body:", reqBody); 
    const user = await User.findById(dataid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    

 user.revenues.pull(revenueId)

    await user.save();
    console.log("Revenue deleted successfully!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
