import { CustomError } from "@/helpers/CustomError";
import { checkIfUserExist2 } from "@/helpers/dbUtils";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method === "POST") {
        const prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);
            
            const {
                addressId,
                paymentMethod,
                orderItems,
                total
            } = req.body;

            if(!addressId || !paymentMethod || !orderItems || !total){
                throw new CustomError("Please enter all the required fields", 400);
            }

            if(orderItems.length < 1){
                throw new CustomError("Please add order items", 400);
            }

            const newOrder = await prisma.order.create({
                data: {
                    id: uuidv4(),
                    addressId,
                    userId: user.id,
                    total: 0,
                    orderItems: {
                        create: orderItems
                    }
                }
            });

            return res.status(200).json(newOrder);

        } catch (error: CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
        finally {
            await prisma.$disconnect();
        }
    }
    
    return res.status(405).json({ message: "Method not allowed" });
}