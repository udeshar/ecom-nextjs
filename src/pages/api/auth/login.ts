import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
var jwt = require('jsonwebtoken');

async function handler(req : NextApiRequest, res : NextApiResponse){
    if (req.method === "POST") {
        const prisma = new PrismaClient()
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({message: "Please fill all fields", error: true})
                return;
            }
            const userr = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (!userr) {
                res.status(400).json({message: "User not found", error : true})
                return;
            }
            const isPasswordValid = await compare(password, userr.password)
            if (!isPasswordValid) {
                res.status(400).json({message: "Invalid credentials", error : true})
                return;
            }
            const token = jwt.sign(userr, process.env.JWT_SECRET)
            // store token in cookie
            res.setHeader('Set-Cookie', `token=Bearer ${token}; path=/; httpOnly;`)
            res.status(201).json({...userr, token : token})
        } catch (error) {
            console.log(error)
            await prisma.$disconnect()
            res.status(500).json({message: "Internal server error", error: true})
        } finally {
            await prisma.$disconnect()
        }
    } else{
        res.status(405).json({message: "Method not allowed", error : true})
    }
}

export default handler;