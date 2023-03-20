import express from "express";
import user_controller from "../controllers/user.js";


const router = express.Router();

router.get("/login", user_controller.login);
router.get("/logout", user_controller.logout);
router.post("/login", user_controller.auth);

export default router;



