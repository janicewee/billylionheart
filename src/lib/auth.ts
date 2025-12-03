import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from 'next/server';
import { headers } from "next/headers"
import { db } from "@/db";
import * as schema from "@/db/schema";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
 
export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			user: schema.user,
			session: schema.session,
			account: schema.account,
			verification: schema.verification,
		}
	}),
	emailAndPassword: {    
		enabled: true,
		requireEmailVerification: false,
		sendResetPassword: async ({ user, url }) => {
			try {
				await resend.emails.send({
					from: 'Billy Lionheart <onboarding@resend.dev>',
					to: user.email,
					subject: 'Reset Your Password - Billy Lionheart',
					html: `
						<!DOCTYPE html>
						<html>
							<head>
								<meta charset="utf-8">
								<meta name="viewport" content="width=device-width, initial-scale=1.0">
							</head>
							<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
								<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
									<tr>
										<td align="center">
											<table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
												<!-- Header -->
												<tr>
													<td style="padding: 40px 40px 20px; text-align: center;">
														<h1 style="margin: 0; color: #0a0a0a; font-size: 24px; font-weight: 700;">
															🦁 Billy Lionheart
														</h1>
													</td>
												</tr>
												
												<!-- Content -->
												<tr>
													<td style="padding: 20px 40px 40px;">
														<h2 style="margin: 0 0 16px; color: #0a0a0a; font-size: 20px; font-weight: 600;">
															Reset Your Password
														</h2>
														<p style="margin: 0 0 24px; color: #525252; font-size: 16px; line-height: 1.6;">
															We received a request to reset your password for your Billy Lionheart account. Click the button below to set a new password:
														</p>
														
														<!-- Button -->
														<table width="100%" cellpadding="0" cellspacing="0">
															<tr>
																<td align="center" style="padding: 20px 0;">
																	<a href="${url}" style="display: inline-block; background-color: #0a0a0a; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
																		Reset Password
																	</a>
																</td>
															</tr>
														</table>
														
														<p style="margin: 24px 0 0; color: #737373; font-size: 14px; line-height: 1.6;">
															If you didn't request this password reset, you can safely ignore this email. This link will expire in 15 minutes.
														</p>
														
														<p style="margin: 16px 0 0; color: #737373; font-size: 14px; line-height: 1.6;">
															If the button doesn't work, copy and paste this link into your browser:
														</p>
														<p style="margin: 8px 0 0; color: #525252; font-size: 13px; word-break: break-all;">
															${url}
														</p>
													</td>
												</tr>
												
												<!-- Footer -->
												<tr>
													<td style="padding: 24px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
														<p style="margin: 0; color: #737373; font-size: 13px; text-align: center;">
															The Adventures of Billy Lionheart Book Community
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
				
				console.log("✅ Password reset email sent successfully to:", user.email);
			} catch (error) {
				console.error("❌ Failed to send password reset email:", error);
				throw error;
			}
		}
	},
	plugins: [bearer()]
});

// Session validation helper
export async function getCurrentUser(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}