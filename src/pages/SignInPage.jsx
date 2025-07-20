import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signIn } from "../lib/auth";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      setSuccess(true);
        toast.success("You are log in")
      setTimeout(() => {
        setSuccess(false);
        navigate("/");
      

      }, 3000);
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
   return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-3">
      {/* content  and the form*/}
      <div>
        {/* //* for the content */}
        <div className="my-2 text-center">
          <h1 className="my-2 text-lg font-semibold text-gray-900 capitalize lg:text-2xl">
            Welcome back
          </h1>
          <p className="text-base text-gray-500 lg:text-lg">
            Sign in to access your account
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
              <label htmlFor="email" className="my-2 text-lg font-medium">
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

            <button
              className="my-1 w-full cursor-pointer rounded-md bg-blue-500 px-4 py-3 text-lg font-medium tracking-wide text-white hover:bg-blue-600 focus:right-2 focus:bg-blue-700 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? "Sign in...." : "Sign in"}
            </button>
          </form>
          {/* //* switch to the sign in page incase has an account */}
          <div className="mt-3 py-2 text-center">
            <p className="">
              Don't have an account ?
              <Link
                to="/signup"
                className="ml-2 text-lg font-medium text-blue-500 capitalize"
              >
                sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
