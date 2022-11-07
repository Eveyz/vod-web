
export function getValidationTasks(query) {
	// query by validator_id using current user id (validator)
	return [
		{
			"manager_id": 1,
			"validator_id": 1,
			"model_id": 1,
			"model_name": "", // needed for show model name in validation task name
			"model_description": "", // needed for show model desc in validation task name
			"model": {
				"id": 2,
				"name": "..."
				// other model info
			},
			"validation_suite_id": 2 // or empty if no vs is created
		}
	]
}