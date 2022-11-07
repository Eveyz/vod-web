import { useState } from 'react'
import { Grid, Typography, Stack, TextField } from '@mui/material'

export default function SetParams({params}) {

	const [testCode, setTestCode] = useState('')

	return (
		<>
			<Grid container spacing={2} sx={{mt: 1}}>
				<Grid item xs={6}>
					<Typography variant="h6" gutterBottom sx={{mt: 1}}>
						Parameters
					</Typography>
					<Typography variant="subtitle1" gutterBottom sx={{mt: 1}}>
						Fill in the below parameters:
					</Typography>
					<Stack direction="row" spacing={2}>
						<TextField 
							fullWidth
							label="Parameter Name" 
							size="small"
						/>
						<TextField 
							fullWidth 
							label="Value"
							size="small"
						/>
					</Stack>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Typography variant="h6" gutterBottom sx={{mt: 1}}>
						Criterion
					</Typography>
					<Stack direction="row" spacing={2}>
						<TextField 
							fullWidth 
							label="Criteria Name"
							size="small" 
						/>
						<TextField 
							fullWidth 
							label="Value"
							size="small"
						/>
					</Stack>
				</Grid>
			</Grid>
		</>
	)
}