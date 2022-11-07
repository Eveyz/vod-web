import { useEffect, useState } from 'react'
import Link from 'next/link';

import { Box, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { DataGrid } from "@mui/x-data-grid";

import { get_docs, delete_doc, add_doc } from '../../actions/firebase';
import { useRouter } from 'next/router';


export default function ListSearchedTestCode({ openModel, tests }) {

	const router = useRouter()

	const addTest = async (test) => {
		// deep copy test object
		openModel(JSON.parse(JSON.stringify(test)), 'new')
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
					<Tooltip title="Add">
						<IconButton
							aria-label="add" 
							color="info"
							onClick={() => addTest(params.row)}
						>
							<AddIcon />
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
					<Box sx={{ height: 400, width: '100%', mt: 3 }}>
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
				null
			}
		</div>
	)
}