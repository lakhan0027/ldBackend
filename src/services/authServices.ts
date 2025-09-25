import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RegisterInput {
  profilePic?: string;
  fullName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
}

export async function registerServices({
  profilePic,
  fullName,
  username,
  phone,
  email,
  password,
}: RegisterInput) {
  // 1. Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create new user
  const newUser = await prisma.user.create({
    data: {
      profilePic: profilePic || null,
      fullName,
      username,
      phone,
      email,
      password: hashedPassword,
    },
  });

  // 4. Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}



export async function loginServices({email,password}:{email:string,password:string}){

  const user=await prisma.user.findUnique({
    where:{email},
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }

 const isPasswordValid = await bcrypt.compare(password, user.password);

 if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

    // 3. Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;

}



