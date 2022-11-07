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

	let test_codes = [{
		capabilities: ["valid_data", "na", "ordinal", "train_data", "categorical", "out_data", "TimeSeries", "Markets", "BinaryClass"],
		conda_env: "viper_vod",
		description: "Performance ACC",
		module: "",
		name: "Performance ACC",
		params: [
			{
				name: "params1",
			},
			{
				name: "p2"
			}
		],
		public: false,
		status: "pending",
		updated_at: 1667443099712,
		user_id: 1,
		validation_type: "performance",
		validator_comments: "Performance",

		// Only after parameterized, add params values, add criterion
		params: [
			{
				name: "params1",
				value: 1 // added value
			},
			{
				name: "p2",
				value: 2 // added value
			}
		],
		criterion: [
			{
				name: "auc",
				operator: "gt",
				value: "0.6"
			},
			{
				name: "acc",
				operator: "gt",
				value:"0.4",
			}
		]
	}]
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