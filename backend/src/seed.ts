import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

const genders = ["Male", "Female", "Other"];
const features = [
  "date_filter",
  "gender_filter",
  "age_filter",
  "bar_chart_zoom",
  "line_chart_hover",
];

async function main() {
  console.log("Seeding...");

  // Create Users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        password: hashedPassword,
        age: Math.floor(Math.random() * 50) + 15, // 15 to 65
        gender: genders[Math.floor(Math.random() * genders.length)],
      },
    });
    users.push(user);
    console.log(`Created user ${user.username}`);
  }

  // Create Feature Clicks
  for (let i = 0; i < 100; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const feature = features[Math.floor(Math.random() * features.length)];
    const date = randomDate(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      new Date(),
    ); // Last 7 days

    await prisma.featureClick.create({
      data: {
        userId: user.id,
        featureName: feature,
        timestamp: date,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
