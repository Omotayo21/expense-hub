import { NextRequest, NextResponse } from "next/server";

import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";

connect();

export async function handler(req, res) {
  try {

const { dataid, expenseId} = req.query;
    console.log(req)
    const user = await User?.findById(dataid);

    console.log(req)


  

    // Remove the expense from the user's expenses array
    user.expense.findByIdAndDelete(expenseId)
    await user.save(); // Save the updated user document

    console.log("Expense deleted successfully!");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// pages/api/users/expenses/[userId]/[expenseId].js



{/*export default async function handler(req) {
  const {
    query: { dataid, expenseId },
    method,
  } = req;



  switch (method) {
    case 'DELETE':
      try {
        if (!userId || !expenseId) {
          return res.status(400).json({ success: false, error: 'Missing user ID or expense ID' });
        }

        // Find the user that owns the expense
        const user = await User.findById(userId);

        if (!user) {
          return NextResponse.status(404).json({ success: false, error: 'User not found' });
        }

        // Find and remove the expense from the user's expenses array
        const updatedExpenses = user.expenses.filter(expense => expense._id !== expenseId);
        user.expenses = updatedExpenses;

        await user.save();

        return NextResponse.status(200).json({ success: true, data: {} });
      } catch (error) {
        return NextResponse.status(500).json({ success: false, error: error.message });
      }
    default:
      NextResponse.setHeader('Allow', ['DELETE']);
      return NextResponse.status(405).end(`Method ${method} Not Allowed`);
  }
}*/}
