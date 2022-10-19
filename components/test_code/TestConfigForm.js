import { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Card, CardContent, Button, Typography, TextField, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Stack, FormHelperText, OutlinedInput } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TestingConfigForm({config, saveConfig}) {

	const [submitted, setSubmitted] = useState(false);

	const formik = useFormik({
    initialValues: {
			condaEnv: config ? config['condaEnv'] : 'vod-master',
			transponderURL: config ? config['transponderURL'] : '',
		},
    onSubmit: (values) => {
			console.log(values)
			saveConfig(values)
    },
    validationSchema: yup.object({
      condaEnv: yup.string().trim().required('Conda Environment is required'),
      transponderURL: yup.string().trim().required('Transponder URL is required'),
    }),
  });

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid container spacing={2} sx={{mt: 1}}>
				<Grid item xs={12}>
					<TextField 
						fullWidth 
						label="Conda Environment"
						name="condaEnv"
						required
						disabled={submitted}
						value={formik.values.condaEnv}
						onChange={formik.handleChange}
						error={formik.touched.condaEnv && Boolean(formik.errors.condaEnv)}
						helperText={formik.touched.condaEnv && formik.errors.condaEnv}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2} sx={{mt: 1}}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						required
						disabled={submitted}
						label="Transponder URL"
						name="transponderURL"
						value={formik.values.transponderURL}
						onChange={formik.handleChange}
						error={formik.touched.transponderURL && Boolean(formik.errors.transponderURL)}
						helperText={formik.touched.transponderURL && formik.errors.transponderURL}
					/>
				</Grid>
			</Grid>
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
		</form>
	)
}