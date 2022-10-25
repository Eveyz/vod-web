import { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Card, CardContent, Button, Typography, TextField, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Stack, FormHelperText, OutlinedInput } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function GroupForm({handleSubmit, group}) {

	const [submitted, setSubmitted] = useState(false);

	const formik = useFormik({
    initialValues: {
			name: group ? group['name'] : '',
      description: group ? group['description'] : '',
    },
    onSubmit: (values) => {
      setSubmitted(true);
			console.log(values)
			handleSubmit(values)
    },
    validationSchema: yup.object({
      name: yup.string().trim().required('Name is required'),
      description: yup.string().trim().required('Description is required'),
    }),
  });

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						New Group
					</Typography>
					<Grid container spacing={2} sx={{mt: 1}}>
						<Grid item xs={6}>
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
						<Grid item xs={6}></Grid>
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
				</CardContent>
			</Card>
		</form>
	)
}