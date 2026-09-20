import { resend } from "../config/resend.js";

export const sendOnboardingEmail = async (name,recipient) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Urban <onboarding@codewithankit.dev>',
            to: [recipient],
            subject: "Welcome to Urban — We're glad you're here! 🛍️",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Welcome to Urban</title>
                </head>

                <body style="
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f5;
                    font-family: Arial, Helvetica, sans-serif;
                ">

                    <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        style="padding: 40px 20px;"
                    >
                        <tr>
                            <td align="center">

                                <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    style="
                                        max-width: 560px;
                                        background-color: #ffffff;
                                        border-radius: 14px;
                                        overflow: hidden;
                                    "
                                >

                                    <!-- Header -->
                                    <tr>
                                        <td style="
                                            background-color: #111111;
                                            padding: 30px;
                                            text-align: center;
                                        ">
                                            <h1 style="
                                                margin: 0;
                                                color: #ffffff;
                                                font-size: 30px;
                                                letter-spacing: 1px;
                                            ">
                                                Urban
                                            </h1>
                                        </td>
                                    </tr>

                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 45px 40px;">

                                            <h2 style="
                                                margin: 0 0 20px;
                                                color: #18181b;
                                                font-size: 24px;
                                            ">
                                                Welcome, ${name}! 👋
                                            </h2>

                                            <p style="
                                                margin: 0 0 18px;
                                                color: #52525b;
                                                font-size: 15px;
                                                line-height: 1.7;
                                            ">
                                                We're really happy to have you with us.
                                                Your Urban account has been successfully
                                                created and you're ready to get started.
                                            </p>

                                            <p style="
                                                margin: 0 0 30px;
                                                color: #52525b;
                                                font-size: 15px;
                                                line-height: 1.7;
                                            ">
                                                Discover products, explore new styles,
                                                and enjoy a simple shopping experience
                                                built for you.
                                            </p>

                                            <!-- CTA -->
                                            <div style="text-align: center; margin: 35px 0;">
                                                <a
                                                    href="https://urban.codewithankit.dev"
                                                    style="
                                                        display: inline-block;
                                                        padding: 14px 28px;
                                                        background-color: #111111;
                                                        color: #ffffff;
                                                        text-decoration: none;
                                                        border-radius: 8px;
                                                        font-size: 14px;
                                                        font-weight: bold;
                                                    "
                                                >
                                                    Start Exploring
                                                </a>
                                            </div>

                                            <p style="
                                                margin: 30px 0 0;
                                                color: #71717a;
                                                font-size: 13px;
                                                line-height: 1.6;
                                            ">
                                                If you didn't create an Urban account,
                                                please ignore this email.
                                            </p>

                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td style="
                                            padding: 22px 40px;
                                            background-color: #fafafa;
                                            text-align: center;
                                        ">
                                            <p style="
                                                margin: 0;
                                                color: #a1a1aa;
                                                font-size: 12px;
                                            ">
                                                © ${new Date().getFullYear()} Urban.
                                                All rights reserved.
                                            </p>
                                        </td>
                                    </tr>

                                </table>

                            </td>
                        </tr>
                    </table>

                </body>
                </html>
            `,
        });
        if (error) {
            throw new error.message;
        }
        return data;
    } catch (error) {
        console.error('Error while sending onboaring emails', error);
        throw new Error(error);
    }
}