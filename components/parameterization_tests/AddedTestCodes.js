import { useEffect, useState } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { DataGrid } from "@mui/x-data-grid";

import { useRouter } from 'next/router';


export default function AddedTestCode({ openModel, removeTestCode, tests }) {

	const router = useRouter()

	const removeTest = (test) => {
		removeTestCode(test)
	}

	const columns = [
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
			field: 'validation_type',
			headerName: 'Validation Type',
			sortable: false,
			width: 150
		},
		{
			field: 'creator',
			headerName: 'Creator',
			sortable: false,
			width: 150
		},
		{
			field: 'group',
			headerName: 'Group',
			sortable: false,
			width: 150
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
					<Tooltip title="Edit">
						<IconButton
							aria-label="edit" 
							color="info"
							onClick={() => openModel(params.row,  "edit")}
						>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Remove">
						<IconButton
							aria-label="remove"
							color="error"
							onClick={() => removeTest(params.row)}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</>
			}
		},
	];

	return (
		<div>
			{
				tests.length ?
				<>
					<Box sx={{ height: 400, width: '100%', mt: 1 }}>
						<DataGrid
							rows={tests}
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
						<Typography variant="subtitle1">
							No test codes found
						</Typography>
					</CardContent>
				</Card>
			}
		</div>
	)
}