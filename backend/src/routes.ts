import { Router } from "express";
import { register, login } from "./controllers/authController";
import { trackEvent } from "./controllers/trackingController";
import { getAnalytics } from "./controllers/analyticsController";
import { authenticateToken } from "./middleware/authMiddleware";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Product Analytics Dashboard API!");
});

router.post("/register", register);
router.post("/login", login);
router.post("/track", authenticateToken, trackEvent);
router.get("/analytics", authenticateToken, getAnalytics);

export default router;
