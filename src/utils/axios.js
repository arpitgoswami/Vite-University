import axios from 'axios'

// https://aplex-backend-production.up.railway.app/
// https://aplex-backend.onrender.com/
// http://localhost:3000/

const instance = axios.create({
    baseURL: '// https://aplex-backend-production.up.railway.app/',

    headers: {
        'Content-Type': 'application/json',
    },
})

export default instance
