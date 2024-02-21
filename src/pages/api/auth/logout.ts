import type { NextApiRequest, NextApiResponse } from "next";
import { checkIfUserExist } from "@/helpers/dbUtils";
// import { cookies } from "next/headers";

async function handler(req : NextApiRequest, res : NextApiResponse){
    if (req.method === "POST") {
        try {
            await checkIfUserExist(req.headers.authorization!);
            // cookies().delete('token');
            res.setHeader('Set-Cookie', `token=; path=/; httpOnly;`)
            res.status(201).json({message : "Logged out successfully"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error", error: true})
        }
    } else{
        res.status(405).json({message: "Method not allowed", error : true})
    }
}

export default handler;