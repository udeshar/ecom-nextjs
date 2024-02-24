import { PrismaClient } from "@prisma/client";
import { CustomError } from "./CustomError";
var jwt = require('jsonwebtoken');

export async function checkIfUserExist(token: string){
    const prisma = new PrismaClient();
    // saperate bearer from token
    const tokenArray = token.split(' ');
    if (!tokenArray[1] || tokenArray[1] == 'null') {
        throw new CustomError('Token not found', 401);
    }
    const parsed = JSON.parse(tokenArray[1]);
    const decoded = jwt.verify(parsed, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });
    await prisma.$disconnect();
    if (!user) {
        throw new CustomError('User not found', 404);
    }
    return user;
}

export async function checkIfUserExist2(token: string){
    const prisma = new PrismaClient();
    // saperate bearer from token
    if(!token){
        throw new CustomError('Token not found', 401);
    }
    const tokenArray = token.split(' ');
    if (!tokenArray[1] || tokenArray[1] == 'null') {
        throw new CustomError('Token not found', 401);
    }
    const decoded = jwt.verify(tokenArray[1], process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });
    await prisma.$disconnect();
    if (!user) {
        throw new CustomError('User not found', 404);
    }
    return user;
}

export async function checkIfAdminExist(token: string){
    console.log('Check if admin exist')
    const prisma = new PrismaClient();
    // saperate bearer from token
    if(!token){
        throw new CustomError('Token not found', 401);
    }
    const tokenArray = token.split(' ');
    if (!tokenArray[1] || tokenArray[1] == 'null') {
        throw new CustomError('Token not found', 401);
    }
    const parsed = JSON.parse(tokenArray[1]);
    const decoded = jwt.verify(parsed, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });
    await prisma.$disconnect();
    if (!user) {
        throw new CustomError('User not found', 404);
    }
    if(user.role !== 'ADMIN'){
        throw new CustomError('You are not authorized to perform this action', 403);
    }
    return user;
}

export async function checkIfAdminExist2(token: string){
    // console.log('Check if admin exist')
    // console.log(token)
    const prisma = new PrismaClient();
    // saperate bearer from token
    if(!token){
        throw new CustomError('Token not found', 401);
    }
    const tokenArray = token.split(' ');
    if (!tokenArray[1] || tokenArray[1] == 'null') {
        throw new CustomError('Token not found', 401);
    }
    console.log(tokenArray[1], "______")
    const decoded = jwt.verify(tokenArray[1], process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });
    await prisma.$disconnect();
    if (!user) {
        throw new CustomError('User not found', 404);
    }
    if(user.role !== 'ADMIN'){
        throw new CustomError('You are not authorized to perform this action', 403);
    }
    return user;
}

