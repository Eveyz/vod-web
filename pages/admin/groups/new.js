import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Breadcrumbs } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DataGrid } from "@mui/x-data-grid";
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import { ADMIN } from '../../../helper/constants';
import AdminMenu from '../../../components/dashboard/AdminMenu';
import GroupForm from '../../../components/admin/GroupForm';

export default function NewGroup() {

	return (
		<ClippedDrawer sidebar={<AdminMenu selected={"groups"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/admin/groups">Back</Link>
				<Typography color="text.primary">New Group</Typography>
			</Breadcrumbs>
			<br/>
			<GroupForm />
		</ClippedDrawer>
	)
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

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { user }
	}
}