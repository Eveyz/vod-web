import { useEffect, useState } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../components/dashboard/ValidatorMenu';
import { VALIDATOR } from '../../../helper/constants';
import { get_docs, delete_doc, add_doc } from '../../../actions/firebase';
import { useRouter } from 'next/router';


export default function TestCode({ tests, user }) {

	const router = useRouter()

	const deleteTest = async (id) => {
		await delete_doc("test_codes", id)
		router.push('/dashboard/test_codes')
	}

	const copyTestCode = async (test) => {
		delete test.id
		test['status'] = 'pending'
		test['user_id'] = user.id
		test['created_at'] = new Date().getTime()
		test['updated_at'] = new Date().getTime()
		console.log(test)
		await add_doc("test_codes", test)
		router.push('/dashboard/test_codes')
	}

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
			width: 200
		},
		{
			field: 'module',
			headerName: 'Module',
			sortable: false,
			width: 200
		},
		{
			field: 'validation_type',
			headerName: 'Validation Type',
			sortable: false,
			width: 150
		},
		{
			field: 'status',
			headerName: 'Status',
			sortable: false,
			width: 150
		},
		{
			field: "action",
			headerName: "Action",
			width: 200,
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
					<Link href={`/dashboard/test_codes/${params.id}/edit`}>
						<Tooltip title="Edit">
							<IconButton aria-label="edit" color="primary">
								<EditIcon />
							</IconButton>
						</Tooltip>
					</Link>
					<Tooltip title="Copy">
						<IconButton
							aria-label="copy" 
							color="info"
							onClick={() => copyTestCode(params.row)}
						>
							<ContentPasteIcon />
						</IconButton>
					</Tooltip>
					<Link href={`/dashboard/test_codes/${params.id}/editor`}>
						<Tooltip title="Code">
							<IconButton aria-label="code">
								<CodeIcon />
							</IconButton>
						</Tooltip>
					</Link>
					<Tooltip title="Delete">
						<IconButton
							aria-label="delete" 
							color="error"
							onClick={() => {
								if(window.confirm('Are you sure to delete this record?')) { 
									deleteTest(params.id)
								}
							}}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</>
			}
		},
	];

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"test_codes"} />}>
			<Link href="/dashboard/test_codes/new">
				<Button variant="contained" startIcon={<AddIcon />}>
					New Test Code
				</Button>
			</Link>
			<br/>
			<br/>
			{
				tests.length ?
				<>
					<Box sx={{ height: 400, width: '100%' }}>
						<DataGrid
							rows={tests}
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

	if(!session || !session.user || session.user.role !== VALIDATOR) {
		return {
			redirect: {
				destination: '/',
				permanent: false
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

	const tests = await get_docs("test_codes")
	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { tests, user }
	}
}