import { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Card, CardContent, Button, Typography, TextField, Checkbox, FormGroup, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Grid, Stack, FormHelperText, OutlinedInput, Divider, Tooltip, IconButton, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function TestingConfigForm({config, saveConfig, handleClose}) {

	const [submitted, setSubmitted] = useState(false);
	const [newParam, setAddNewParams] = useState(false);
	const [params, setParams] = useState(config ? config['params'] : []);
	const [pname, setPName] = useState('');
	const [pval, setPVal] = useState('');

	const addParam = () => {
		setParams([...params, {'name': pname, 'value': pval}])
		setPName('')
		setPVal('')
		setAddNewParams(false)
	}

	const deleteParams = (idx) => {
		setParams(params.filter((ps, index) => index !== idx))
	}

	const formik = useFormik({
    initialValues: {
			condaEnv: config ? config['condaEnv'] : 'vod-master',
			transponderURL: config ? config['transponderURL'] : '',
		},
    onSubmit: (values) => {
			values['params'] = params
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
						size="small"
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
						size="small"
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
			{
				params.length > 0 ?
				<>
					<Divider sx={{mt: 2, mb: 1}} />
					<Typography variant="subtitle1" component="span">
						Params
					</Typography>
					<TableContainer component={Paper}>
						<Table size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell align="left">Name</TableCell>
									<TableCell align="left">Value</TableCell>
									<TableCell align="left">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{params.map((param, idx) => (
									<TableRow
										key={idx}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell align="left">{param.name}</TableCell>
										<TableCell align="left">{param.value}</TableCell>
										<TableCell align="left">
											<Tooltip title="Delete">
												<IconButton
													aria-label="delete" 
													color="error"
													onClick={() => deleteParams(idx)}
													sx={{p: 0}}
												>
													<DeleteIcon sx={{fontSize: '20px'}} />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
				:
				""
			}
			{
				newParam ?
				<>
					<Stack direction={'row'} spacing={1} sx={{mt: 2}}>
						<TextField 
							label='Params Name'
							size="small"
							value={pname}
							onChange={(e) => setPName(e.target.value)}
						/>
						<TextField 
							label='Params Value' 
							size="small"
							value={pval}
							onChange={(e) => setPVal(e.target.value)}
						/>
						<Button variant='contained' onClick={addParam} sx={{mt: 1}}>
							Add
						</Button>
						<Button variant='outlined' onClick={() => setAddNewParams(false)} sx={{mt: 1}}>
							Cancel
						</Button>
					</Stack>
				</>
				:
				null
			}
			{
				newParam ?
				""
				:
				<>
					<Button variant='outlined' onClick={() => setAddNewParams(true)} startIcon={<AddIcon />} sx={{mt: 2}}>
						Add Params
					</Button>
					<br/>
				</>
			}
			<Divider sx={{mt: 2}} />
			<LoadingButton
				loading={submitted}
				disabled={newParam}
				loadingPosition="start"
				startIcon={<SaveIcon />}
				variant="contained"
				type="submit"
				sx={{mt: 2}}
			>
				Save
			</LoadingButton>
			<Button variant='outlined' onClick={() => handleClose()} sx={{mt: 2, ml: 2}}>
				Cancel
			</Button>
		</form>
	)
}