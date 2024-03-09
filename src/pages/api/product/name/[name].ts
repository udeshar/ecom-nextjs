import { CustomError } from "@/helpers/CustomError";
import { checkIfAdminExist, checkIfAdminExist2 } from "@/helpers/dbUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default async function handler(req: NextApiRequest, res : NextApiResponse){
    console.log(req.method)

    if(req.method === 'GET'){
        try {
            const name = req.query.name as string;
            const prisma = new PrismaClient();
            const products = await prisma.product.findMany({
                where: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            });
            res.status(200).json(products);
            await prisma.$disconnect();
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
    }
}