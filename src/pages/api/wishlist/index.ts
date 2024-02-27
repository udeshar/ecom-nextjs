import { CustomError } from "@/helpers/CustomError";
import { checkIfUserExist2 } from "@/helpers/dbUtils";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method === "GET") {
        const prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);
            if (!user) {
                throw new CustomError("Unauthorized", 401);
            }
            const wishlist = await prisma.wishlist.findUnique({
                where: {
                    userId: user.id,
                }
            });
            if (!wishlist) {
                throw new CustomError("wishlist not found", 404);
            }
            const wishlistItems = await prisma.wishlistItems.findMany({
                where:{
                    wishlistId : wishlist.id
                },
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    }
                }
            })
            return res.status(200).json(wishlistItems);
        } catch (error: CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
        finally {
            await prisma.$disconnect();
        }
    }

    if(req.method === 'POST'){
        const prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);
            if (!user) {
                throw new CustomError("Unauthorized", 401);
            }
            const productId = req.body.productId;
            if(!productId){
                throw new CustomError("Please enter the product id", 400);
            }
            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                }
            });
            if(!product){
                throw new CustomError("Product not found", 404);
            }
            let wishlist = await prisma.wishlist.findUnique({
                where: {
                    userId: user.id,
                }
            });
            if (!wishlist) {
                // throw new CustomError("wishlist not found", 404);
                wishlist = await prisma.wishlist.create({
                    data: {
                        id: uuidv4(),
                        userId: user.id
                    }
                });
            }
            const wishlistItem = await prisma.wishlistItems.findFirst({
                where: {
                    wishlistId: wishlist.id,
                    productId: productId
                }
            });
            if (wishlistItem) {
                throw new CustomError("Product already in wishlist", 400);
            } else {
                const newwishlistItem = await prisma.wishlistItems.create({
                    data: {
                        id: uuidv4(),
                        wishlistId: wishlist.id,
                        productId: productId,
                    }
                });
                return res.status(201).json(newwishlistItem);
            }
            // return res.status(200).json(wishlist);
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