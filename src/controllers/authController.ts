import jwt from "jsonwebtoken";

import type { Request, Response } from 'express';
import { loginServices, registerServices } from '../services/authServices.js';
import { generateToken } from "../utils/jwt.js";


export async function registerController(req: Request, res: Response) {
  try {
    const {profilePic, fullName, username, phone, email, password } = req.body;

    const user = await registerServices({
      profilePic,
      fullName,
      username,
      phone,
      email,
      password,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
    });
  } catch (error: any) {
    console.error(error, 'User registration failed');
    res.status(400).json({ error: error.message });
  }
}


export async function loginController(req:Request,res:Response){
  
  try{
    const {email,password}=req.body;
    
     const user = await loginServices({email, password});

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }


     const token = generateToken(user.id);
     

      return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
   
    
  }catch(error:any){
      console.error(error, 'User Login failed');
      res.status(400).json({ error: error.message });
  }
}


export async function logoutController(req: Request, res: Response) {
  try {
    // If using stateless JWT: just tell frontend to clear token
    return res.status(200).json({
      success: true,
      message: "Logout successful. Please remove the token from client storage.",
    });
  } catch (error: any) {
    console.error(error, "User Logout failed");
    res.status(500).json({ error: "Logout failed" });
  }
}
