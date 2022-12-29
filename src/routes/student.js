import express from "express";
import { studentController, detailsStudentControler } from "../controller/studentController.js";

const router = express.Router();
router.get("/", studentController)
router.get("/details", detailsStudentControler);



export default router;