import Layout from "../components/layout"
import { Grid, TextField, Card, CardContent, Typography, Button } from '@mui/material'
import { useState } from "react"
import { signIn } from 'next-auth/react'

export default function Login() {

	const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const submit = () => {
		signIn()
		const url = `/api/v1/`
    fetch(url, {
			method: "POST",
			body: JSON.stringify({
				'username': username,
				'password': password
			})
		})
		.then(async res => {
			const data = await res.json() // receive jwt token
			// Login successfully, redirect to dashboard based on identity
		})
		.catch(err => {
			setMsg(err)
		})
  }

	return (
		<Layout>
			<Grid container style={{marginTop: "30px"}}>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                Login into VoD
              </Typography>
              <TextField fullWidth label="username" sx={{my: 2}} onChange={e => setUsername(e.target.value)} />
              <TextField fullWidth label="password" type="password" sx={{mb: 3}} onChange={e => setPassword(e.target.value)} />
              <Button variant='outlined' size="large" onClick={submit}>Login</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
		</Layout>
	)
}