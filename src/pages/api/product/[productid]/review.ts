import { CustomError } from "@/helpers/CustomError";
import { checkIfUserExist2, rateProduct } from "@/helpers/dbUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import cookie from 'cookie';


export default async function handler(req: NextApiRequest, res : NextApiResponse){
    console.log(req.method)
    if(req.method == "POST"){
        const prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);

            const {productid} = req.query;
            const {comment, rating} = req.body;

            if(!rating){
                throw new CustomError("Please fill the ratings", 400);
            }

            const userReview = await prisma.review.findFirst({
                where: {
                    productId: productid as string,
                    userId: user.id
                }
            });

            if(userReview){
                throw new CustomError("You have already given review for this product", 400);
            }

            const product = await prisma.product.findUnique({
                where: {
                    id: productid as string
                }
            });
            if(!product){
                throw new CustomError("Product not found", 404);
            }
            const review = await prisma.review.create({
                data: {
                    comment,
                    rating: parseInt(rating),
                    productId: productid as string,
                    userId: user.id
                }
            });
            rateProduct(productid as string);
            res.status(200).json({message: "Review added successfully", review});
        } catch (error) {
            if(error instanceof CustomError){
                res.status(error.status).json({message: error.message, error: true});
            }
            else{
                res.status(500).json({message: "Something went wrong"});
            }
        } finally {
            await prisma.$disconnect();
        }
    }

    if(req.method == "GET"){
        const {productid} = req.query;
        const prisma = new PrismaClient();
        const reviews = await prisma.review.findMany({
            where: {
                productId: productid as string
            },
            include: {
                user: true
            }
        });
        res.status(200).json(reviews);
    }
    
}