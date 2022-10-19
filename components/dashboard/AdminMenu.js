import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DataGrid } from "@mui/x-data-grid";

import ClippedDrawer from "../ClippedDrawer"

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

export default function AdminDashboard({ data, user }) {

	const selected = "validation_suites"
	const sidebar = 
	<Box sx={{ overflow: 'auto' }}>
		<List>
			<Link href="/dashboard/validation_suites">
				<ListItem disablePadding selected={selected === "validation_suites"}>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary='Validation Suites' />
					</ListItemButton>
				</ListItem>
			</Link>
			<Link href="/dashboard/parameterize_tests">
				<ListItem disablePadding selected={selected === "parameterize_tests"}>
					<ListItemButton>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary='Parameterize Tests' />
					</ListItemButton>
				</ListItem>
			</Link>
			<Link href="/dashboard/test_codes">
				<ListItem disablePadding selected={selected === "test_codes"}>
					<ListItemButton>
						<ListItemIcon>
							<MailIcon />
						</ListItemIcon>
						<ListItemText primary='Test Codes' />
					</ListItemButton>
				</ListItem>
			</Link>
		</List>
		{/* <Divider />
		<List>
			{['All mail', 'Trash', 'Spam'].map((text, index) => (
				<ListItem key={text} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItemButton>
				</ListItem>
			))}
		</List> */}
	</Box>

	return (
		<ClippedDrawer sidebar={sidebar}>
			<Button variant="outlined">
				New Role
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