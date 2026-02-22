import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, password, age, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        age: parseInt(age),
        gender,
      },
    });
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" },
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "Username already exists" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" },
    );
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
