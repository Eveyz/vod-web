import { useEffect } from 'react'
import { Box, Card, CardContent, Button, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

import ClippedDrawer from "../../components/ClippedDrawer"

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]';
import AdminMenu from '../../components/dashboard/AdminMenu';
import ValidatorMenu from '../../components/dashboard/ValidatorMenu';
import { ADMIN, VALIDATOR } from '../../helper/constants';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

export default function Dashboard({ data, user }) {

	// const { isAuthenticated, isAuthorized } = useValidatorAuth(true)

	if(user.role === ADMIN) {
		return <AdminMenu data={data} />
	} else if (user.role === VALIDATOR) {
		return <ValidatorMenu data={data} />
	}
	
	return (
		<ClippedDrawer>
			<Button variant="outlined">
				New
			</Button>
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
	}

	const data = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}