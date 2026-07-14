import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Profile from "./pages/Profile";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Candidate Dashboard */}
        <Route
  path="/candidate-dashboard"
  element={
    <ProtectedRoute role="Candidate">
      <CandidateDashboard />
    </ProtectedRoute>
  }
/>

        {/* Recruiter Dashboard */}
        <Route
  path="/recruiter-dashboard"
  element={
    <ProtectedRoute role="Recruiter">
      <RecruiterDashboard />
    </ProtectedRoute>
  }
/>

        {/* Create Job */}
        <Route
  path="/create-job"
  element={
    <ProtectedRoute role="Recruiter">
      <CreateJob />
    </ProtectedRoute>
  }
/>

        {/* Edit Job */}
        <Route
  path="/edit-job/:id"
  element={
    <ProtectedRoute role="Recruiter">
      <EditJob />
    </ProtectedRoute>
  }
/>

        {/* Profile */}
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </BrowserRouter>
  );
}

export default App;