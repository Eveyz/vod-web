import { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Card, CardContent, Button, Typography, TextField, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Stack, FormHelperText, OutlinedInput } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab'
import { DEVELOPER, VALIDATOR, GATEKEEPER, ADMIN } from '../../helper/constants';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function UserForm({handleSubmit, user}) {

	const [submitted, setSubmitted] = useState(false);

	const formik = useFormik({
    initialValues: {
			uid: user ? user['uid'] : '',
			firstname: user ? user['firstname'] : '',
			lastname: user ? user['lastname'] : '',
			role: user ? user['role'] : 'developer'
    },
    onSubmit: (values) => {
      setSubmitted(true);
			console.log(values)
			handleSubmit(values)
    },
    validationSchema: yup.object({
      uid: yup.string().trim().required('UID is required'),
      firstname: yup.string().trim().required('First Name is required'),
      lastname: yup.string().trim().required('Last Name is required'),
      role: yup.string().trim().required('Role is required'),
    }),
  });

	return (
		<form onSubmit={formik.handleSubmit}>
			<Card>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						User Form
					</Typography>
					<Grid container spacing={2} sx={{mt: 1}}>
						<Grid item xs={6}>
							<TextField 
								fullWidth 
								label="UID"
								name="uid"
								required
								disabled={submitted}
								value={formik.values.uid}
								onChange={formik.handleChange}
								error={formik.touched.uid && Boolean(formik.errors.uid)}
								helperText={formik.touched.uid && formik.errors.uid}
							/>
						</Grid>
						<Grid item xs={6}></Grid>
					</Grid>
					<Grid container spacing={2} sx={{mt: 1}}>
						<Grid item xs={3}>
							<TextField
								fullWidth
								required
								disabled={submitted}
								id="outlined-multiline-flexible"
								label="First Name"
								name="firstname"
								value={formik.values.firstname}
								onChange={formik.handleChange}
								error={formik.touched.firstname && Boolean(formik.errors.firstname)}
								helperText={formik.touched.firstname && formik.errors.firstname}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								required
								disabled={submitted}
								id="outlined-multiline-flexible"
								label="Last Name"
								name="lastname"
								value={formik.values.lastname}
								onChange={formik.handleChange}
								error={formik.touched.lastname && Boolean(formik.errors.lastname)}
								helperText={formik.touched.lastname && formik.errors.lastname}
							/>
						</Grid>
						<Grid item xs={6}></Grid>
					</Grid>
					<Grid container spacing={2} sx={{mt: 1}}>
						<Grid item xs={6}>
							<FormControl fullWidth required>
								<InputLabel id="user-role-label">Role</InputLabel>
								<Select
									labelId="user-role-label"
									disabled={submitted}
									name="role"
									value={formik.values.role}
									onChange={formik.handleChange}
									input={<OutlinedInput label="Role" />}
								>
									<MenuItem value={DEVELOPER}>Developer</MenuItem>
									<MenuItem value={VALIDATOR}>Validator</MenuItem>
									<MenuItem value={GATEKEEPER}>Gatekeeper</MenuItem>
									<MenuItem value={ADMIN}>Admin</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
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
				</CardContent>
			</Card>
		</form>
	)
}