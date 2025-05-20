import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepo = AppDataSource.getRepository(User);

//GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.find({ order: { createdAt: "ASC" } });
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch all users", error: error });
  }
};

//GET user by email
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await userRepo.findOneBy({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user by email", error: error });
  }
};

//PUT update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userRepo.findOneBy({email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    Object.assign(user, req.body);

    const updatedUser = await userRepo.save(user);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error });
  }
};
