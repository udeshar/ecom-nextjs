import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { checkIfUserExist, checkIfUserExist2 } from "../../../helpers/dbUtils";
import { CustomError } from "@/helpers/CustomError";
import cookie from 'cookie';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const prisma = new PrismaClient();
    try {
      // get bearer token
      const cookies = cookie.parse(req.headers.cookie || '');
      const user = await checkIfUserExist2(cookies.token);
      
      res.status(200).json({ user });
      
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
