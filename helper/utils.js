import { DEVELOPER, VALIDATOR, ADMIN } from "./constants";

export function isAuthenticated(session) {
	let authenticated = false

	if (session !== null && session !== undefined) {
		authenticated = true
	}
	return authenticated
}

export function checkRoles(role) {
	if (role === DEVELOPER) return 0;
	else if (role === VALIDATOR) return 1;
	else if (role === ADMIN) return 2;
	else return 3;
}