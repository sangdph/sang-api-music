import express from "express";
import { 
    createUserController, 
    detailsUserController, 
    idUserController, 
    loginUserController, 
    userController, 
    searchUserController, 
    updateUserController,
    deleteUserController,
    deleteAllUserController
} from "../controller/userController.js";

const router = express.Router();

// router.get("/details", detailsUserController)
router.get("/search", searchUserController);

router.put("/update/:id", updateUserController);

router.delete("/delete/:id", deleteUserController);

router.delete("/deleteAll", deleteAllUserController);

router.get("/:userId", detailsUserController);

router.post("/login", loginUserController);

router.post("/", createUserController);

router.get("/", userController)

export default router;