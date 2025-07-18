import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function UnAuthenticatedRoutes({ children, redirectTo = "/" }) {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-b-2 border-t-purple-500 border-b-orange-500"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
