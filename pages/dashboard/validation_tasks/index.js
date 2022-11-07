import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../components/dashboard/ValidatorMenu';
import { VALIDATOR } from '../../../helper/constants';
import { useGlobalDataContext } from '../../../helper/GlobalDataContext';
import { useRouter } from 'next/router';
import { get_docs, get_doc } from '../../../actions/firebase';


export default function ValidationTasks({ validation_tasks, user }) {

	const { setModel, setValidationSuiteID } = useGlobalDataContext()
	const router = useRouter()

	const addValidationSuite = (m) => {
		setModel(m)
		router.push(`/dashboard/validation_tasks/${m.id}/add_validation_suite`)
	}

	const editValidationSuite = (m) => {
		setModel(m)
		setValidationSuiteID(m.validation_suite_id)
		router.push(`/dashboard/validation_tasks/${m.id}/edit_validation_suite`)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'model_id',
			headerName: 'Model ID',
			width: 150,
			editable: false,
			sortable: false,
		},
		{
			field: 'model_name',
			headerName: 'Model Name',
			width: 150,
			editable: false,
			sortable: false,
		},
		{
			field: 'model_description',
			headerName: 'Model Description',
			sortable: false,
			width: 160
		},
		{
			field: 'validation_suite_id',
			headerName: 'Validation Suite ID',
			width: 200,
			editable: false,
			sortable: false,
		},
		{
			field: "action",
			headerName: "Action",
			width: 260,
			editable: false,
			sortable: false,
			disableSelectionOnClick: true,
			renderCell: (params) => {
				const onClick = (e) => {
					e.stopPropagation(); // don't select this row after clicking
	
					const api = params.api;
					const thisRow = {};
	
					api
						.getAllColumns()
						.filter((c) => c.field !== "__check__" && !!c)
						.forEach(
							(c) => (thisRow[c.field] = params.getValue(params.id, c.field))
						);
	
					return alert(JSON.stringify(thisRow, null, 4));
				};
	
				if(params.row.validation_suite_id) {
					return <Button variant="outlined" startIcon={<EditIcon />} onClick={() => editValidationSuite(params.row)}>Validation Suite</Button>
				}
				return <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addValidationSuite(params.row)}>Validation Suite</Button>
			}
		},
	];

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"validation_tasks"} />}>
			{
				validation_tasks.length ?
				<Box sx={{ height: 400, width: '100%' }}>
					<DataGrid
						rows={validation_tasks}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						checkboxSelection
						disableSelectionOnClick
						experimentalFeatures={{ newEditingApi: true }}
					/>
				</Box>
				:
				<Card>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							No validation suites found
						</Typography>
					</CardContent>
				</Card>
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

	// TODO: Replace with actual vod_api call
	let validation_tasks = await get_docs("validation_tasks")
	for(let vt of validation_tasks) {
		let m = await get_doc("models", vt.model_id)
		m['id'] = vt.model_id
		vt['model_id'] = vt.model_id
		vt['model_name'] = m.name
		vt['model_description'] = m.description
		vt.model = m
	}

	return {
		props: { validation_tasks, user }
	}
}