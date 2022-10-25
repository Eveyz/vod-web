import { useEffect, useState } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../../components/ClippedDrawer"
import { authOptions } from '../../../api/auth/[...nextauth]';
import { GATEKEEPER } from '../../../../helper/constants';
import GateKeeperMenu from '../../../../components/dashboard/GateKeeperMenu';
import { get_groups } from '../../../../actions/firebase';

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
				<IconButton
					aria-label="delete" 
					color="error"
					onClick={() => {
						if(window.confirm('Are you sure to remove this member?')) { 
							// deleteTest()
						}
					}}
				>
					<PersonOffIcon />
				</IconButton>
			</>
    }
  },
];

export default function Groups({ data, user }) {

	return (
		<ClippedDrawer sidebar={<GateKeeperMenu selected={"groups"} />}>
			<Typography variant="h5" component="div">
				DSAI
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
							No group members found
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
		{ id: 1, name: 'Jon', description: 'Jon' },
		{ id: 2, name: 'Cersei', description: 'Cersei' },
		{ id: 3, name: 'Jaime', description: 'Jaime' },
		{ id: 4, name: 'Arya', description: 'Arya' },
		{ id: 5, name: 'Daenerys', description: 'Daenerys' },
		{ id: 6, name: 'Ferrara', description: 'Ferrara' },
		{ id: 7, name: 'Rossini', description: 'Rossini' },
		{ id: 8, name: 'Harvey', description: 'Harvey' },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}