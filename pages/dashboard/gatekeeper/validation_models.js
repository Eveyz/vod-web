import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import { GATEKEEPER } from '../../../helper/constants';
import GateKeeperMenu from '../../../components/dashboard/GateKeeperMenu';
import AssignManager from '../../../components/gatekeeper/AssignManager';


export default function ValidationModels({ data, user, managers }) {

	const columns = [
		{
			field: 'modelID',
			headerName: 'Model ID',
			width: 150,
			editable: false,
			sortable: false,
		},
		{
			field: 'modelName',
			headerName: 'Model name',
			width: 150,
			editable: false,
			sortable: false,
		},
		{
			field: 'description',
			headerName: 'Description',
			sortable: false,
			width: 160
		},
		{
			field: 'manager',
			headerName: 'Manager',
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
	
				return <AssignManager manager={params.row.manager} managers={managers} />
			}
		},
	];
	
	return (
		<ClippedDrawer sidebar={<GateKeeperMenu selected={"validation_models"} />}>
			<Typography variant="h5" component="div">
				Models
			</Typography>
			<br/>
			{
				data.length ?
				<Box sx={{ height: 400, width: '100%' }}>
					<DataGrid
						rows={data}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
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

	if(!session || !session.user || session.user.role !== GATEKEEPER) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const data = [
		{ id: 1, modelID: '14144', modelName: 'Jon', manager: 'Jon' },
		{ id: 2, modelID: '14145', modelName: 'Cersei', manager: null },
		{ id: 3, modelID: '14146', modelName: 'Jaime', manager: 'Jaime' },
		{ id: 4, modelID: '14147', modelName: 'Arya', manager: 'Arya' },
		{ id: 5, modelID: '14148', modelName: 'Daenerys', manager: 'Daenerys' },
		{ id: 6, modelID: '14149', modelName: null, manager: null },
		{ id: 7, modelID: '14150', modelName: 'Ferrara', manager: 'Ferrara' },
		{ id: 8, modelID: '14151', modelName: 'Rossini', manager: 'Rossini' },
		{ id: 9, modelID: '14152', modelName: 'Harvey', manager: 'Harvey'  },
	];

	const managers = ['Jon', 'Jaime', 'Arya']

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user, managers }
	}
}