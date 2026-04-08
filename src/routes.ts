// routes for user
import { Router } from "express";
import {
   browse,
   add,
   edit,
   destroy,
} from "./controllers/user/userController.ts";

const router = Router();

router.get("/users", browse);
router.post("/users", add);
router.put("/users/:id", edit);
router.delete("/users/:id", destroy);
export default router;
