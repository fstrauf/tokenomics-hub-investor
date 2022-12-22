
// // https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9

// import NextAuth from 'next-auth';
// import GitHub from 'next-auth/providers/github';
// import GoogleProvider from "next-auth/providers/google";
// import DiscordProvider from "next-auth/providers/discord"
// import EmailProvider from "next-auth/providers/email"
// // import TwitterProvider from "next-auth/providers/twitter";

// import { google } from 'googleapis'
// import prisma from '../../../lib/prisma';
// import { PrismaAdapter } from "@next-auth/prisma-adapter"

// const OAuth2 = google.auth.OAuth2

// const myOAuth2Client = new OAuth2(
//   process.env.EMAIL_CLIENT_ID,
//   process.env.EMAIL_CLIENT_SECRET,
//   "https://www.tokenomicshub.xyz/api/auth/callback/google"
// )

// myOAuth2Client.setCredentials({
//   refresh_token: process.env.EMAIL_REFRESH_TOKEN,
// });

// const myAccessToken = myOAuth2Client.getAccessToken()

// export const authOptions = {
//   providers: [
//     DiscordProvider({
//       clientId: process.env.DISCORD_CLIENT_ID,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET
//     }),
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }),
//     EmailProvider({
//       server: {
//         service: 'gmail',
//         auth: {
//           type: "OAuth2",
//           user: process.env.EMAIL_USER,
//           clientId: process.env.EMAIL_CLIENT_ID,
//           clientSecret: process.env.EMAIL_CLIENT_SECRET,
//           refreshToken: process.env.EMAIL_REFRESH_TOKEN,
//           accessToken: myAccessToken
//         }
//       },
//       from: process.env.EMAIL_FROM
//     }),
//     // SanityCredentials(client) // only if you use sign in with credentials
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'database'
//     // strategy: 'jwt'
//   },
//   // adapter: SanityAdapter(client)
//   adapter: PrismaAdapter(prisma),
//   callbacks: {
//     // async jwt({ token, user }) {
//     //   console.log("jwt user " + user)
//     //   if (user) {
//     //     token.id = user.id
//     //   }
//     //   return token
//     // },
//     async session({ session, token, user }) {
//       // console.log("user " + JSON.stringify(user))
//       // console.log("token " + JSON.stringify(token))
//       session.user.role = user.role; // Add role value to user object so it is passed along with session
//       return session;
//     }
//   },
// }

// export default NextAuth(authOptions)