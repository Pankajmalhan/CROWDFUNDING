const express = require("express");
const router = express.Router();
const { getAllProjects } = require("../controllers/project");

router.get("/getProjects", getAllProjects);

module.exports = router;
