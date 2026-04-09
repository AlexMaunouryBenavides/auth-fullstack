import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../datasource/data-source.ts";
import { User } from "../../entity/User.ts";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // recup donner user
      const { email, password } = req.body;
      if (!email || !password) {
         res.status(400).json({ message: "Missing required fields" });
         return;
      }

      // verifier si mail exist dans bdd
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });
      if (!user) {
         res.status(401).json({ message: "credentials invalid" });
         return;
      }

      // comparer le mdp avec celui de la bdd
      const isMatch = await compare(password, user.password);
      if (!isMatch) {
         res.status(401).json({ message: "credentials invalid" });
         return;
      }

      // generer token jwt
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
         expiresIn: "1h",
      });
      // envoyer par cookies
      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
      });
      res.json({ message: "Login successful" });
   } catch (error) {
      next(error);
   }
};
