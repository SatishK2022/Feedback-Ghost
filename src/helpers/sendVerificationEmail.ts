import { resend } from '@/lib/resend';
import VerificationEmail from '@/../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: "satish2106981396@gmail.com",
            subject: 'Feedback Ghost | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        return {
            success: true,
            message: "Verification email sent",
        }
    } catch (error) {
        console.log("Error Sending Verification Email:", error);
        return {
            success: true,
            message: "Failed to send verification email",
        }
    }
}