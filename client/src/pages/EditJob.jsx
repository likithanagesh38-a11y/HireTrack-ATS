import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  // ================= FETCH JOB =================
  const fetchJob = async () => {
    try {
      const res = await axios.get(
        "https://hiretrack-ats.onrender.com/api/jobs"
      );

      const selectedJob = res.data.find(
        (j) => j._id === id
      );

      if (selectedJob) {
        setJob({
          title: selectedJob.title,
          company: selectedJob.company,
          description: selectedJob.description,
          skills: selectedJob.skills,
        });
      }

    } catch (err) {
      console.log("Error fetching job:", err);
    }
  };


  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };


  // ================= UPDATE JOB =================
  const updateJob = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://hiretrack-ats.onrender.com/api/jobs/${id}`,
        job
      );

      toast.success("Job updated successfully");

      navigate("/recruiter-dashboard");

    } catch (err) {
      console.log("Update error:", err);
      toast.error("Failed to update job");
    }
  };


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Edit Job
          </h2>


          <form
            onSubmit={updateJob}
            className="space-y-5"
          >

            <input
              type="text"
              name="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            <input
              type="text"
              name="company"
              value={job.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              placeholder="Job Description"
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            <input
              type="text"
              name="skills"
              value={job.skills}
              onChange={handleChange}
              placeholder="Required Skills"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Update Job
            </button>


          </form>

        </div>

      </div>
    </>
  );
};


export default EditJob;