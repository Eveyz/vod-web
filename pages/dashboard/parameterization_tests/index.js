import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../components/dashboard/ValidatorMenu';
import { VALIDATOR } from '../../../helper/constants';

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
    field: 'type',
    headerName: 'Test Type',
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
    field: 'validatorComments',
    headerName: 'Validator Comments',
		description: 'Add comments to your validation test',
    width: 350,
    editable: false,
		sortable: false,
  },
	{
    field: "action",
    headerName: "Action",
		width: 150,
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

			return <>
				<IconButton aria-label="edit" color="primary">
					<EditIcon />
				</IconButton>
				<IconButton
					aria-label="delete"
					color="error"
					onClick={() => {
						if(window.confirm('Are you sure to delete this record?')) { 
							// deleteTest()
						}
					}}
				>
					<DeleteIcon />
				</IconButton>
			</>
    }
  },
];

export default function ParameterizationTests({ data, user }) {

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"parameterization_tests"} />}>
			<Link href="/dashboard/parameterization_tests/new">
				<Button variant="outlined">
					New Tests
				</Button>
			</Link>
			<br/>
			<br/>
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

	if(!session.user) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	} else {
		if(session.user.role !== VALIDATOR) {
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}
	}

	const data = [
		{ id: 1, name: '14144', description: 'Jon', validatorComments: 35 },
		{ id: 2, name: '14145', description: 'Cersei', validatorComments: 42 },
		{ id: 3, name: '14146', description: 'Jaime', validatorComments: 45 },
		{ id: 4, name: '14147', description: 'Arya', validatorComments: 16 },
		{ id: 5, name: '14148', description: 'Daenerys', validatorComments: null },
		{ id: 6, name: '14149', description: null, validatorComments: 150 },
		{ id: 7, name: '14150', description: 'Ferrara', validatorComments: 44 },
		{ id: 8, name: '14151', description: 'Rossini', validatorComments: 36 },
		{ id: 9, name: '14152', description: 'Harvey', validatorComments: 65 },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}