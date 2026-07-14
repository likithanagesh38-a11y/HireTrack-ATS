import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function CandidateDashboard() {

  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;



  // Fetch jobs
  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/jobs"
        );

        setJobs(response.data);

      } catch (error) {

        console.log("Job fetch error:", error);

      }

    };


    fetchJobs();

  }, []);




  // Fetch candidate applications
  useEffect(() => {

    const fetchApplications = async () => {

      try {

        const response = await axios.get(
          `http://localhost:5000/api/applications/candidate/${userId}`
        );

        setApplications(response.data);


      } catch (error) {

        console.log(
          "Application fetch error:",
          error
        );

      }

    };


    if (userId) {
      fetchApplications();
    }


  }, [userId]);





  // Apply job
  const applyJob = async (jobId) => {

    try {

      console.log("Logged User ID:", user?._id);
      console.log("Full User:", JSON.stringify(user));
      console.log("Job ID:", jobId);



      const response = await axios.post(
        "http://localhost:5000/api/applications/apply",
        {
          candidate: user._id,
          job: jobId,
        }
      );
      


      setMessage(response.data.message);



      // Refresh applications
      const updatedApplications = await axios.get(
        `http://localhost:5000/api/applications/candidate/${user._id}`
      );


      setApplications(updatedApplications.data);



    } catch (error) {

      console.log(
        "APPLY ERROR:",
        error.response?.data
      );


      setMessage(
        error.response?.data?.message ||
        "Application failed"
      );

    }

  };
  const filteredJobs = jobs.filter((job) =>
  job.title.toLowerCase().includes(search.toLowerCase()) ||
  job.company.toLowerCase().includes(search.toLowerCase()) ||
  job.skills.toLowerCase().includes(search.toLowerCase())
);





  return (

    <>

      <Navbar />


      <div className="min-h-screen bg-gray-100 p-10">


        <h1 className="text-4xl font-bold mb-5">
          Candidate Dashboard
        </h1>




        {message && (

          <p className="text-green-600 font-bold mb-5">
            {message}
          </p>

        )}






        {/* Available Jobs */}

        <div className="bg-white p-5 rounded-lg shadow">


          <h2 className="text-2xl font-bold mb-5">
            Available Jobs
          </h2>
          <input
  type="text"
  placeholder="Search jobs by title, company or skills..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mb-5 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
/>



          <div className="grid md:grid-cols-3 gap-5">


            {filteredJobs.map((job)=>(


              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition"
              >


                <h3 className="text-xl font-bold">
                  {job.title}
                </h3>



                <p className="mt-2">
                  Company: {job.company}
                </p>



                <p className="mt-2">
                  Description: {job.description}
                </p>



                <p className="mt-2">
                  Skills: {job.skills}
                </p>



                <button

                  onClick={() => applyJob(job._id)}

                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                  Apply

                </button>



              </div>


            ))}


          </div>


        </div>








        {/* My Applications + Profile */}


        <div className="grid md:grid-cols-2 gap-5 mt-5">





          {/* My Applications */}


          <div className="bg-white p-5 rounded-lg shadow">


            <h2 className="text-xl font-bold mb-3">
              My Applications
            </h2>




            {

              applications.length === 0 ? (

                <p>
                  No applications yet.
                </p>


              ) : (


                applications.map((app)=>(


                  <div

                    key={app._id}

                    className="border p-3 mb-3 rounded"

                  >



                    <h3 className="font-bold">
  {app.job?.title || "Job Deleted"}
</h3>

<p>
  Company: {app.job?.company || "-"}
</p>



                    <p>
                      Status: {app.status}
                    </p>



                  </div>


                ))


              )


            }



          </div>







          {/* Profile */}


          <div className="bg-white p-5 rounded-lg shadow">


            <h2 className="text-xl font-bold mb-3">
  Profile
</h2>

<p className="mb-4">
  Update your personal information, skills, phone number and resume.
</p>

<button
  onClick={() => window.location.href = "/profile"}
  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
  Go to My Profile
</button>


          </div>




        </div>




      </div>



    </>

  );

}


export default CandidateDashboard;