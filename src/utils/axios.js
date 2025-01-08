import axios from 'axios'

// https://aplex-backend-production.up.railway.app/
// https://aplex-backend.onrender.com/
// http://localhost:3000/

const instance = axios.create({
<<<<<<< Updated upstream
    baseURL: 'https://aplex-backend.onrender.com/',
=======
    baseURL: 'https://aplex-backend-production.up.railway.app/',
>>>>>>> Stashed changes
    headers: {
        'Content-Type': 'application/json',
    },
})

export default instance
