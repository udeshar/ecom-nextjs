import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { checkIfUserExist } from "../../../helpers/dbUtils";
import { CustomError } from "@/helpers/CustomError";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    try {
      // get bearer token
      const token = req.headers.authorization;
      if (!token) {
        res.status(401).json({ message: "Unauthorize", error : true });
        return;
      }
      const user = await checkIfUserExist(token!);
      res.status(201).json({ user });
      
    } catch (error: CustomError | any) {
      console.log(error);
      res.status(error.status).json({ message: error.message, error : true });
    } finally {
      await prisma.$disconnect();
    }
  } 
  
  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
