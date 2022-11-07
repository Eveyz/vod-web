import { useState, useEffect } from 'react'
import { unstable_getServerSession } from "next-auth/next"
import { Breadcrumbs, Typography, Card, CardContent, FormGroup, FormControlLabel, Switch, Button, Stack, Divider, Grid, TextField, CircularProgress } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/router'

import ClippedDrawer from "../../../../components/ClippedDrawer"
import { authOptions } from '../../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../../components/dashboard/ValidatorMenu';
import AddTestCodesModal from '../../../../components/parameterization_tests/AddTestCodesModal';
import SearchTestCode from '../../../../components/parameterization_tests/SearchTestCode';
import ListSearchedTestCode from '../../../../components/parameterization_tests/SearchedTestCodesList';
import AddedTestCodes from '../../../../components/parameterization_tests/AddedTestCodes';
import { VALIDATOR } from '../../../../helper/constants';
import { get_docs, update_doc, get_doc } from '../../../../actions/firebase';
import { useGlobalDataContext } from '../../../../helper/GlobalDataContext';

const label = { inputProps: { 'aria-label': 'Switch mode' } };

export default function EditValidationSuite({ user }) {

	const { model, setModel, validation_suite_id } = useGlobalDataContext()

	const [mode, setMode] = useState("browse")
	const router = useRouter()
	const { id } = router.query

	const [validationSuite, setValidationSuite] = useState(null)
	const [vsName, setName] = useState('')
	const [description, setDescription] = useState('')

	const [action, setAction] = useState("new")
	const [searchedTests, setSearchedTests] = useState([])
	const [addedTests, setAddedTests] = useState([])
	const [testcode, setTestCode] = useState(null)

	useEffect(() => {
		async function fetchValidationSuite(id) {
			// TODO: replace with getValidationSuite
			let vs = await get_doc("validation_suites", id)
			setValidationSuite(vs)
			setName(vs['name'])
			setDescription(vs['description'])
			setAddedTests(vs['test_codes'])
		}
		fetchValidationSuite(validation_suite_id)
	}, [validation_suite_id])

	const searchTestCode = async () => {
		const ts = await get_docs("test_codes")
		setSearchedTests(ts)
	}

	const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	const openModel = (tc, ac) => {
		setTestCode(tc)
		setAction(ac)
		handleOpen()
	}

	const addTestCode = (tc) => {
		setAddedTests([...addedTests, tc])
		setTestCode(null)
		setAction("new")
		handleClose()
	}

	const updateTest = (tc) => {
		let ts = []
		addedTests.forEach((t, idx) => {
			if(t.id === tc.id) {
				ts.push(tc)
			} else {
				ts.push(t)
			}
		})
		setAddedTests(ts)
		setTestCode(null)
		handleClose()
	}

	const cancel = () => {
		setTestCode(null)
		handleClose()
	}

	const removeTestCode = (tc) => {
		setAddedTests(addedTests.filter((test) => test.id !== tc.id))
	}

	const saveValidationSuite = async () => {
		let vs = {}
		vs['name'] = vsName
		vs['description'] = description
		vs['test_codes'] = addedTests
		// TODO: replace with update validation suite
		await update_doc("validation_suites", validation_suite_id, vs)
		router.push("/dashboard/validation_tasks")
	}

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"validation_tasks"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/dashboard/validation_tasks">Back</Link>
				<Typography color="text.primary">Add Validation Suite</Typography>
			</Breadcrumbs>
			{
				validationSuite ?
				<Card sx={{mt: 1}}>
					<CardContent>
						<Typography variant='h6' component="h6">Model Info</Typography>
						<Stack direction={"row"} gap={3} sx={{fontSize: '0.875em'}}>
							<Stack direction={'column'}>
								<span>Model ID:</span>
								<span>Model Name:</span>
								<span>Model Version:</span>
							</Stack>
							<Stack direction={'column'}>
								<span>{model.model_id}</span>
								<span>{model.model_name}</span>
								<span>{model.model_name}</span>
							</Stack>
						</Stack>
						<Divider sx={{my: 1}} />
						<Grid container spacing={2} sx={{mt: 1}}>
							<Grid item xs={6}>
								<TextField 
									fullWidth 
									label="Name"
									size="small"
									name="name"
									required
									defaultValue={vsName}
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} sx={{mt: 1}}>
							<Grid item xs={6}>
								<TextField
									fullWidth
									required
									label="Description"
									name="description"
									defaultValue={description}
									onChange={(e) => setDescription(e.target.value)}
									multiline
									rows={3}
								/>
							</Grid>
						</Grid>
						<Typography variant='h6' sx={{mt: 1}}>Test Codes</Typography>
						<AddedTestCodes 
							openModel={openModel}
							removeTestCode={removeTestCode} 
							tests={addedTests} 
						/>
						<AddTestCodesModal
							open={open}
							action={action}
							testcode={testcode}
							handleClose={handleClose} 
							addTestCode={addTestCode}
							updateTest={updateTest}
							cancel={cancel}
						/>
						<br/>
						<Stack direction='row' alignItems={'center'}>
							<Typography variant='h6'>Available Test Codes</Typography>
							<FormGroup sx={{width: "100px", ml: 3}}>
								<FormControlLabel control={<Switch />} label="Browse" />
							</FormGroup>
						</Stack>
						<SearchTestCode search={searchTestCode} />
						<ListSearchedTestCode openModel={openModel} tests={searchedTests} />
						<br/>

						<Button variant="contained" sx={{mt: 2}} onClick={saveValidationSuite}>Update</Button>
					</CardContent>
				</Card>
				:
				<Stack sx={{mt: 15}} direction={'row'} alignContent={"center"} justifyContent={"center"}>
					<CircularProgress />
				</Stack>
			}
		</ClippedDrawer>
	)
}

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

	if(!session || !session.user || session.user.role !== VALIDATOR) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { user }
	}
}