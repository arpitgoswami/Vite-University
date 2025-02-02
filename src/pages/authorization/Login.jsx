import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { LiaSignInAltSolid } from 'react-icons/lia'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import axios from '@axios'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const auth = localStorage.getItem('auth')

    if (auth) {
        window.location.href = '../dashboard/overview'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await axios.post('login', { username, password })

            if (response.status === 200) {
                const { token, authorization, username } = response.data
                document.cookie = `authToken=${token};`
                document.cookie = `authorization=${authorization};`
                document.cookie = `username=${username};`

                toast.success('Login successful!', {
                    onClose: () => {
                        localStorage.setItem('username', username)
                        localStorage.setItem('auth', token)
                        window.location.href = '../dashboard/overview'
                    },
                    autoClose: 1000,
                })
            }
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error('User Not Found.', { autoClose: 2000 })
            } else if (error.response?.status === 404) {
                toast.error('Server Could not be accessed', {
                    autoClose: 2000,
                })
            } else {
                console.error('Error during login:', error)
                toast.error('Server could not be accessed.', {
                    autoClose: 2000,
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen flex-col justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md">
                <div className="text-center">
                    <img src="/logo.jpg" alt="Logo" className="mx-auto h-12" />
                    <h2 className="mt-6 text-xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form
                    className="card mt-8 space-y-2 rounded-lg bg-white p-6 shadow-lg"
                    onSubmit={handleSubmit}
                >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="input input-bordered w-full"
                            onChange={(e) =>
                                setUsername(e.target.value.toLowerCase())
                            }
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="input input-bordered w-full pr-10"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-4 duration-300 hover:opacity-50"
                                onClick={() =>
                                    setIsPasswordVisible(!isPasswordVisible)
                                }
                            >
                                {isPasswordVisible ? (
                                    <AiOutlineEye size={20} />
                                ) : (
                                    <AiOutlineEyeInvisible size={20} />
                                )}
                            </button>
                        </div>
                        <label className="label mt-2">
                            <span className="label-text-alt">
                                <a
                                    href="#"
                                    className="link link-primary no-underline"
                                    onClick={() =>
                                        (window.location.href = '../contact')
                                    }
                                >
                                    Forgot password?
                                </a>
                            </span>
                        </label>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                'Signing in ..'
                            ) : (
                                <>
                                    Sign in{' '}
                                    <LiaSignInAltSolid
                                        size={20}
                                        strokeWidth={1}
                                    />
                                </>
                            )}
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-center text-xs">
                    Not a member?{' '}
                    <a
                        href="#"
                        className="link link-primary no-underline"
                        onClick={() => (window.location.href = '../contact')}
                    >
                        Raise a query
                    </a>
                </p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
