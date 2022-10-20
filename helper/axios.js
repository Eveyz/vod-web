import axios from 'axios'
import { useSession } from 'next-auth/react';

const ax = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})

export default ax
