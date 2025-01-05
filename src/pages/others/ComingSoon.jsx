function ComingSoon() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <h1 className="mb-4 text-center text-4xl font-extrabold sm:text-6xl">
                Coming Soon!
            </h1>
            <p className="mb-6 text-center text-lg sm:text-xl">
                We're working hard to launch something amazing.
            </p>
            <div className="form-control mb-6 w-full max-w-xs text-center">
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered input-primary w-full max-w-xs"
                    />
                    <button className="btn btn-primary">Notify Me</button>
                </div>
            </div>
            <p className="text-center text-sm">
                Stay tuned for updates. Follow us on social media!
            </p>
            <div className="mt-6 flex justify-center space-x-6">
                <a
                    href="#"
                    className="link-hover link text-white hover:text-gray-300"
                >
                    Facebook
                </a>
                <a
                    href="#"
                    className="link-hover link text-white hover:text-gray-300"
                >
                    Twitter
                </a>
                <a
                    href="#"
                    className="link-hover link text-white hover:text-gray-300"
                >
                    Instagram
                </a>
            </div>
        </div>
    )
}

export default ComingSoon
