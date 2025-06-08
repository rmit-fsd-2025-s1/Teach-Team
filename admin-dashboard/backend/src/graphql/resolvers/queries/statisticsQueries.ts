import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/User";

export const statisticsQueries = {
  chosenCandidates: async () => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.createQueryBuilder("user")
      .where("user.selectionCount >= :min", { min: 1 })
      .andWhere("user.isLecturer = :isLecturer", { isLecturer: false })
      .getMany();
  },

  popularCandidates: async () => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.createQueryBuilder("user")
      .where("user.selectionCount > :min", { min: 3 })
      .andWhere("user.isLecturer = :isLecturer", { isLecturer: false })
      .getMany();
  },

  candidatesYetToBegin: async () => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.createQueryBuilder("user")
      .where("user.selectionCount = :val", { val: 0 })
      .andWhere("user.isLecturer = :isLecturer", { isLecturer: false })
      .getMany();
  }
}; 