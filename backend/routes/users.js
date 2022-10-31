const express = require("express");
const router = express.Router();
const { getNonce } = require("../controllers/users");

router.post("/getNonce", getNonce);

module.exports = router;
