const express = require("express");
const router = express.Router();
console.log("Job routes loaded");

const Job = require("../models/Job");

// ================= CREATE JOB =================
router.post("/create", async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      skills,
      recruiter,
    } = req.body;

    const job = new Job({
      title,
      company,
      description,
      skills,
      recruiter,
    });

    await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET ALL JOBS =================
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// ================= DELETE JOB =================
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Update Job
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ================= GET RECRUITER JOBS =================
router.get("/recruiter/:id", async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.params.id,
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
})

module.exports = router;