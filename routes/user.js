import express from "express";

import { getMyDetails, login, logout, Register } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/Register",Register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAuthenticated,getMyDetails);

export default router;