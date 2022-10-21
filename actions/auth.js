import axios from "axios";

const url = ''

export function signIn(user) {
	axios.post(url, user)
	.then(res => {
		return res.data
	})
	.catch(err => {
		return err
	})
}

export function signUp(user) {
	axios.post(url, user)
	.then(res => {
		return res.data
	})
	.catch(err => {
		return err
	})
}