const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const User = require("../models/User");
const Job = require("../models/Job");

console.log("APPLICATION ROUTES LOADED");

// ================= APPLY FOR A JOB =================

router.post("/apply", async (req, res) => {
  try {
    const { candidate, job } = req.body;
    const candidateUser = await User.findById(candidate);

if (!candidateUser || candidateUser.role !== "Candidate") {
  return res.status(403).json({
    message: "Only candidates can apply for jobs",
  });
}

    const existingApplication = await Application.findOne({
      candidate,
      job,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    const application = new Application({
      candidate,
      job,
    });

    await application.save();

// Get candidate details
const candidateInfo = await User.findById(candidate);

// Get job details
const jobInfo = await Job.findById(job);

// Email notification disabled

res.status(201).json({
  message: "Application submitted successfully",
  application,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/// ================= GET APPLICATIONS OF A CANDIDATE =================

router.get("/candidate/:candidateId", async (req, res) => {
  try {
    const applications = await Application.find({
  candidate: req.params.candidateId,
})
.populate("job", "title company");

// Remove applications whose job was deleted
const validApplications = applications.filter(
  (app) => app.job !== null
);

res.status(200).json(validApplications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// ================= GET RECRUITER APPLICATIONS =================

router.get("/:recruiterId", async (req, res) => {
  try {

    const Job = require("../models/Job");

    // Find jobs created by this recruiter
    const jobs = await Job.find({
      recruiter: req.params.recruiterId,
    });

    const jobIds = jobs.map((job) => job._id);

    // Find applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("candidate", "name email resume")
      .populate("job", "title company");

    res.status(200).json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

// ================= UPDATE APPLICATION STATUS =================

router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id)
  .populate("candidate")
  .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = status;

await application.save();




res.status(200).json({
  message: "Application status updated successfully",
  application,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= TEST PUT ROUTE =================

router.put("/test", (req, res) => {
  res.status(200).json({
    message: "PUT route is working"
  });
});

module.exports = router;