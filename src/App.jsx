import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Headers";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UnAuthenticatedRoutes from "./components/UnauthenticatedRoutes";
import { AuthProvider } from "./context/AuthProvider";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import CreateWedding from "./pages/CreateEvent";
import HomePage from "./pages/HomePage";
import ManageEvents from "./pages/ManageEvents";
import Profile from "./pages/Profile";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import WeddingEvent from "./pages/WeddingEvent";

const App = () => {
  return (
    <AuthProvider>
      {/* //* headers */}
      <Header />
      <main>
        {/* //* unauthenticated  */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route  path="/contact" element={<ContactPage />} />
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
      </main>

      {/* //* footers */}
      <Footer />
      <Toaster />
    </AuthProvider>
  );
};

export default App;
