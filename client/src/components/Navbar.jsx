import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        HireTrack
      </h1>

      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="hover:text-gray-200 transition"
        >
          Home
        </Link>

        {user?.role === "Candidate" && (
          <Link
            to="/candidate-dashboard"
            className="hover:text-gray-200 transition"
          >
            Dashboard
          </Link>
        )}

        {user?.role === "Recruiter" && (
          <Link
            to="/recruiter-dashboard"
            className="hover:text-gray-200 transition"
          >
            Dashboard
          </Link>
        )}

        {user && (
          <>
            <Link
              to="/profile"
              className="hover:text-gray-200 transition"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;