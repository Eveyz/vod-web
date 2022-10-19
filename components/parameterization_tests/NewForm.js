import { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Card, CardContent, Button, Typography, TextField, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Stack, FormHelperText, OutlinedInput } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab'

import SelectTestCode from '../test_code/SelectTestCode'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function NewParameterizationForm() {

	const [submitted, setSubmitted] = useState(false);

	const [requiredCapabilties, setRequiredCapabilties] = useState([]);
	const [supportedCapabilties, setSupportedCapabilties] = useState([]);

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

	const formik = useFormik({
    initialValues: {
			name: '',
			type: '',
      description: '',
      validator_comments: '',
			public: false,
    },
    onSubmit: (values) => {
      setSubmitted(true);
			console.log(values)
			// TODO: connect with backend API
			// const res = await axios.post(YOUR_API_URL + 'auth/signin', values);

			// if (res.data) {
			// 	return res.data;
			// }
    },
    validationSchema: yup.object({
      name: yup.string().trim().required('Name is required'),
      type: yup.string().trim().required('Validation type is required'),
      description: yup.string().trim().required('Description is required'),
			validator_comments: yup.string().trim().required('Validator comments is required'),
			public: yup.boolean(),
    }),
  });

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						New Parameterization Test
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
							<FormControl fullWidth size="small" required error={formik.touched.type && Boolean(formik.errors.type)}>
								<InputLabel id="select-validation-type-label">Validation Type</InputLabel>
								<Select
									labelId="select-validation-type"
									id="select-validation-type"
									label="Validation Type"
									name="type"
									disabled={submitted}
									value={formik.values.type}
									onChange={formik.handleChange}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
								<FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
							</FormControl>
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
						<Grid item xs={6}>
							<TextField
								fullWidth
								required
								disabled={submitted}
								id="outlined-multiline-flexible"
								label="Validator Comments"
								name="validator_comments"
								value={formik.values.validator_comments}
								onChange={formik.handleChange}
								error={formik.touched.validator_comments && Boolean(formik.errors.validator_comments)}
								helperText={formik.touched.validator_comments && formik.errors.validator_comments}
								multiline
								rows={3}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormGroup sx={{mt: 1}}>
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
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant="h6" gutterBottom sx={{mt: 1}}>
								Required Capabilties
							</Typography>
							<FormControl fullWidth required size="small">
								<InputLabel id="multiple-required-capability-label">Required Capabilties</InputLabel>
								<Select
									labelId="multiple-required-capability-label"
									multiple
									disabled={submitted}
									value={requiredCapabilties}
									onChange={handleChangeRequiredCapabilties}
									input={<OutlinedInput label="Required Capabilties" />}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
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
									disabled={submitted}
									value={supportedCapabilties}
									onChange={handleChangeSupportedCapabilties}
									input={<OutlinedInput label="Supported Capabilties" />}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<SelectTestCode />
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