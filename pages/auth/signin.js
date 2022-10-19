import Layout from "../../components/layout"
import { Grid, TextField, Card, CardContent, Typography, Button } from '@mui/material'
import { useState } from "react"
import { signIn } from 'next-auth/react'

export default function Signin() {

	const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const submit = () => {
		signIn('credentials', { username: username, password: password, callbackUrl: '/dispatcher' })
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
              <Button variant='outlined' size="large" type="button" onClick={submit}>Login</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
		</Layout>
	)
}