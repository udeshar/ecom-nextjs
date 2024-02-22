import { CustomError } from "@/helpers/CustomError";
import { checkIfAdminExist } from "@/helpers/dbUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from "@/helpers/cloudinaryConfig";
import { off } from "process";

// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

export default async function handler(req: NextApiRequest, res : NextApiResponse){
    console.log(req.method)
    if(req.method === 'POST'){
        try {
            await checkIfAdminExist(req.headers.authorization!);
            const { 
                productName, 
                productPrice,
                offProduct,
                availability,
                productDescription,
                category,
                featuredProduct,
                bestSeller,
                offered
            } = req.body;

            const file = req.body.image;

            if(!productName || !productPrice || !offProduct || !availability || !productDescription || !category || !file) {
                res.status(400).json({message: "Please fill all the fields"})
                return;
            }
            else if(offProduct < 0 || offProduct > 100){
                res.status(400).json({message: "Please enter a valid off percentage"})
                return;
            }
            else{
                console.log(file)
                const uploadedImage = await cloudinary.v2.uploader.upload(file, {
                    folder: 'ecom',
                });
                console.log(uploadedImage);
                const prisma = new PrismaClient();
                const id = uuidv4();
                const categoryModel = await prisma.product.create({
                    data: {
                        id,
                        name: productName,
                        price: parseInt(productPrice),
                        offer: parseInt(offProduct),
                        availability: availability,
                        description: productDescription,
                        imagePath: uploadedImage.secure_url,
                        categoryId: category,
                        featured: featuredProduct,
                        bestSeller: bestSeller,
                        offered: offered
                    }
                })
                res.status(201).json({message: "Product Created", ...categoryModel})
                await prisma.$disconnect();
            }
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
    }
    else{
        res.status(405).json({message: "Method not allowed"})
    }
}