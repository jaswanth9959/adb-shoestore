import express from "express";
const router = express.Router();

import {
  loginStaff,
  logoutStaff,
  deleteStaff,
  getStaff,
  getStaffById,
  registerStaff,
  updateStaff,
  updateStaffProfile,
} from "../controllers/staff.js";

router.route("/").get(getStaff).post(registerStaff);
router.route("/:id").get(getStaffById).put(updateStaff).delete(deleteStaff);
router.route("/:id/profile").put(updateStaffProfile);

router.post("/logout", logoutStaff);
router.post("/login", loginStaff);
export default router;
