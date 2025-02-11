import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyToken } from '@function'

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            const result = await verifyToken()

            if (!result.valid) {
                localStorage.clear()
                navigate('*')
            }

            if (result.authorization === 'designer') {
                navigate('/designer')
            } else if (
                result.authorization === 'accounts' &&
                !window.location.pathname.includes('invoice')
            ) {
                navigate('/accounts')
            }
        }

        checkToken()
    }, [navigate])

    return children ? children : null
}

export default PrivateRoute
