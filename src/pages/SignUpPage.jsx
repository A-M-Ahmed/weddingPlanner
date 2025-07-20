import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "../lib/auth";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const navigate = useNavigate();
  //*! handle submit

// React example


  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setError(null);
    // ** if the password dont much each other
    if (password !== confirmPassword) {
      setError("Password don't much");
      setIsLoading(false);
      return;
    }

    // ** if there is no error
    try {
      await signUp(email, password, username);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(
        error.message || "failed to create an account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-4 text-5xl text-green-500">✓</div>
            <h2 className="mb-2 text-2xl font-bold">Account Created!</h2>
            <p className="mb-4 text-gray-600">
              Your account has been created successfully. Please check your
              email for verification.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to sign in page in a few seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-3 lg:py-5">
      {/* content  and the form*/}
      <div>
        {/* //* for the content */}
        <div className="my-2 text-center">
          <h1 className="my-2 text-lg font-semibold text-gray-900 lg:text-2xl">
            Create an Account
          </h1>
          <p className="text-base text-gray-500 lg:text-lg">
            join our community and start sharing your ideas
          </p>
        </div>
        {/* //* For the form */}
        <div className="mx-auto mt-7 w-full max-w-md rounded-lg p-4 shadow-lg lg:p-6">
          {error && (
            <p className="mb-2 rounded-md bg-red-200 px-3 py-2 text-base text-red-700">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="my-2">
              <label
                htmlFor="email"
                className="my-2 text-lg font-medium text-gray-600"
              >
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="my-2 w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required

              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="my-2 text-lg font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="my-2 w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="my-2 text-lg font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="my-2 w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="my-2 text-lg font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="my-2 w-full rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <button
              className="my-1 w-full cursor-pointer rounded-md bg-blue-500 px-4 py-3 text-lg font-medium tracking-wide text-white hover:bg-blue-600 focus:right-2 focus:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Creating account...." : "Create an account"}
            </button>
          </form>
          {/* //* switch to the sign in page incase has an account */}
          <div className="mt-3 py-2 text-center">
            <p className="">
              Already have an account ?
              <Link
                to="/signin"
                className="ml-2 text-lg font-medium text-blue-500 capitalize"
              >
                sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
