import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";
import Appointments from "./pages/Appointments";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import UpdateEvent from "./pages/UpdateEvent";
import UserCalendar from "./pages/UserCalendar";
import { useLoggedInUser } from "./hooks/Auth/useGetMe";
import { useEffect } from "react";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function ProtectedRoute({ children, role }) {
  const { data: user } = useLoggedInUser();
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login", { replace: true });
  }

  if (role && user.role !== role) {
    return navigate("/", { replace: true });
  }
  console.log(user);

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-event"
              element={
                <ProtectedRoute role="doctor">
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <UserCalendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event/:eventId"
              element={
                <ProtectedRoute>
                  <EventDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event/:eventId/update"
              element={
                <ProtectedRoute role={"doctor"}>
                  <UpdateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "1.7rem",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
