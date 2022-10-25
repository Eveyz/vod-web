import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Breadcrumbs } from '@mui/material';
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../../components/ClippedDrawer"
import { authOptions } from '../../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../../components/dashboard/ValidatorMenu';
import NewTestCodeForm from '../../../../components/test_code/Form'
import { VALIDATOR } from '../../../../helper/constants';
import { useRouter } from 'next/router';
import { get_doc, update_doc } from '../../../../actions/firebase';

export default function EditParameterizationTest({user, test, test_id}) {

	const router = useRouter()

	const handleSubmit = async (test) => {
		await update_doc("test_codes", test_id, test)
		router.push("/dashboard/test_codes")
	}

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"test_codes"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/dashboard/test_codes">Back</Link>
				<Typography color="text.primary">New Test Code</Typography>
			</Breadcrumbs>
			<br/>
			<NewTestCodeForm handleSubmit={handleSubmit} test={test} />
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

	// context.query.id => return route id
	const test_id = context.query.id
	const user = { id: session.user.id, role: session.user.role }
	const test = await get_doc("test_codes", test_id)

	return {
		props: { user, test, test_id }
	}
}