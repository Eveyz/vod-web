import * as React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
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
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
	{
		field: 'role',
		headerName: 'Role',
		width: 200,
		editable: false,
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
			return <AssignUserRole role={params.row.role} roles={params.row.roles} />
    }
	},
  {
    field: 'group',
    headerName: 'Group',
    width: 200,
    editable: false,
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
			return <AssignUserGroup group={params.row.group} groups={params.row.groups} />
    }
  },
];

export default function AdminUsers({data, user}) {
  return (
		<ClippedDrawer sidebar={<AdminMenu selected={"users"} />}>
			<Typography variant="h5" component="div">
				Users
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
							checkboxSelection
							disableSelectionOnClick
							experimentalFeatures={{ newEditingApi: true }}
						/>
					</Box>
				</>
				:
				<Card>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							No users found
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

	const roles = [ADMIN, VALIDATOR, DEVELOPER, GATEKEEPER]
	const groups = ['DSAI', 'PiML']

	const data = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 6, lastName: 'Melisandre', firstName: null, role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}