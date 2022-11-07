import { Breadcrumbs, Typography, Card, CardContent, Button, Stack } from '@mui/material'
import Link from 'next/link'
import ViewOnlyCodeEditor from './ViewOnlyCodeEditor'

const code = `\nimport dsai\n\nclass DSAITest():\n
\tdef validate(model, params1, params2) {
\t	# train_data = model.get_training_data()
\t	# test_data = model.get_testing_data()
\t
\t	# Implement your code logic:
\t
\t	# vr = ValidationResult()
\t	# return vr
\t}\n}`

export default function ViewTestCode({ data, test, user, goBack }) {

	const signOffTest = () => {

	}

	const back = () => {
		goBack()
	}

	if(!test) {
		return (
			<div></div>
		)
	}

	return (
		<div>
			<Breadcrumbs>
				<Typography sx={{cursor: "pointer"}} onClick={back}>Back</Typography>
				<Typography color="text.primary">View Test Code</Typography>
			</Breadcrumbs>
			<Card sx={{mt: 1}}>
				<CardContent>
					<Stack direction="row" spacing={3} alignItems="center">
						<Stack direction="column">
							<Typography variant='subtitle1'><b>Test Name:</b></Typography>
							<Typography variant='subtitle1'><b>Author:</b></Typography>
							<Typography variant='subtitle1'><b>Description:</b></Typography>
						</Stack>
						<Stack direction="column">
							<Typography variant='subtitle1'>{test.row.name}</Typography>
							<Typography variant='subtitle1'>{test.row.author}</Typography>
							<Typography variant='subtitle1'>{test.row.description}</Typography>
						</Stack>
					</Stack>
					<Typography variant='subtitle1' sx={{mt: 1}}><b>Test Code:</b></Typography>
					<ViewOnlyCodeEditor code={code} />
					<Button 
						sx={{mt: 1}} 
						variant='contained' 
						onClick={() => {
							if(window.confirm('Are you sure to sign off this test?')) { 
								signOffTest()
							}
						}}
					>Sign off</Button>
				</CardContent>
			</Card>
		</div>
	)
}
