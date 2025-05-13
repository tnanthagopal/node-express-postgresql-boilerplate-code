import { Router } from "express";
import { logIn, logout, refresh } from "../controllers/authControllers";
const router: Router = Router();

router.post("/login", logIn);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
