import { CustomError } from "@/helpers/CustomError";
import { checkIfUserExist, checkIfUserExist2 } from "@/helpers/dbUtils";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';

export default async function handler(req : NextApiRequest, res : NextApiResponse){
    if(req.method === 'DELETE'){
        const prisma = new PrismaClient();
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const user = await checkIfUserExist2(cookies.token);
            const wishlistItemId = req.query.wishlistitem as string;
            if(!wishlistItemId){
                throw new CustomError("Please enter the wishlist item id", 400);
            }
            const wishlist = await prisma.wishlist.findUnique({
                where: {
                    userId: user.id,
                }
            });
            if(!wishlist){
                throw new CustomError("Wishlist not found", 404);
            }
            const wishlistItem = await prisma.wishlistItems.findUnique({
                where: {
                    id: wishlistItemId
                }
            });
            if(!wishlistItem){
                throw new CustomError("Wishlist item not found", 404);
            }
            if(wishlistItem.wishlistId !== wishlist.id){
                throw new CustomError("Forbidden", 403);
            }
            await prisma.wishlistItems.delete({
                where: {
                    id: wishlistItemId
                }
            });
            res.status(200).json({message: "Wishlist item deleted", error: false});
            
        } catch (error: CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        } finally {
            await prisma.$disconnect();
        }
    }
}