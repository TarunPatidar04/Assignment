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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
const genders = ["Male", "Female", "Other"];
const features = [
    "date_filter",
    "gender_filter",
    "age_filter",
    "bar_chart_zoom",
    "line_chart_hover",
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Seeding...");
        // Create Users
        const users = [];
        for (let i = 0; i < 10; i++) {
            const hashedPassword = yield bcryptjs_1.default.hash("password123", 10);
            const user = yield prisma.user.create({
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
            const date = randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()); // Last 7 days
            yield prisma.featureClick.create({
                data: {
                    userId: user.id,
                    featureName: feature,
                    timestamp: date,
                },
            });
        }
        console.log("Seeding finished.");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
