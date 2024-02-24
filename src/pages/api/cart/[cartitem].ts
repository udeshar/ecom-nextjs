import { CustomError } from "@/helpers/CustomError";
import { checkIfUserExist, checkIfUserExist2 } from "@/helpers/dbUtils";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default async function handler(req : NextApiRequest, res : NextApiResponse){
    if(req.method === 'PATCH'){
        const prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);
            const cartItemId = req.query.cartitem as string;
            const quantity = req.body.quantity;
            if(!cartItemId){
                throw new CustomError("Please enter the cart item id and quantity", 400);
            }
            if(quantity == null || quantity == undefined){
                throw new CustomError("Please enter the quantity", 400);
            }
            const cart = await prisma.cart.findUnique({
                where: {
                    userId: user.id,
                }
            });
            if(!cart){
                throw new CustomError("Cart not found", 404);
            }
            const cartItem = await prisma.cartItems.findUnique({
                where: {
                    id: cartItemId,
                }
            });
            if(!cartItem){
                throw new CustomError("Cart item not found", 404);
            }
            if(cartItem.cartId !== cart.id){
                throw new CustomError("Forbidden", 403);
            }
            if(quantity < 1){
                await prisma.cartItems.delete({
                    where: {
                        id: cartItemId
                    }
                });
                return res.status(200).json({message: "Cart item deleted"});
            } else{
                const updatedCartItem = await prisma.cartItems.update({
                    where: {
                        id: cartItemId
                    },
                    data: {
                        quantity
                    }
                });
                return res.status(200).json(updatedCartItem);
            }
        } catch (error: CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        } finally {
            await prisma.$disconnect();
        }
    }
}