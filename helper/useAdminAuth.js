import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useAdminAuth(shouldRedirect) {

	const { data: session, status } = useSession();
	// status: "loading" | "authenticated" | "unauthenticated"
	// https://next-auth.js.org/getting-started/client

	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		if (session?.error === "RefreshAccessTokenError") {
			signOut({ callbackUrl: '/auth/signin', redirect: shouldRedirect });
		}

		if (session === null) {
			if (router.route !== '/auth/signin') {
				router.replace('/auth/signin'); // redirect to sign in page
			}
			setIsAuthenticated(false);
		} else if (session !== undefined) {
			if (router.route === '/auth/signin') {
				router.replace('/');
			}
			console.log("session from use session: ", session)
			if(session.user.identity !== "admin") {
				router.replace('/');
				setIsAuthenticated(false);
			}
			setIsAuthenticated(true);
		}
	}, [session]);

	return isAuthenticated;
}