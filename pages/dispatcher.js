import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { unstable_getServerSession } from 'next-auth'
import { ADMIN, VALIDATOR, DEVELOPER, GATEKEEPER } from '../helper/constants'
import { authOptions } from './api/auth/[...nextauth]'

export default function Dispatcher() {
  return (
    <Layout>
    </Layout>
  )
}

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

	if(session.user) {
    let url = '/'
    if(session.user.role === ADMIN) {
      url = '/admin/users'
    } else if(session.user.role === VALIDATOR) {
      url = '/dashboard/test_codes'
    } else if(session.user.role === DEVELOPER) {
      url = '/dashboard/models'
    } else if(session.user.role === GATEKEEPER) {
			url = '/dashboard/gatekeeper/test_codes'
		}
		return {
			redirect: {
				destination: url,
				permanent: false
			}
		}
	}

	return {
		props: {}
	}
}
