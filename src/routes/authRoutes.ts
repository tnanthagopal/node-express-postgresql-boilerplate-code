import { Router } from "express";
import { logIn, refresh } from "../controllers/authControllers";
const router: Router = Router();

router.post("/login", logIn);
router.post("/refresh", refresh);

export default router;
