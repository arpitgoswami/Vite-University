import axios from '@axios'
import { toast } from 'react-toastify'
import React from 'react'

export function filterData(data, searchQuery, columns) {
    if (!searchQuery) return data

    return data.filter((item) =>
        columns.some((column) =>
            item[column]
                ?.toString()
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    )
}

export async function fetchData(url, setData, setLoading) {
    setLoading(true)
    try {
        const response = await axios.get(url)
        setData(response.data)
    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {
        setLoading(false)
    }
}

export const handleDelete = (id, url) => {
    const confirmDelete = () => {
        axios
            .delete(`${url}/${id}`)
            .then((result) => {
                toast.success('Data deleted successfully!', {
                    autoClose: 1000,
                    onClose: () => window.location.reload(),
                })
            })
            .catch((err) => {
                toast.error('Failed to delete item.', {
                    autoClose: 2000,
                })
            })
    }

    toast.info(
        React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                null,
                'Are you sure you want to delete this item?'
            ),
            React.createElement(
                'button',
                {
                    onClick: confirmDelete,
                    style: { marginRight: '10px' },
                },
                'Yes'
            ),
            React.createElement(
                'button',
                { onClick: () => toast.dismiss() },
                'No'
            )
        ),
        {
            autoClose: false, // Prevent auto close
            closeButton: false, // Hide the close button
            position: 'top-center',
        }
    )
}

export const verifyToken = async () => {
    try {
        const token = localStorage.getItem('auth')

        if (!token) {
            throw new Error('Token not found in cookies.')
        }

        const response = await axios.post('/status/verifyToken', { token })

        if (response.data.message === true) {
            return {
                valid: true,
                username: response.data.username,
                authorization: response.data.authorization,
                iat: response.data.iat,
                exp: response.data.exp,
            }
        } else {
            console.warn('Token is invalid.')
            return { valid: false }
        }
    } catch (error) {
        console.error('Error verifying token:', error.message || error)
        return { valid: false }
    }
}
