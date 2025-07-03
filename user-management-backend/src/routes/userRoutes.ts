import express from "express";
import multer from "multer";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  bulkUpload,
  downloadSample
} from "../controllers/userController";
import { body } from "express-validator";

const router = express.Router();
const upload = multer();

const userValidation = [
  body("first_name").notEmpty(),
  body("last_name").notEmpty(),
  body("email").isEmail(),
  body("phone_number").matches(/^\d{10}$/),
  body("pan_number").matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
];

router.get("/", getUsers);
router.post("/", userValidation, createUser);
router.put("/:id", userValidation, updateUser);
router.delete("/:id", deleteUser);
router.post("/bulk", upload.single("file"), bulkUpload);
router.get("/sample", downloadSample);

export default router;
