import axios from "axios";

const url = ''

export function getTestCodes(query) {
	axios.get(url)
	.then(res => {
		return res.data
	})
	.catch(err => {
		return err
	})
}

export function createTestCodes(test_code) {
	axios.post(url, test_code)
	.then(res => {
		return res.data
	})
	.catch(err => {
		return err
	})
}

export function updateTestCodes(test_code) {
	axios.post(url, test_code)
	.then(res => {
		return res.data
	})
	.catch(err => {
		return err
	})
}