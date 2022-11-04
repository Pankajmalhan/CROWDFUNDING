const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    projectID: {
      type: Number,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    project_target_price: {
      type: Number,
    },
    project_deadline_date: {
      type: Number,
    },
    project_minimum_fund_price: {
      type: Number,
    },
    projectOwner: {
      type: String,
    },
    contractAddress: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);