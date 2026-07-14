import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function CreateJob() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [job, setJob] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://hiretrack-ats.onrender.com/api/jobs/create",
        {
          ...job,
          recruiter: user._id,
        }
      );

      toast.success(response.data.message);

      navigate("/recruiter-dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-[500px]"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Create Job
          </h1>

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full border p-3 mb-4 rounded"
            value={job.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            className="w-full border p-3 mb-4 rounded"
            value={job.company}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Job Description"
            className="w-full border p-3 mb-4 rounded"
            rows="4"
            value={job.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Required Skills"
            className="w-full border p-3 mb-4 rounded"
            value={job.skills}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Create Job
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateJob;