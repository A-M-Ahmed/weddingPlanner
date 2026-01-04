import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Headers";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UnAuthenticatedRoutes from "./components/UnauthenticatedRoutes";
import { AuthProvider } from "./context/AuthProvider";

const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CreateWedding = lazy(() => import("./pages/CreateEvent"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ManageEvents = lazy(() => import("./pages/ManageEvents"));
const Profile = lazy(() => import("./pages/Profile"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const WeddingEvent = lazy(() => import("./pages/WeddingEvent"));

const App = () => {
  return (
    <AuthProvider>
      {/* //* headers */}
      <Header />
      <main>
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-3 min-h-screen">
              <div className="w-12 h-12 rounded-full border-b animate-spin border-indigo-500"></div>
            </div>
          }
        >
          {/* //* unauthenticated  */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* //*unauthenticated users redirect to these page */}
            <Route
              path="/signup"
              element={
                <UnAuthenticatedRoutes>
                  <SignUpPage />
                </UnAuthenticatedRoutes>
              }
            />
            <Route
              path="/signin"
              element={
                <UnAuthenticatedRoutes>
                  <SignInPage />
                </UnAuthenticatedRoutes>
              }
            />

            <Route path="/weddingEvent/:id" element={<WeddingEvent />} />

            {/* //* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/create-event"
              element={
                <ProtectedRoutes>
                  <CreateWedding />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/create-event/:id"
              element={
                <ProtectedRoutes>
                  <CreateWedding />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/manageEvents"
              element={
                <ProtectedRoutes>
                  <ManageEvents />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* //* footers */}
      <Footer />
      <Toaster />
    </AuthProvider>
  );
};

export default App;
