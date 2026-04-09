// controller for user from entity/user.ts
// fonction browse, read, edit, add, delete
import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../datasource/data-source.ts";
import { User } from "../../entity/User.ts";
import { hash, genSalt } from "bcrypt-ts";

export const browse = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      res.json(users);
   } catch (error) {
      next(error);
   }
};

export const read = async (
   req: Request<{ id: string }>,
   res: Response,
   next: NextFunction,
) => {
   try {
      const userRepository = AppDataSource.getRepository(User);
      const id = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(id)) {
         res.status(400).json({ message: "Invalid user ID" });
         return;
      }

      const user = await userRepository.findOneBy({ id });
      if (!user) {
         res.status(404).json({ message: "User not found" });
         return;
      }

      res.json(user);
   } catch (error) {
      next(error);
   }
};

export const add = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userRepository = AppDataSource.getRepository(User);

      // recup user
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
         res.status(400).json({ message: "Missing required fields" });
         return;
      }

      // hash du mdp + creation new user
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      const newUser = userRepository.create({
         name,
         email,
         password: hashPassword,
      });

      // envoie du user
      const savedUser = await userRepository.save(newUser);
      res.status(201).json(savedUser);
   } catch (error) {
      next(error);
   }
};
export const edit = async (
   req: Request<{ id: string }>,
   res: Response,
   next: NextFunction,
) => {
   try {
      const userRepository = AppDataSource.getRepository(User);

      const id = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(id)) {
         res.status(400).json({ message: "Invalid user ID" });
         return;
      }

      const user = await userRepository.findOneBy({ id });
      if (!user) {
         res.status(404).json({ message: "User not found" });
         return;
      }

      const { name, email, password } = req.body;
      const updates: Partial<User> = {};
      if (name !== undefined) updates.name = name;
      if (email !== undefined) updates.email = email;
      if (password !== undefined) updates.password = password;

      userRepository.merge(user, updates);
      const updatedUser = await userRepository.save(user);
      return res.json(updatedUser);
   } catch (error) {
      next(error);
   }
};
export const destroy = async (
   req: Request<{ id: string }>,
   res: Response,
   next: NextFunction,
) => {
   try {
      const userRepository = AppDataSource.getRepository(User);
      const id = Number.parseInt(req.params.id, 10);
      if (Number.isNaN(id)) {
         res.status(400).json({ message: "Invalid user ID" });
         return;
      }

      const user = await userRepository.findOneBy({ id });
      if (!user) {
         res.status(404).json({ message: "User not found" });
         return;
      }
      await userRepository.remove(user);
      res.sendStatus(204);
   } catch (error) {
      next(error);
   }
};
