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
            to: email,
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

// export async function POST() {
//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'Acme <onboarding@resend.dev>',
//             to: ['delivered@resend.dev'],
//             subject: 'Hello world',
//             react: VerificationEmail({ username: 'John' }),
//         });

//         if (error) {
//             return Response.json({ error }, { status: 500 });
//         }

//         return Response.json(data);
//     } catch (error) {
//         return Response.json({ error }, { status: 500 });
//     }
// }