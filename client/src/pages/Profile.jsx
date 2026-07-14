import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Profile() {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );


  const [user, setUser] = useState(storedUser);


  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [skills, setSkills] = useState(user?.skills || "");

  const [resume, setResume] = useState(null);



  // ================= UPDATE PROFILE =================

  const handleUpdate = async () => {

    try {


      const response = await axios.put(
  `http://localhost:5000/api/auth/profile/${user._id}`,
  {
    name,
    phone,
    skills
  }
);

      const updatedUser = response.data.user;


      setUser(updatedUser);


      localStorage.setItem(

        "user",

        JSON.stringify(updatedUser)

      );


      alert(
        "Profile updated successfully"
      );


    } catch(error) {


      console.log(error);

      alert(
        "Profile update failed"
      );


    }

  };





  // ================= UPLOAD RESUME =================

  const uploadResume = async () => {


    if(!resume){

      alert(
        "Please select resume"
      );

      return;

    }



    const formData = new FormData();


    formData.append(
      "resume",
      resume
    );



    try{


      const response = await axios.post(

        `http://localhost:5000/api/auth/upload-resume/${user._id}`,

        formData,

        {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        }

      );



      const updatedUser = {

        ...user,

        resume:response.data.resume

      };


      setUser(updatedUser);


      localStorage.setItem(

        "user",

        JSON.stringify(updatedUser)

      );



      alert(
        "Resume uploaded successfully"
      );



    }catch(error){


      console.log(error);

      alert(
        "Resume upload failed"
      );


    }


  };






  return (

    <>

    <Navbar />


    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">


      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">


        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">

          My Profile

        </h1>




        <div className="space-y-4">



          <input

            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

            value={name}

            onChange={(e)=>setName(e.target.value)}

            placeholder="Name"

          />



          <div>
  <label className="font-semibold">
    Email
  </label>

  <input
    type="email"
    value={email}
    disabled
    className="border border-gray-300 p-3 rounded-lg w-full bg-gray-100 cursor-not-allowed"
  />
</div>



          <input

            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

            value={phone}

            onChange={(e)=>setPhone(e.target.value)}

            placeholder="Phone Number"

          />



          <input

            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"

            value={skills}

            onChange={(e)=>setSkills(e.target.value)}

            placeholder="Skills"

          />





          {/* Resume Upload */}


          <div>


            <label className="font-semibold">

              Upload Resume (PDF)

            </label>


            <input

              type="file"

              accept=".pdf"

              className="border border-gray-300 p-2 rounded-lg w-full mt-2 bg-white"
              onChange={(e)=>
                setResume(e.target.files[0])
              }

            />


            <button

              onClick={uploadResume}

              className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"

            >

              Upload Resume

            </button>
            {user?.resume && (
  <a
    href={`http://localhost:5000/${user.resume}`}
    target="_blank"
    rel="noopener noreferrer"
    className="block mt-3 text-blue-600 font-semibold hover:underline"
  >
    View Uploaded Resume
  </a>
)}

          </div>






          <div>

            <label className="font-semibold">

              Role

            </label>


            <input

              disabled

              value={user?.role || ""}

              className="border p-3 rounded-lg w-full bg-gray-100"

            />


          </div>





          <button

            onClick={handleUpdate}

            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"

          >

            Save Changes

          </button>




        </div>


      </div>


    </div>


    </>

  );

}


export default Profile;