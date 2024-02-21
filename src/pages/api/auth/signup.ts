import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

async function handler(req : NextApiRequest, res : NextApiResponse){
    if (req.method === "POST") {
        const prisma = new PrismaClient()
        try {
            const { email, password, confirmPassword } = req.body;
            if (!email || !password || !confirmPassword) {
                res.status(400).json({message: "Please fill all fields"})
                return;
            }
            if (password !== confirmPassword) {
                res.status(400).json({message: "Password and confirm password do not match"})
                return;
            }
            const user2 = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (user2) {
                res.status(400).json({message: "User already exists"})
                return;
            }
            const hashedPassword = await hash(password, 12);
            const id = uuidv4();
            console.log(id)
            const user = await prisma.user.create({
                data: {
                    id: id,
                    email,
                    password : hashedPassword
                }
            })
            res.status(201).json({message: "User created", ...user})
        } catch (error) {
            console.log(error)
            await prisma.$disconnect()
            res.status(500).json({message: "Internal server error"})
        } finally {
            await prisma.$disconnect()
        }
    } else{
        res.status(405).json({message: "Method not allowed"})
    }
}

export default handler;