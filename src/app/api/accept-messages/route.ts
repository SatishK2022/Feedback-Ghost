import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized access",
        }, { status: 401 });
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { isAcceptingMessage: acceptMessages },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Message acceptance status updated successfully",
            updatedUser
        }, { status: 200 });
    } catch (error) {
        console.error("Error accepting messages:", error);
        return Response.json({
            success: false,
            message: "Error accepting messages",
        }, { status: 500 });
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized access",
        }, { status: 401 });
    }

    const userId = user._id;

    try {
        const existingUser = await UserModel.findById(userId);

        if (!existingUser) {
            return Response.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            message: "Message acceptance status retrieved successfully",
            isAcceptingMessage: existingUser.isAcceptingMessage
        }, { status: 200 });
    } catch (error) {
        console.log("Error in getting acceptence messages:", error);
        return Response.json({
            success: false,
            message: "Error in getting acceptence messages",
        }, { status: 500 });
    }
}