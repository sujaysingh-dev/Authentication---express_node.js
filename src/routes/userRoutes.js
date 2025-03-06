const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const router = express.Router();

// only admin can access this route
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ Message: "Welcome admin" });
});

// admin and user can access this route
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "user"),
  (req, res) => {
    res.json({ Message: "Welcome user" });
  }
);

// amdin, user and teacher can access this route
router.get(
  "/teacher",
  verifyToken,
  authorizeRoles("admin", "user", "teacher"),
  (req, res) => {
    res.json({ Message: "Welcome teacher" });
  }
);

// everyone can access this route
router.get(
  "/student",
  verifyToken,
  authorizeRoles("admin", "user", "teacher", "student"),
  (req, res) => {
    res.json({ Message: "Welcome student" });
  }
);

module.exports = router;
