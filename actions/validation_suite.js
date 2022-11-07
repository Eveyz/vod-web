
// Get Validation Suite by ID
export function getValidationSuite(id) {
	let vs = {
		id: 1,
		name: "validation suite name",
		description: "validation suite description",
		// parameterized test codes
		test_codes: [{
			capabilities: ["valid_data", "na", "ordinal", "train_data", "categorical", "out_data", "TimeSeries", "Markets", "BinaryClass"],
			conda_env: "viper_vod",
			description: "Performance ACC",
			module: "",
			name: "Performance ACC",
			public: false,
			status: "pending",
			updated_at: 1667443099712,
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
			criterion: [ // if added criterion
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
			],
			user_id: 1,
			validation_type: "performance",
			validator_comments: "Performance",
		}]
	}
}