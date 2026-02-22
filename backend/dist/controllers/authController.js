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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, age, gender } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                age: parseInt(age),
                gender,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                age: user.age,
                gender: user.gender,
            },
        });
    }
    catch (error) {
        res.status(400).json({ error: "Username already exists" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { username } });
        if (!user)
            return res.status(400).json({ error: "Invalid credentials" });
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                age: user.age,
                gender: user.gender,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.login = login;
