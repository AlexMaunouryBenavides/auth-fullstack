import { AppDataSource } from "../../datasource/data-source.js";
import { User } from "../../entity/User.js";
import { hash, genSalt } from "bcrypt-ts";
export const browse = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
export const read = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const id = Number.parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
export const add = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        // recup user
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Invalid credentials" });
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
    }
    catch (error) {
        next(error);
    }
};
export const edit = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const id = Number.parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const { name, email, password } = req.body;
        const updates = {};
        if (name !== undefined)
            updates.name = name;
        if (email !== undefined)
            updates.email = email;
        if (password !== undefined)
            updates.password = password;
        userRepository.merge(user, updates);
        const updatedUser = await userRepository.save(user);
        return res.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
};
export const destroy = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const id = Number.parseInt(req.params.id, 10);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await userRepository.remove(user);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=userController.js.map