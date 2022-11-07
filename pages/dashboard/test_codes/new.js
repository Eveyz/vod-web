import { useEffect } from 'react'
import Link from 'next/link';

import { Box, Card, CardContent, Button, Typography, Snackbar, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Breadcrumbs } from '@mui/material';
import { unstable_getServerSession } from "next-auth/next"

import ClippedDrawer from "../../../components/ClippedDrawer"
import { authOptions } from '../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../components/dashboard/ValidatorMenu';
import NewTestCodeForm from '../../../components/test_code/Form'
import { VALIDATOR } from '../../../helper/constants';
import { add_doc } from '../../../actions/firebase';
import { useRouter } from 'next/router';

export default function NewParameterizationTest({user}) {

	const router = useRouter()

	const handleSubmit = async (test) => {
		test['status'] = 'pending'
		test['user_id'] = user.id
		test['created_at'] = new Date().getTime()
		test['updated_at'] = new Date().getTime()
		await add_doc("test_codes", test)
		router.push("/dashboard/test_codes")
	}

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"test_codes"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/dashboard/test_codes">Back</Link>
				<Typography color="text.primary">New Test Code</Typography>
			</Breadcrumbs>
			<br/>
			<NewTestCodeForm handleSubmit={handleSubmit} />
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

	const user = { id: session.user.id, role: session.user.role }

	return {
		props: { user }
	}
}