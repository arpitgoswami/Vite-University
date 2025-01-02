function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-center">
        Coming Soon!
      </h1>
      <p className="text-lg sm:text-xl mb-6 text-center">
        We're working hard to launch something amazing.
      </p>
      <div className="form-control w-full max-w-xs text-center mb-6">
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
      <div className="flex justify-center space-x-6 mt-6">
        <a href="#" className="link link-hover text-white hover:text-gray-300">
          Facebook
        </a>
        <a href="#" className="link link-hover text-white hover:text-gray-300">
          Twitter
        </a>
        <a href="#" className="link link-hover text-white hover:text-gray-300">
          Instagram
        </a>
      </div>
    </div>
  );
}

export default ComingSoon;
