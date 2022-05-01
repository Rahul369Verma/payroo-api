import { Router } from "express";
import { getUserProfile } from "./user.controllers";


const router = Router();


router
  .route("/")
  .get(getUserProfile)
  // .delete(protect, deleteUser);



// router.route("/profile").put(updatePublicUrl);



// router.route("/password").post(changeUserPassword);


export default router;
