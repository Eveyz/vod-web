import * as React from 'react';
import { Box, Typography, Card, CardContent, Button, Breadcrumbs } from '@mui/material';
import { unstable_getServerSession } from "next-auth/next"
import Link from 'next/link';

import { ADMIN, DEVELOPER, GATEKEEPER, VALIDATOR } from '../../../helper/constants';
import { authOptions } from '../../api/auth/[...nextauth]';
import ClippedDrawer from '../../../components/ClippedDrawer';
import AdminMenu from '../../../components/dashboard/AdminMenu';
import UserForm from '../../../components/admin/UserForm';
import { add_doc } from '../../../actions/firebase';
import { useRouter } from 'next/router';

export default function AdminUsers() {
	const router = useRouter()

	const addUser = async (user) => {
		await add_doc("users", user)
		router.push("/admin/users")
	}

  return (
		<ClippedDrawer sidebar={<AdminMenu selected={"users"} />}>
			<Breadcrumbs sx={{mb: 1}}>
				<Link underline="hover" href="/admin/users">Back</Link>
				<Typography color="text.primary">New User</Typography>
			</Breadcrumbs>
			<UserForm handleSubmit={addUser} />
		</ClippedDrawer>
  );
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