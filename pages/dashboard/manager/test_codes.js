import { useEffect, useState } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import ManagerMenu from '../../../components/dashboard/ManagerMenu';
import { VALIDATOR_MANAGER, PENDING, SIGNEDOFF } from '../../../helper/constants';
import ViewTestCode from '../../../components/manager/ViewTestCode';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Test Name',
    width: 150,
    editable: false,
		sortable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    sortable: false,
    width: 300
  },
	{
    field: 'status',
    headerName: 'Status',
    sortable: false,
    width: 150
  },
	{
    field: 'author',
    headerName: 'Author',
    sortable: false,
    width: 150
  },
];

export default function ManagerTestCode({ data, tests, user }) {

	const [viewTestCode, setView] = useState(false)
	const [test, setTest] = useState(null)

	const selectTest = (params) => {
		console.log(params)
		setTest(params)
		setView(true)
	}

	const goBack = () => {
		setTest(null)
		setView(false)
	}

	if(viewTestCode) {
		return (
			<ClippedDrawer sidebar={<ManagerMenu selected={"test_codes"} />}>
				<ViewTestCode test={test} goBack={goBack} />
			</ClippedDrawer>
		)
	}

	return (
		<ClippedDrawer sidebar={<ManagerMenu selected={"test_codes"} />}>
			<Typography variant="h5" component="div">
				Test Codes
			</Typography>
			<br/>
			{
				data.length ?
				<>
					<Box sx={{ height: 400, width: '100%' }}>
						<DataGrid
							rows={data}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
							onRowClick={params => selectTest(params)}
							disableSelectionOnClick
							experimentalFeatures={{ newEditingApi: true }}
						/>
					</Box>
				</>
				:
				<Card>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							No test codes found
						</Typography>
					</CardContent>
				</Card>
			}
		</ClippedDrawer>
	)
}


export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

	if(!session || !session.user || session.user.role !== VALIDATOR_MANAGER) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	// TODO: fetch test codes from your gourp members
	// let tests = []
	// axios.get(url)
	// .then(res => {
	// 	tests = res.data
	// })
	// .catch(err => {
	// 	console.log(err)
	// })

	const data = [
		{ id: 1, name: 'AUC', description: 'Jon', author: "John", status: PENDING },
		{ id: 2, name: 'ACC', description: 'Cersei', author: "John", status: SIGNEDOFF },
		{ id: 3, name: 'PSI', description: 'Jaime', author: "John", status: SIGNEDOFF },
		{ id: 4, name: 'Data Drift', description: 'Arya', author: "John", status: PENDING },
		{ id: 5, name: 'Performance', description: 'Daenerys', author: "John", status: PENDING },
		{ id: 6, name: '14149', description: null, author: "John", status: PENDING },
		{ id: 7, name: '14150', description: 'Ferrara', author: "John", status: PENDING },
		{ id: 8, name: '14151', description: 'Rossini', author: "John", status: PENDING },
		{ id: 9, name: '14152', description: 'Harvey', author: "John", status: PENDING },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}