"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("./controllers/authController");
const trackingController_1 = require("./controllers/trackingController");
const analyticsController_1 = require("./controllers/analyticsController");
const authMiddleware_1 = require("./middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Welcome to the Product Analytics Dashboard API!");
});
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
router.post("/track", authMiddleware_1.authenticateToken, trackingController_1.trackEvent);
router.get("/analytics", authMiddleware_1.authenticateToken, analyticsController_1.getAnalytics);
exports.default = router;
