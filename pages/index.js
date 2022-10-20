import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

import { unstable_getServerSession } from 'next-auth';
import { ADMIN, VALIDATOR, GATEKEEPER } from '../helper/constants'
import { authOptions } from './api/auth/[...nextauth]';

export default function Home({url, isAuthenticated}) {
  return (
    <Layout url={url} isAuthenticated={isAuthenticated} >
      <h2>VoD Main Page</h2>
    </Layout>
  )
}

export async function getServerSideProps(context) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions)

  let url = "/"
  let isAuthenticated = false

	if(session && session.user) {
    if(session.user.role === ADMIN) url = "/admin/users"
    else if(session.user.role === VALIDATOR) url = "/dashboard/test_codes"
    else if(session.user.role === GATEKEEPER) url = "/dashboard/gatekeeper/groups"

    isAuthenticated = true
	}

	return {
		props: { url, isAuthenticated }
	}
}