import { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        queryType: 'General',
        message: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Query Submitted:', formData)
        alert('Your query has been submitted successfully!')
        // Add logic to send the query to a backend server or an API endpoint
    }

    return (
        <div className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-6">
            <p className="text-center text-base font-semibold text-indigo-600">
                Contact Form
            </p>

            <h2 className="m-4 text-balance text-center text-5xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Raise a Query
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="queryType"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Query Type
                    </label>
                    <select
                        id="queryType"
                        name="queryType"
                        value={formData.queryType}
                        onChange={handleChange}
                        required
                        className="mt-2 block h-[2.2rem] w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="General">General</option>
                        <option value="Technical">Technical</option>
                        <option value="Billing">Billing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="message"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Details
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your query in detail"
                        required
                        className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
                <button
                    type="submit"
                    className="flex w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit Query
                </button>
            </form>
        </div>
    )
}

export default Contact
