import { useState } from 'react'
import { unstable_getServerSession } from "next-auth/next"
import { Breadcrumbs, Typography, Card, CardContent, Switch, FormGroup, FormControlLabel } from '@mui/material'
import Link from 'next/link';
import { useRouter } from 'next/router'

import SelectTestCode from '../../../../components/test_code/SelectTestCode'
import ClippedDrawer from "../../../../components/ClippedDrawer"
import { authOptions } from '../../../api/auth/[...nextauth]';
import ValidatorMenu from '../../../../components/dashboard/ValidatorMenu';
import { VALIDATOR } from '../../../../helper/constants';

const label = { inputProps: { 'aria-label': 'Switch mode' } };

export default function EditValidationSuite({ data, user }) {

	const [mode, setMode] = useState("browse")
	const router = useRouter()
	const { id } = router.query

	return (
		<ClippedDrawer sidebar={<ValidatorMenu selected={"validation_tasks"} />}>
			<Breadcrumbs>
				<Link underline="hover" href="/dashboard/validation_tasks">Back</Link>
				<Typography color="text.primary">Edit Validation Suite</Typography>
			</Breadcrumbs>
			<Card sx={{mt: 1}}>
				<CardContent>
					<FormGroup sx={{width: "100px"}}>
						<FormControlLabel control={<Switch />} label="Search" />
					</FormGroup>
					<div>
						Model: 14144
					</div>
					<SelectTestCode />
				</CardContent>
			</Card>
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