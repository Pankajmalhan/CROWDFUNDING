const express = require("express");
const router = express.Router();
const { register, validateUser } = require("../controllers/auth");

/*
 * Register route
 */
router.post("/register", register);
router.post("/validateUser", validateUser);

module.exports = router;
