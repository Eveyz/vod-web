import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'
import { ADMIN, DEVELOPER, VALIDATOR, GATEKEEPER } from "../../../helper/constants";

/* 

Reference: https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696

1. The accessToken should have a relatively short life span, let’s say 24 hours.
2. The refreshToken on the other hand should be long-lived, with an expiry time of let’s say 30 days. It will be used to obtain new accessTokens.
3. The accessTokenExpiry is a timestamp of when the token becomes invalid. It can also be embedded into the accessToken itself, and later decoded to obtain the expiry timestamp.

We can set the refetchInterval, to periodically ask backend for a new token. The call should happen before the accessToken expires so that the user stays authenticated. If the call happens after the accessToken has expired, we still have a chance to refresh it, as long as refreshToken is still valid. However, if the call happens after the refreshToken has expired, we should sign out the user.

*/

async function refreshAccessToken(tokenObject) {
	try {
		// Get a new set of tokens with a refreshToken
		const tokenResponse = await axios.post(YOUR_API_URL + 'auth/refreshToken', {
			token: tokenObject.refreshToken
		});

		return {
			...tokenObject,
			accessToken: tokenResponse.data.accessToken,
			accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
			refreshToken: tokenResponse.data.refreshToken
		}
	} catch (error) {
		return {
			...tokenObject,
			error: "RefreshAccessTokenError",
		}
	}
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials, req) {
				console.log("credentials: ", credentials)
				// TODO: connect with backend API
				// const res = await axios.post(YOUR_API_URL + 'auth/signin', {
				// 	username: credentials.username,
				// 	password: credentials.password,
				// });

				// if (res.data) {
				// 	return res.data;
				// }

				// Return null if user data could not be retrieved
				let user = { accessToken: "sssss", accessTokenExpiry: "sssss", refreshToken: "sssss", id: 1, role: VALIDATOR }

				user = { accessToken: "sssss", accessTokenExpiry: "sssss", refreshToken: "sssss", id: 1, role: GATEKEEPER }

				return user
				// The object returned (user in this case), will be passed to the jwt callback.
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// This will only be executed at login. Each next invocation will skip this part.
				token.accessToken = user.accessToken;
				token.accessTokenExpiry = user.accessTokenExpiry;
				token.refreshToken = user.refreshToken;
				token.id = user.id
				token.role = user.role
			}
	
			// If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
			// const shouldRefreshTime = Math.round((token.accessTokenExpiry - 60 * 60 * 1000) - Date.now());
			const shouldRefreshTime = 20;
	
			// If the token is still valid, just return it.
			if (shouldRefreshTime > 0) {
				return Promise.resolve(token);
			}
	
			// If the call arrives after 23 hours have passed, we allow to refresh the token.
			token = refreshAccessToken(token);
			return Promise.resolve(token);
		},
		async session({ session, token }) {
			// Here we pass accessToken to the client to be used in authentication with your API
			session.accessToken = token.accessToken;
			session.accessTokenExpiry = token.accessTokenExpiry;
			session.error = token.error;
			session.user.id = token.id;
			session.user.role = token.role;
	
			return Promise.resolve(session);
		}
	},
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: "/auth/signin",
	},
}

const Auth = (req, res) => NextAuth(req, res, authOptions)

export default Auth