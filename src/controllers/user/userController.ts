// controller for user from entity/user.ts
// fonction browse, read, edit, add, delete
import type { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../datasource/data-source.ts";
import { User } from "../../entity/User.ts";

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

// export const readUser = async (req: Request, res: Response) => {
//    try {
//       const userRepository = AppDataSource.getRepository(User);
//       const user = await userRepository.findOneBy({
//          id: parseInt(req.params.id),
//       });
//       if (!user) {
//          return res.status(404).json({ message: "User not found" });
//       }
//       res.json(user);
//    } catch (error) {
//       console.error("Error fetching user:", error);
//       res.status(500).json({ message: "Internal server error" });
//    }
// };

export const add = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userRepository = AppDataSource.getRepository(User);
      const newUser = userRepository.create(req.body);
      const savedUser = await userRepository.save(newUser);
      res.status(201).json(savedUser);
   } catch (error) {
      next(error);
   }
};
export const edit = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userRepository = AppDataSource.getRepository(User);
      let idParam = req.params.id;
      if (Array.isArray(idParam)) {
         idParam = idParam[0];
      }

      if (!idParam) {
         res.status(400).json({ message: "Invalid user ID" });
         return;
      }

      const id = Number.parseInt(idParam, 10);
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
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const userRepository = AppDataSource.getRepository(User);
      let idParam = req.params.id;
      if (Array.isArray(idParam)) {
         idParam = idParam[0];
      }

      if (!idParam) {
         res.status(400).json({ message: "Invalid user ID" });
         return;
      }

      const id = Number.parseInt(idParam, 10);
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
