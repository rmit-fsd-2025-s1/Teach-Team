import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/User";
import { Admin } from "../../../entities/Admins";

export const userMutations = {
  loginAdmin: async (_: any, { email, password }: { email: string; password: string }) => {
    const repo = AppDataSource.getRepository(Admin);
    const admin = await repo.findOne({ where: { email, password } });
    if (!admin) {
      throw new Error("Invalid credentials");
    }
    return true;
  },

  adminBlockUser: async (_: any, args: { userId: number }) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: args.userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isLecturer) {
      throw new Error("Cannot block a lecturer account");
    }
    user.isBlocked = true;
    return userRepo.save(user);
  },

  adminUnblockUser: async (_: any, args: { userId: number }) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: args.userId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isLecturer) {
      throw new Error("Cannot unblock a lecturer account");
    }
    user.isBlocked = false;
    return userRepo.save(user);
  },

  adminBlockTutor: async (_: any, args: { tutorId: number }) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: args.tutorId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isLecturer) {
      throw new Error("Cannot block a lecturer account");
    }
    user.isBlocked = true;
    return userRepo.save(user);
  },

  adminUnblockTutor: async (_: any, args: { tutorId: number }) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id: args.tutorId } });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isLecturer) {
      throw new Error("Cannot unblock a lecturer account");
    }
    user.isBlocked = false;
    return userRepo.save(user);
  }
}; 