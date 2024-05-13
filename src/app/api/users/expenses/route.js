
import { NextRequest, NextResponse } from "next/server";

import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";

connect();


export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { dataid, expenseItem } = reqBody;

    // Fetch the user document
    const user = await User.findById(dataid);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add the new expense item to the user's expenses array
    user.expenses.push(expenseItem);
console.log('sucessssfllll')
    // Save the updated user document
    await user.save();

    return NextResponse.json(user.expenses);
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




// Implement validation functions (optional)
function validateExpenseId(expenseId) {
  // Check if expenseId is a valid Mongoose ObjectId
  return mongoose.Types.ObjectId.isValid(expenseId);
}

function validateUserId(userId) {
  // Check if userId is a valid Mongoose ObjectId (or your user ID format)
  return mongoose.Types.ObjectId.isValid(userId);
}
