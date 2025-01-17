import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '@function'

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            const result = await verifyToken()

            if (!result.valid) {
                navigate('*')
            }
        }

        checkToken()
    }, [navigate])

    return children ? children : null
}

export default PrivateRoute
