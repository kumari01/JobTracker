const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company_name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "Not specified",
    },

    status: {
      type: String,
      enum: ["Applied", "In Progress", "Interview", "Rejected", "Offer"],
      default: "Applied",
    },

    job_type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
      required: true,
    },

    application_date: {
      type: Date,
      default: Date.now,
    },

    joblink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);