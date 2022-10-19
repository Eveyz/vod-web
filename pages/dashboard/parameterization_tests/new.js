import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Breadcrumbs } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../components/dashboard/ValidatorMenu';
import NewParameterizationForm from '../../../components/parameterization_tests/NewForm'
import { VALIDATOR } from '../../../helper/constants';

export default function NewParameterizationTest() {

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"parameterization_tests"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/dashboard/parameterization_tests">Back</Link>
				<Typography color="text.primary">New Parameterization Tests</Typography>
			</Breadcrumbs>
			<br/>
			<NewParameterizationForm />
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