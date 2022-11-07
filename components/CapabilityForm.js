import { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Card, CardContent, Button, Typography, TextField, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Stack, FormHelperText, OutlinedInput } from '@mui/material';
import { DATA_TYPES, MODEL_TYPES, TASK_TYPES, CAPABILITIES } from '../helper/constants';

const model_display = {
	'ordinal': 'RequireOrdinal',
	'categorical': 'RequireCategorical',
	'na': 'RequireNA',
	'train_data': 'SupportTrainData',
	'valid_data': 'SupportValidData',
	'test_data': 'SupportTestData',
	'out_data': 'SupportOutData',
	'predict': 'SupportPredict',
	'predict_proba': 'SupportPredictProba',
	'retrain': 'SupportRetrain',
}

const test_code_display = {
	'ordinal': 'SupportOrdinal',
	'categorical': 'SupportCategorical',
	'na': 'SupportNA',
	'train_data': 'RequireTrainData',
	'valid_data': 'RequireValidData',
	'test_data': 'RequireTestData',
	'out_data': 'RequireOutData',
	'predict': 'RequirePredict',
	'predict_proba': 'RequirePredictProba',
	'retrain': 'RequireRetrain',
}

const displays = {
	"model": model_display,
	"test_code": test_code_display
}

const splitCapabilities = (capabilities) => {
	let res = {
		"data_type": "Tabular",
		"model_type": "ML",
		"task_type": "Regression",
		"other_capabilities": []
	}
	capabilities.forEach(cap => {
		if(DATA_TYPES.includes(cap)) res["data_type"] = cap
		else if(MODEL_TYPES.includes(cap)) res["model_type"] = cap
		else if(TASK_TYPES.includes(cap)) res["task_type"] = cap
		else res['other_capabilities'].push(cap)
	})
	return res
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CapabilityForm({getValue, capabilities, type}) {

	const [submitted, setSubmitted] = useState(false);

	const splitted_caps = splitCapabilities(capabilities)

	const [dataType, setDataType] = useState(splitted_caps['data_type']);
	const [modelType, setModelType] = useState(splitted_caps['model_type']);
	const [taskType, setTaskType] = useState(splitted_caps['task_type']);
	const [curCapabilties, setCapabilties] = useState(splitted_caps['other_capabilities']);

	const combineValues = () => {
		let vals = new Set(curCapabilties)
		vals.add(dataType)
		vals.add(modelType)
		vals.add(taskType)
		return Array.from(vals)
	}

  const handleChangeCapabilties = (event) => {
    const {
      target: { value },
    } = event;
		let vals = typeof value === 'string' ? value.split(',') : value
    setCapabilties(vals);
		getValue(combineValues())
  };

	const handleChangeDataType = (e) => {
		setDataType(e.target.value)
		getValue(combineValues())
	}

	const handleChangeModelType = (e) => {
		setModelType(e.target.value)
		getValue(combineValues())
	}

	const handleChangeTaskType = (e) => {
		setTaskType(e.target.value)
		getValue(combineValues())
	}

	const formik = useFormik({
    initialValues: {
			data_type: dataType,
      model_type: modelType,
			task_type: taskType,
      // ordinal: capabilities ? capabilities['ordinal'] : false,
      // categorical: capabilities ? capabilities['categorical'] : '',
			// train_data: capabilities ? capabilities['train_data'] : false,
			// valid_data: capabilities ? capabilities['valid_data'] : false,
			// test_data: capabilities ? capabilities['test_data'] : false,
			// out_data: capabilities ? capabilities['out_data'] : false,
			// predict: capabilities ? capabilities['predict'] : false,
			// predict_proba: capabilities ? capabilities['predict_proba'] : false,
			// retrain: capabilities ? capabilities['retrain'] : false,
    },
    onSubmit: (values) => {
      // setSubmitted(true);
			// console.log(values)
			// values['capabilties'] = curCapabilties
			// handleSubmit(values)
    },
    validationSchema: yup.object({
      data_type: yup.string().trim(),
      model_type: yup.string().trim(),
      task_type: yup.string().trim(),
			// ordinal: yup.boolean(),
			// categorical: yup.boolean(),
			// train_data: yup.boolean(),
			// valid_data: yup.boolean(),
			// test_data: yup.boolean(),
			// out_data: yup.boolean(),
			// predict: yup.boolean(),
			// predict_proba: yup.boolean(),
			// retrain: yup.boolean(),
    }),
  });

	return (
		<div>
			<Typography variant="h6" sx={{marginTop: '10px'}}>
				Capabilties
			</Typography>
			<Grid container spacing={2} sx={{mt: 1}}>
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel id="select-data-type-label">Data Type</InputLabel>
						<Select
							labelId="select-data-type"
							id="select-data-type"
							label="Data Type"
							name="data_type"
							disabled={submitted}
							value={dataType}
							onChange={handleChangeDataType}
						>
							{
								DATA_TYPES.map((t, idx) => {
									return <MenuItem key={idx} value={t}>{t}</MenuItem>
								})
							}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{mt: 1}}>
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel id="select-model-type-label">Model Type</InputLabel>
						<Select
							labelId="select-model-type"
							id="select-model-type"
							label="Model Type"
							name="model_type"
							disabled={submitted}
							value={modelType}
							onChange={handleChangeModelType}
						>
							{
								MODEL_TYPES.map((t, idx) => {
									return <MenuItem key={idx} value={t}>{t}</MenuItem>
								})
							}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{mt: 1}}>
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel id="select-task-type-label">Task Type</InputLabel>
						<Select
							labelId="select-task-type"
							id="select-task-type"
							label="Task Type"
							name="task_type"
							disabled={submitted}
							value={taskType}
							onChange={handleChangeTaskType}
						>
							{
								TASK_TYPES.map((t, idx) => {
									return <MenuItem key={idx} value={t}>{t}</MenuItem>
								})
							}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{mt: 1}}>
				<Grid item xs={6}>
					<FormControl fullWidth required size="small">
						<InputLabel id="multiple-capability-label">Other Capabilties</InputLabel>
						<Select
							labelId="multiple-capability-label"
							multiple
							name='capabilties'
							disabled={submitted}
							value={curCapabilties}
							onChange={handleChangeCapabilties}
							input={<OutlinedInput label="Other Capabilties" />}
						>
							{
								CAPABILITIES.map((c, idx) => {
									return <MenuItem key={idx} value={c}>{displays[type][c]}</MenuItem>
								})
							}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	)
}