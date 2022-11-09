
// https://alexb72.medium.com/how-to-send-emails-using-a-nodemailer-gmail-and-oauth2-fe19d66451f9

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email"
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import sanityClient from '@sanity/client'
import { google } from 'googleapis'

const config = {
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2022-03-13',
}
const client = sanityClient(config)

const OAuth2 = google.auth.OAuth2

const myOAuth2Client = new OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://www.tokenomicshub.xyz/api/auth/callback/google"
)

myOAuth2Client.setCredentials({
  refresh_token:  process.env.EMAIL_REFRESH_TOKEN,
});

const myAccessToken = myOAuth2Client.getAccessToken()

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      server: {
        service: 'gmail',
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_USER,
          clientId: process.env.EMAIL_CLIENT_ID,
          clientSecret: process.env.EMAIL_CLIENT_SECRET,
          refreshToken: process.env.EMAIL_REFRESH_TOKEN,
          accessToken: myAccessToken 
        }
      },
      from: process.env.EMAIL_FROM
    }),
    // SanityCredentials(client) // only if you use sign in with credentials
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  adapter: SanityAdapter(client)
}

export default NextAuth(authOptions)