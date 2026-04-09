// routes for user
import { Router } from "express";
import {
   browse,
   add,
   edit,
   destroy,
   read,
} from "./controllers/user/userController.ts";
import { login } from "./controllers/auth/authController.ts";

const router = Router();

// login route
router.post("/login", login);

// user routes
router.get("/users", browse);
router.get("/users/:id", read);
router.post("/users", add);
router.put("/users/:id", edit);
router.delete("/users/:id", destroy);
export default router;
