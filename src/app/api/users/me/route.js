import { getTokenData } from "../../../../helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";

connect();

export async function GET(NextRequest){
    try {
        const userId = await getTokenData(NextRequest);
        const user = await User.findOne({_id: userId}).select('-password');
        return NextResponse.json({
            message : "user found",
            data : user
        })
    } catch (error) {
        return NextResponse.json({ error : error.message}, {status:500}) 
    }
}