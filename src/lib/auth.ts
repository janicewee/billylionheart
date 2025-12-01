import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
import { NextRequest } from 'next/server';
import { headers } from "next/headers"
import { db } from "@/db";
import * as schema from "@/db/schema";
 
export const auth = betterAuth({
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
		sendResetPassword: async ({ user, url }) => {
			// For development: Log the reset URL to console
			console.log("=".repeat(80));
			console.log("PASSWORD RESET REQUEST");
			console.log("=".repeat(80));
			console.log(`User: ${user.email}`);
			console.log(`Reset URL: ${url}`);
			console.log("=".repeat(80));
			
			// TODO: Integrate with email service (SendGrid, Resend, etc.)
			// Example with Resend:
			// await resend.emails.send({
			//   from: 'noreply@yourdomain.com',
			//   to: user.email,
			//   subject: 'Reset Your Password',
			//   html: `<p>Click <a href="${url}">here</a> to reset your password.</p>`
			// });
			
			// For now, return success since we're logging to console
			return;
		}
	},
	plugins: [bearer()]
});

// Session validation helper
export async function getCurrentUser(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user || null;
}