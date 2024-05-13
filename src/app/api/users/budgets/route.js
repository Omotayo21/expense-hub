import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { dataid, budgetItem } = reqBody;

 
    const user = await User.findById(dataid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.budgets.push(budgetItem);
    console.log("sucessssfllll");
    await user.save();

    return NextResponse.json(user.budgets);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
