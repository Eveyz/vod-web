import * as React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { unstable_getServerSession } from "next-auth/next"

import { ADMIN, DEVELOPER, GATEKEEPER, VALIDATOR } from '../../helper/constants';
import { authOptions } from '../api/auth/[...nextauth]';
import ClippedDrawer from '../../components/ClippedDrawer';
import AdminMenu from '../../components/dashboard/AdminMenu';
import AssignUserRole from '../../components/admin/AssignUserRole';
import AssignUserGroup from '../../components/admin/AssignUserGroup';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 250,
    editable: false,
  },
	{
		field: 'members',
		headerName: 'No. of Members',
		width: 200,
		editable: false,
	},
];

export default function AdminTestCodes({data, user}) {
  return (
		<ClippedDrawer sidebar={<AdminMenu selected={"test_codes"} />}>
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
  );
}

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

	if(!session || !session.user || session.user.role !== ADMIN) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	const data = [
		{ id: 1, name: 'PiML', description: 'Jon', members: 4 },
		{ id: 2, name: 'DSAI', description: 'Cersei', members: 4 },
		{ id: 3, name: 'ATOM', description: 'Jaime', members: 4 },
		{ id: 4, name: 'Stark', description: 'Arya', members: 4 },
		{ id: 5, name: 'Targaryen', description: 'Daenerys', members: 4 },
		{ id: 6, name: 'Melisandre', description: null, members: 4 },
		{ id: 7, name: 'Clifford', description: 'Ferrara', members: 4 },
		{ id: 8, name: 'Frances', description: 'Rossini', members: 4 },
		{ id: 9, name: 'Roxie', description: 'Harvey', members: 4 },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}