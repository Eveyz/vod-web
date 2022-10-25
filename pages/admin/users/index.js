import { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { unstable_getServerSession } from "next-auth/next"
import Link from 'next/link';

import { ADMIN, DEVELOPER, GATEKEEPER, VALIDATOR } from '../../../helper/constants';
import { authOptions } from '../../api/auth/[...nextauth]';
import ClippedDrawer from '../../../components/ClippedDrawer';
import AdminMenu from '../../../components/dashboard/AdminMenu';
import AssignUserRole from '../../../components/admin/AssignUserRole';
import AssignUserGroup from '../../../components/admin/AssignUserGroup';
import { get_docs } from '../../../actions/firebase';

export default function AdminUsers({users, user}) {

	const [open, setOpen] = useState(false)

	const showMsg = () => {
		setOpen(true)
	}

	const handleCloseMsg = () => {
		setOpen(false)
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'firstname',
			headerName: 'First name',
			width: 150,
			editable: false,
		},
		{
			field: 'lastname',
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
				return <AssignUserRole showMsg={showMsg} user_id={params.id} role={params.row.role} roles={params.row.roles} />
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
				return <AssignUserGroup showMsg={showMsg} user_id={params.id} group={params.row.group} groups={params.row.groups} />
			}
		},
	];

  return (
		<ClippedDrawer sidebar={<AdminMenu selected={"users"} />}>
			<Typography variant="h5" component="div">
				Users
			</Typography>
			<Link href="/admin/users/new">
				<Button variant="contained" sx={{my: 1}}>New</Button>
			</Link>
			<br/>
			{
				users.length ?
				<>
					<Box sx={{ height: 400, width: '100%' }}>
						<DataGrid
							rows={users}
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
						<Typography variant="subtitle1">
							No users found
						</Typography>
					</CardContent>
				</Card>
			}
			<Snackbar open={open} autoHideDuration={4000} onClose={handleCloseMsg}>
				<Alert onClose={handleCloseMsg} severity="success" sx={{ width: '100%' }}>
					Update user success!
				</Alert>
			</Snackbar>
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
	const groups_ = ["DSAI", "PiML"]

	const users_ = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 6, lastName: 'Melisandre', firstName: null, role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', role: VALIDATOR, group: 'DSAI', roles: roles, groups: groups_ },
	];

	// Replace by the actual api calls
	let users = await get_docs("users")
	const groups = await get_docs("groups")
	users.forEach((user, idx) => {
		let gps = groups.map((g, idx) => { return g.name })
		user['groups'] = gps
	})

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { users, user }
	}
}