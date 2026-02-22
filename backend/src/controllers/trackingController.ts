import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Add user property to Request interface via declaration merging (or just use any for simplicity here)
interface AuthRequest extends Request {
  user?: any;
}

export const trackEvent = async (req: AuthRequest, res: Response) => {
  const { feature_name } = req.body;
  const userId = req.user?.userId;

  try {
    await prisma.featureClick.create({
      data: {
        userId,
        featureName: feature_name,
      },
    });
    res.status(201).json({ message: "Event tracked" });
  } catch (error) {
    res.status(500).json({ error: "Failed to track event" });
  }
};
