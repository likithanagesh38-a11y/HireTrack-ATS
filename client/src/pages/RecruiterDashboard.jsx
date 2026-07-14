import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
  totalJobs: 0,
  totalApplicants: 0,
  shortlisted: 0,
  rejected: 0,
  applied: 0,
});
const barData = {
  labels: ["Applied", "Shortlisted", "Rejected"],
  datasets: [
    {
      label: "Applications",
      data: [
        stats.applied,
        stats.shortlisted,
        stats.rejected,
      ],
      backgroundColor: [
        "#3B82F6",
        "#22C55E",
        "#EF4444",
      ],
    },
  ],
};

const pieData = {
  labels: ["Applied", "Shortlisted", "Rejected"],
  datasets: [
    {
      data: [
        stats.applied,
        stats.shortlisted,
        stats.rejected,
      ],
      backgroundColor: [
        "#3B82F6",
        "#22C55E",
        "#EF4444",
      ],
    },
  ],
};

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  // ================= FETCH APPLICATIONS =================
const fetchApplications = async () => {
  try {

    const response = await axios.get(
  `https://hiretrack-ats.onrender.com/api/applications/${user._id}`
);

    setApplications(response.data);

    setStats((prev)=>({
      ...prev,
      totalApplicants: response.data.length,

      shortlisted: response.data.filter(
        (app)=>app.status==="Shortlisted"
      ).length,

      rejected: response.data.filter(
        (app)=>app.status==="Rejected"
      ).length,

      applied: response.data.filter(
        (app)=>app.status==="Applied"
      ).length,
    }));

  } catch(error){

    console.log(
      "Error fetching applications:",
      error
    );

  }
};

  /// ================= FETCH RECRUITER JOBS =================
const fetchJobs = async () => {
  try {

    const response = await axios.get(
      `https://hiretrack-ats.onrender.com/api/jobs/recruiter/${user._id}`
    );

    setJobs(response.data);

    setStats((prev) => ({
      ...prev,
      totalJobs: response.data.length,
    }));

  } catch (error) {

    console.log("Error fetching jobs:", error);

  }
};
  // ================= UPDATE APPLICATION STATUS =================
  const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `https://hiretrack-ats.onrender.com/api/applications/status/${id}`,
      {
        status,
      }
    );

    // Refresh dashboard data
    fetchApplications();
    fetchJobs();

  } catch (error) {
    console.log("Error updating status:", error);
  }
};
  // ================= DELETE JOB =================
 const deleteJob = async (jobId) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await axios.delete(
      `https://hiretrack-ats.onrender.com/api/jobs/delete/${jobId}`
    );

    toast.success(response.data.message);
    fetchJobs();

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to delete job"
    );

  }

};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">
        {/* ================= STATISTICS ================= */}

<div className="grid md:grid-cols-5 gap-5 mb-8">

  <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
    <h3 className="font-bold text-lg">
      Total Jobs
    </h3>
    <p className="text-3xl font-bold">
      {stats.totalJobs}
    </p>
  </div>


  <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
    <h3 className="font-bold text-lg">
      Applicants
    </h3>
    <p className="text-3xl font-bold">
      {stats.totalApplicants}
    </p>
  </div>


  <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
    <h3 className="font-bold text-lg">
      Shortlisted
    </h3>
    <p className="text-3xl font-bold text-green-600">
      {stats.shortlisted}
    </p>
  </div>


 <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
    <h3 className="font-bold text-lg">
      Rejected
    </h3>
    <p className="text-3xl font-bold text-red-600">
      {stats.rejected}
    </p>
  </div>


  <div className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition">
    <h3 className="font-bold text-lg">
      Applied
    </h3>
    <p className="text-3xl font-bold text-blue-600">
      {stats.applied}
    </p>
  </div>

</div>
<div className="grid md:grid-cols-2 gap-6 mb-8">

  <div className="bg-white rounded-lg shadow p-5">
    <h2 className="text-xl font-bold mb-4">
      Applications Overview
    </h2>

    <Bar data={barData} />
  </div>

  <div className="bg-white rounded-lg shadow p-5">
    <h2 className="text-xl font-bold mb-4">
      Status Distribution
    </h2>

    <Pie data={pieData} />
  </div>

</div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Recruiter Dashboard
          </h1>

          <button
            onClick={() => navigate("/create-job")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            + Create Job
          </button>
        </div>

        {/* ================= MY JOBS ================= */}

        <h2 className="text-2xl font-bold mb-5">
          My Jobs
        </h2>

        {jobs.length === 0 ? (
          <p className="mb-8">
            No jobs created yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5 mb-10">

            {jobs.map((job) => (

              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition"
              >

                <h3 className="text-xl font-bold">
                  {job.title}
                </h3>

                <p className="mt-2">
                  <strong>Company:</strong> {job.company}
                </p>

                <p className="mt-2">
                  {job.description}
                </p>

                <p className="mt-2">
                  <strong>Skills:</strong> {job.skills}
                </p>

                <div className="mt-4 flex gap-3">
  <button
    onClick={() => navigate(`/edit-job/${job._id}`)}
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteJob(job._id)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
  >
    Delete Job
  </button>
</div>
              </div>

            ))}

          </div>
        )}

        {/* ================= APPLICANTS ================= */}

        <h2 className="text-2xl font-bold mb-5">
          Applicants
        </h2>

        {applications.length === 0 ? (

          <p>No applicants yet.</p>

        ) : (

          <div className="grid md:grid-cols-2 gap-5">

            {applications.map((app) => (

              <div
                key={app._id}
                className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition"
              >

                <h3 className="text-xl font-bold">
                  {app.job.title}
                </h3>

                <p className="mt-2">
                  <strong>Company:</strong> {app.job.company}
                </p>

                <p className="mt-2">
                  <strong>Candidate:</strong> {app.candidate.name}
                </p>

                <p className="mt-2">
                  <strong>Email:</strong> {app.candidate.email}
                </p>
                {app.candidate.resume && (
  <p className="mt-2">
    <a
      href={`https://hiretrack-ats.onrender.com/${app.candidate.resume}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 font-semibold hover:underline"
    >
      View Resume
    </a>
  </p>
)}

                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      app.status === "Applied"
                        ? "text-blue-600"
                        : app.status === "Shortlisted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>

                <div className="mt-4 flex gap-3">

                  <button
                    onClick={() =>
                      updateStatus(app._id, "Shortlisted")
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(app._id, "Rejected")
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  );
}

export default RecruiterDashboard;