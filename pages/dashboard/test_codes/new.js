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
import NewTestCodeForm from '../../../components/test_code/Form'
import { VALIDATOR } from '../../../helper/constants';

export default function NewParameterizationTest() {

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"test_codes"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/dashboard/test_codes">Back</Link>
				<Typography color="text.primary">New Test Code</Typography>
			</Breadcrumbs>
			<br/>
			<NewTestCodeForm />
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

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { user }
	}
}