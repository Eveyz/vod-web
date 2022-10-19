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
				<Link href="/dashboard/test_codes/editor">
					<IconButton aria-label="code">
						<CodeIcon />
					</IconButton>
				</Link>
			</>
    }
  },
];

export default function TestCode({ data, user }) {

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"test_codes"} />}>
			<Link href="/dashboard/test_codes/new">
				<Button variant="contained" startIcon={<AddIcon />}>
					New Test Codes
				</Button>
			</Link>
			<br/>
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
		{ id: 1, name: 'AUC', description: 'Jon' },
		{ id: 2, name: 'ACC', description: 'Cersei' },
		{ id: 3, name: 'PSI', description: 'Jaime' },
		{ id: 4, name: '14147', description: 'Arya' },
		{ id: 5, name: '14148', description: 'Daenerys' },
		{ id: 6, name: '14149', description: null },
		{ id: 7, name: '14150', description: 'Ferrara' },
		{ id: 8, name: '14151', description: 'Rossini' },
		{ id: 9, name: '14152', description: 'Harvey' },
	];

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { data, user }
	}
}