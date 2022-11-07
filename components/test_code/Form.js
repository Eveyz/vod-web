import { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Card, CardContent, Button, Typography, TextField, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Stack, FormHelperText, OutlinedInput } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab'

import SelectTestCode from './SelectTestCode'
import CapabilityForm from '../CapabilityForm'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const types = ["Performance", "Fairness"]

export default function NewTestCodeForm({handleSubmit, test}) {

	const [submitted, setSubmitted] = useState(false);

	const [capabilities, setCapabilties] = useState(test ? test['capabilities'] : []);
	// const [requiredCapabilties, setRequiredCapabilties] = useState(test ? test['required_capabilties'] : []);
	// const [supportedCapabilties, setSupportedCapabilties] = useState(test ? test['supported_capabilties'] : []);

  const handleChangeSupportedCapabilties = (event) => {
    const {
      target: { value },
    } = event;
    setSupportedCapabilties(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

	const handleChangeRequiredCapabilties = (event) => {
    const {
      target: { value },
    } = event;
    setRequiredCapabilties(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

	const getValue = (values) => {
		setCapabilties(values)
	}

	const formik = useFormik({
    initialValues: {
			name: test ? test['name'] : '',
      description: test ? test['description'] : '',
			conda_env: test ? test['conda_env'] : 'viper_vod',
			module: test && test['module'] ? test['module'] : '',
      validation_type: test ? test['validation_type'] : '',
      // validator_comments: test ? test['validator_comments'] : '',
			public: test ? test['public'] : false,
    },
    onSubmit: (values) => {
      setSubmitted(true);
			console.log(values)
			values['capabilities'] = capabilities
			console.log(values)
			// values['required_capabilties'] = requiredCapabilties
			// values['supported_capabilties'] = supportedCapabilties
			handleSubmit(values)
    },
    validationSchema: yup.object({
      name: yup.string().trim().required('Name is required'),
      description: yup.string().trim().required('Description is required'),
      module: yup.string().trim(),
      conda_env: yup.string().trim(),
      validation_type: yup.string().trim().required('Validation type is required'),
			// validator_comments: yup.string().trim().required('Validator comments is required'),
			public: yup.boolean(),
    }),
  });

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						New Test Code
					</Typography>
					<Grid container spacing={2} sx={{mt: 1}}>
						<Grid item xs={3}>
							<TextField 
								fullWidth 
								label="Name"
								size="small"
								name="name"
								required
								disabled={submitted}
								value={formik.values.name}
								onChange={formik.handleChange}
								error={formik.touched.name && Boolean(formik.errors.name)}
								helperText={formik.touched.name && formik.errors.name}
							/>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth size="small" required error={formik.touched.validation_type && Boolean(formik.errors.validation_type)}>
								<InputLabel id="select-validation-type-label">Validation Type</InputLabel>
								<Select
									labelId="select-validation-type"
									id="select-validation-type"
									label="Validation Type"
									name="validation_type"
									disabled={submitted}
									value={formik.values.validation_type}
									onChange={formik.handleChange}
								>
									<MenuItem value={"drift"}>Data Drift</MenuItem>
									<MenuItem value={"performance"}>Performance</MenuItem>
									<MenuItem value={"fairness"}>Fairness</MenuItem>
								</Select>
								<FormHelperText>{formik.touched.validation_type && formik.errors.validation_type}</FormHelperText>
							</FormControl>
						</Grid>
						<Grid item xs={6}></Grid>
					</Grid>
					<Grid container spacing={2} sx={{mt: 1}}>
						<Grid item xs={3}>
							<TextField 
								fullWidth 
								label="Conda ENV"
								size="small"
								name="conda_env"
								disabled={submitted}
								value={formik.values.conda_env}
								onChange={formik.handleChange}
								error={formik.touched.conda_env && Boolean(formik.errors.conda_env)}
								helperText={formik.touched.conda_env && formik.errors.conda_env}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField 
								fullWidth 
								label="Module"
								size="small"
								name="module"
								disabled={submitted}
								value={formik.values.module}
								onChange={formik.handleChange}
								error={formik.touched.module && Boolean(formik.errors.module)}
								helperText={formik.touched.module && formik.errors.module}
							/>
						</Grid>
						<Grid item xs={6}></Grid>
					</Grid>
					<Grid container spacing={2} sx={{mt: 1}}>
						<Grid item xs={6}>
							<TextField
								fullWidth
								required
								disabled={submitted}
								id="outlined-multiline-flexible"
								label="Description"
								name="description"
								value={formik.values.description}
								onChange={formik.handleChange}
								error={formik.touched.description && Boolean(formik.errors.description)}
								helperText={formik.touched.description && formik.errors.description}
								multiline
								rows={3}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormGroup sx={{mt: 1, width: '100px'}}>
								<FormControlLabel control={
									<Checkbox checked={formik.values.public} disabled={submitted} />}
									name="public"
									label="Public"
									onBlur={formik.handleBlur} 
									onChange={formik.handleChange}
								/>
							</FormGroup>
						</Grid>
					</Grid>
					<CapabilityForm getValue={getValue} capabilities={capabilities} type="test_code" />
					{/* <Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant="h6" gutterBottom sx={{mt: 1}}>
								Required Capabilties
							</Typography>
							<FormControl fullWidth required size="small">
								<InputLabel id="multiple-required-capability-label">Required Capabilties</InputLabel>
								<Select
									labelId="multiple-required-capability-label"
									multiple
									name='required_capabilties'
									disabled={submitted}
									value={requiredCapabilties}
									onChange={handleChangeRequiredCapabilties}
									input={<OutlinedInput label="Required Capabilties" />}
								>
									<MenuItem value={'HandleMissingValues'}>Handle Missing Values</MenuItem>
									<MenuItem value={'Classification'}>Classification</MenuItem>
									<MenuItem value={'Regression'}>Regression</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="h6" gutterBottom sx={{mt: 1}}>
								Supported Capabilties
							</Typography>
							<FormControl fullWidth required size="small">
								<InputLabel id="multiple-support-capability-label">Supported Capabilties</InputLabel>
								<Select
									labelId="multiple-support-capability-label"
									multiple
									name='supported_capabilties'
									disabled={submitted}
									value={supportedCapabilties}
									onChange={handleChangeSupportedCapabilties}
									input={<OutlinedInput label="Supported Capabilties" />}
								>
									<MenuItem value={'HandleMissingValues'}>Handle Missing Values</MenuItem>
									<MenuItem value={'Classification'}>Classification</MenuItem>
									<MenuItem value={'Regression'}>Regression</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid> */}
					<LoadingButton
						loading={submitted}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="outlined"
						type="submit"
						sx={{mt: 2}}
					>
						Save
					</LoadingButton>
				</CardContent>
			</Card>
		</form>
	)
}