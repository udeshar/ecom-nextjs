import { CustomError } from "@/helpers/CustomError";
import { checkIfAdminExist } from "@/helpers/dbUtils";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
// import cloudinary from 'cloudinary';
import cloudinary from "@/helpers/cloudinaryConfig";
import { v4 as uuidv4 } from 'uuid';

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
            const name = req.body.name;
            const description = req.body.description;
            const file = req.body.image;
            if(!name || !description || !file) {
                res.status(400).json({message: "Please fill all the fields"})
                return;
            }
            else{
                const uploadedImage = await cloudinary.v2.uploader.upload(file, {
                    folder: 'ecom',
                });
                console.log(uploadedImage);
                const prisma = new PrismaClient();
                const id = uuidv4();
                const category = await prisma.category.create({
                    data: {
                        id, 
                        name,
                        description,
                        imagePath: uploadedImage.secure_url,
                    }
                })
                res.status(201).json({message: "Category Created", ...category})
                await prisma.$disconnect();
            }

            res.status(200).json({message: "Category Created"})
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
    }

    if(req.method === 'PUT'){
        try {
            await checkIfAdminExist(req.headers.authorization!);
            const id = req.body.id;
            const name = req.body.name;
            const description = req.body.description;
            const file = req.body?.file;
            const imagePath = req.body?.imagePath;
            if(!id || !name || !description) {
                res.status(400).json({message: "Please fill all the fields"})
                return;
            }
            if(!imagePath && !file){
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
                    const category = await prisma.category.update({
                        where: {
                            id
                        },
                        data: {
                            name,
                            description,
                            imagePath: uploadedImage.secure_url,
                        }
                    })
                    res.status(200).json({message: "Category Updated", ...category})
                    await prisma.$disconnect();
                }
                else{
                    const prisma = new PrismaClient();
                    const category = await prisma.category.update({
                        where: {
                            id
                        },
                        data: {
                            name,
                            description
                        }
                    })
                    res.status(200).json({message: "Category Updated", ...category})
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
        try {
            await checkIfAdminExist(req.headers.authorization!);
            const id = req.query.id as string;
            // accept id from params

            if(!id) {
                res.status(400).json({message: "Please fill all the fields"})
                return;
            }
            else{
                const prisma = new PrismaClient();
                const category = await prisma.category.delete({
                    where: {
                        id
                    }
                })
                res.status(200).json({message: "Category Deleted", ...category})
                await prisma.$disconnect();
            }
        } catch (error:CustomError | any) {
            console.log(error)
            res.status(error.status || 500).json({message: error.message, error : true})
            return;
        }
    }
}