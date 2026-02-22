import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAnalytics = async (req: Request, res: Response) => {
  const { startDate, endDate, age, gender } = req.query;

  const whereClause: any = {};

  if (startDate && endDate) {
    whereClause.timestamp = {
      gte: new Date(startDate as string),
      lte: new Date(endDate as string),
    };
  }

  if (age) {
    if (age === "<18") whereClause.user = { age: { lt: 18 } };
    else if (age === "18-40") whereClause.user = { age: { gte: 18, lte: 40 } };
    else if (age === ">40") whereClause.user = { age: { gt: 40 } };
  }

  if (gender) {
    whereClause.user = { ...whereClause.user, gender: gender as string };
  }

  try {
    const clicks = await prisma.featureClick.findMany({
      where: whereClause,
      include: { user: true },
    });

    // Aggregations
    const featureUsage = clicks.reduce((acc: any, click) => {
      acc[click.featureName] = (acc[click.featureName] || 0) + 1;
      return acc;
    }, {});

    const timeTrend = clicks.reduce((acc: any, click) => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
