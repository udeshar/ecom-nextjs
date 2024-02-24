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
            const cart = await prisma.cart.findUnique({
                where: {
                    userId: user.id,
                }
            });
            if (!cart) {
                throw new CustomError("Cart not found", 404);
            }
            const cartItems = await prisma.cartItems.findMany({
                where:{
                    cartId : cart.id
                },
                include: {
                    product: true
                }
            })
            return res.status(200).json(cartItems);
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
            let cart = await prisma.cart.findUnique({
                where: {
                    userId: user.id,
                }
            });
            if (!cart) {
                // throw new CustomError("Cart not found", 404);
                cart = await prisma.cart.create({
                    data: {
                        id: uuidv4(),
                        userId: user.id
                    }
                });
            }
            const cartItem = await prisma.cartItems.findFirst({
                where: {
                    cartId: cart.id,
                    productId: productId
                }
            });
            if (cartItem) {
                throw new CustomError("Product already in cart", 400);
            } else {
                const newCartItem = await prisma.cartItems.create({
                    data: {
                        id: uuidv4(),
                        cartId: cart.id,
                        productId: productId,
                        quantity: 1
                    }
                });
                return res.status(201).json(newCartItem);
            }
            // return res.status(200).json(cart);
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