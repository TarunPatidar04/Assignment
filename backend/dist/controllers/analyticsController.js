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
exports.getAnalytics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, age, gender } = req.query;
    const whereClause = {};
    if (startDate && endDate) {
        whereClause.timestamp = {
            gte: new Date(startDate),
            lte: new Date(endDate),
        };
    }
    if (age) {
        if (age === "<18")
            whereClause.user = { age: { lt: 18 } };
        else if (age === "18-40")
            whereClause.user = { age: { gte: 18, lte: 40 } };
        else if (age === ">40")
            whereClause.user = { age: { gt: 40 } };
    }
    if (gender) {
        whereClause.user = Object.assign(Object.assign({}, whereClause.user), { gender: gender });
    }
    try {
        const clicks = yield prisma.featureClick.findMany({
            where: whereClause,
            include: { user: true },
        });
        // Aggregations
        const featureUsage = clicks.reduce((acc, click) => {
            acc[click.featureName] = (acc[click.featureName] || 0) + 1;
            return acc;
        }, {});
        const timeTrend = clicks.reduce((acc, click) => {
            const date = click.timestamp.toISOString().split("T")[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        // Format for charts
        const barChartData = Object.keys(featureUsage).map((key) => ({
            feature: key,
            count: featureUsage[key],
        }));
        const lineChartData = Object.keys(timeTrend).map((key) => ({
            date: key,
            count: timeTrend[key],
        }));
        res.json({ barChartData, lineChartData });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});
exports.getAnalytics = getAnalytics;
