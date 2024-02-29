import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
import { checkIfUserExist2 } from "@/helpers/dbUtils";
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from "@/helpers/CustomError";


export default async function handler(req : NextApiRequest, res : NextApiResponse){
    if(req.method === 'POST'){
        const Prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);

            const {
                address,
                city,
                state,
                zip,
                firstname,
                lastname
            } = req.body;

            if(address && city && state && zip && firstname && lastname){
                const addressData = await Prisma.address.create({
                    data: {
                        address,
                        city,
                        state,
                        zip,
                        firstName : firstname,
                        lastName : lastname,
                        userId: user.id,
                        id: uuidv4()
                    }
                });
                res.status(201).json({message: "Address added successfully", data: addressData})
            } else{
                throw new CustomError("Please fill all the fields", 400);
            }
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        } finally{
            await Prisma.$disconnect();
        }
    }
    if(req.method === 'GET'){
        const Prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);

            const addresses = await Prisma.address.findMany({
                where: {
                    userId: user.id
                }
            });
            res.status(200).json(addresses);
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        } finally{
            await Prisma.$disconnect();
        }
    }
    if(req.method === 'PUT'){
        const Prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);

            const {
                address,
                city,
                state,
                zip,
                firstName,
                lastName
            } = req.body;

            if(address && city && state && zip && firstName && lastName){
                const addressData = await Prisma.address.update({
                    where: {
                        id: req.body.id
                    },
                    data: {
                        address,
                        city,
                        state,
                        zip,
                        firstName,
                        lastName,
                    }
                });
                res.status(200).json({message: "Address updated successfully", data: addressData})
            } else{
                throw new CustomError("Please fill all the fields", 400);
            }
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        } finally{
            await Prisma.$disconnect();
        }
    }
    if(req.method === 'DELETE'){
        const Prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);

            const addressData = await Prisma.address.delete({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json({message: "Address deleted successfully", data: addressData})
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        } finally{
            await Prisma.$disconnect();
        }
    }
    else{
        res.status(405).json({message: "Method not allowed"})
    }
}