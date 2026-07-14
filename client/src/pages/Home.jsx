import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-5xl font-bold">
          Welcome to HireTrack
        </h1>

        <p className="mt-5 text-lg">
          AI Powered Applicant Tracking System
        </p>
      </div>
    </>
  );
}

export default Home;