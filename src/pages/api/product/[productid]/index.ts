import { CustomError } from "@/helpers/CustomError";
import { checkIfAdminExist, checkIfAdminExist2 } from "@/helpers/dbUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/helpers/cloudinaryConfig";
import cookie from 'cookie';


export default async function handler(req: NextApiRequest, res : NextApiResponse){
    console.log(req.method)

    if(req.method === 'PATCH'){
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            await checkIfAdminExist2(cookies.token);

            const id = req.query.productid as string;
            const { 
                productName, 
                productPrice,
                offProduct,
                availability,
                productDescription,
                imagePath,
                featuredProduct,
                bestSeller,
                offered
            } = req.body;

            const file = req.body.image;

            if(!productName || !productPrice || !offProduct || !availability || !productDescription) {
                res.status(400).json({message: "Please fill all the fields"})
                return;
            }
            else if(offProduct < 0 || offProduct > 100){
                res.status(400).json({message: "Please enter a valid off percentage"})
                return;
            }
            else if(!imagePath && !file){
                res.status(400).json({message: "Please upload an image"})
                return;
            }
            else{
                if(file){
                    const uploadedImage = await cloudinary.v2.uploader.upload(file, {
                        folder: 'ecom',
                    });
                    console.log(uploadedImage);
                    const prisma = new PrismaClient();
                    const productt = await prisma.product.update({
                        where: {
                            id
                        },
                        data: {
                            name: productName,
                            price: parseInt(productPrice),
                            offer: parseInt(offProduct),
                            availability: availability,
                            description: productDescription,
                            imagePath: uploadedImage.secure_url,
                            featured: featuredProduct,
                            bestSeller: bestSeller,
                            offered: offered
                        }
                    })
                    res.status(200).json({message: "Category Updated", ...productt})
                    await prisma.$disconnect();
                }
                else{
                    const prisma = new PrismaClient();
                    const productt = await prisma.product.update({
                        where: {
                            id
                        },
                        data: {
                            name: productName,
                            price: parseInt(productPrice),
                            offer: parseInt(offProduct),
                            availability: availability,
                            description: productDescription,
                            featured: featuredProduct,
                            bestSeller: bestSeller,
                            offered: offered
                        }
                    })
                    res.status(200).json({message: "Category Updated", ...productt})
                    await prisma.$disconnect();
                }
            }
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
    }

    if(req.method === 'DELETE'){
        console.log("this is running")
        const id = req.query.productid as string;
        try {
            await checkIfAdminExist(req.headers.authorization!);
            const prisma = new PrismaClient();
            const product = await prisma.product.delete({
                where: {
                    id
                }
            })
            res.status(200).json({message: "Product Deleted", ...product})
            await prisma.$disconnect();
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
    }
}