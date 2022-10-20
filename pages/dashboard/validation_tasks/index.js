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

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
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
    field: 'validationSuite',
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

			if(params.row.validationSuite) {
				return <Link href={`/dashboard/validation_tasks/${params.id}/edit_validation_suite`}><Button variant="outlined" startIcon={<EditIcon />}>Validation Suite</Button></Link>
			}
			return <Link href={`/dashboard/validation_tasks/${params.id}/add_validation_suite`}><Button variant="outlined" startIcon={<AddIcon />}>Validation Suite</Button></Link>
    }
  },
];

export default function ValidationTasks({ data, user }) {

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"validation_tasks"} />}>
			{
				data.length ?
				<Box sx={{ height: 400, width: '100%' }}>
					<DataGrid
						rows={data}
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

	const data = [
		{ id: 1, modelID: '14144', modelName: 'Jon', validationSuite: 35 },
		{ id: 2, modelID: '14145', modelName: 'Cersei', validationSuite: 42 },
		{ id: 3, modelID: '14146', modelName: 'Jaime', validationSuite: 45 },
		{ id: 4, modelID: '14147', modelName: 'Arya', validationSuite: 16 },
		{ id: 5, modelID: '14148', modelName: 'Daenerys', validationSuite: null },
		{ id: 6, modelID: '14149', modelName: null, validationSuite: 150 },
		{ id: 7, modelID: '14150', modelName: 'Ferrara', validationSuite: 44 },
		{ id: 8, modelID: '14151', modelName: 'Rossini', validationSuite: 36 },
		{ id: 9, modelID: '14152', modelName: 'Harvey', validationSuite: 65 },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}