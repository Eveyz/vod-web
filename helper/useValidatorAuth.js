import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useValidatorAuth(shouldRedirect) {
	console.log("about to get session")
	const { data: session, status } = useSession();
	// status: "loading" | "authenticated" | "unauthenticated"
	// https://next-auth.js.org/getting-started/client
	console.log("get session done")
	console.log("session is: ", session)

	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		console.log("inside use effect ------ ")
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
			setIsAuthenticated(true);
			if(session.user.identity === "validator") {
				setIsAuthorized(true)
			} else {
				console.log("about to set")
				setIsAuthorized(false);
				console.log("set done")
				router.replace('/');
				console.log("after redirect")
			}
		}
	}, [session]);

	return { isAuthenticated, isAuthorized }
}