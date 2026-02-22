"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackEvent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const trackEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { feature_name } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    try {
        yield prisma.featureClick.create({
            data: {
                userId,
                featureName: feature_name,
            },
        });
        res.status(201).json({ message: "Event tracked" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to track event" });
    }
});
exports.trackEvent = trackEvent;
