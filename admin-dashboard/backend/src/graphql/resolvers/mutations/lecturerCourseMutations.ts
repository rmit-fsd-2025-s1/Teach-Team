import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/User";
import { Course } from "../../../entities/Course";
import { LecturerCourse } from "../../../entities/LecturerCourse";

export const lecturerCourseMutations = {
  adminAssignLecturerCourse: async (_: any, args: { lecturerId: number; courseCode: string }) => {
    const { lecturerId, courseCode } = args;
    const userRepo = AppDataSource.getRepository(User);
    const courseRepo = AppDataSource.getRepository(Course);
    const lcRepo = AppDataSource.getRepository(LecturerCourse);

    const lecturer = await userRepo.findOne({ where: { id: lecturerId } });
    if (!lecturer || !lecturer.isLecturer) {
      throw new Error("User is not a valid lecturer");
    }

    const course = await courseRepo.findOne({ where: { courseCode } });
    if (!course) {
      throw new Error("Course not found");
    }

    const existing = await lcRepo.findOne({
      where: { lecturer_id: lecturerId, courseCode },
    });
    if (existing) {
      return lcRepo.findOne({
        where: { id: existing.id },
        relations: ["lecturer", "course"],
      });
    }

    const newAssign = lcRepo.create({ lecturer_id: lecturerId, courseCode });
    const saved = await lcRepo.save(newAssign);

    return lcRepo.findOne({
      where: { id: saved.id },
      relations: ["lecturer", "course"],
    });
  },

  adminRemoveLecturerCourse: async (_: any, args: { lecturerId: number; courseCode: string }) => {
    const { lecturerId, courseCode } = args;
    const lcRepo = AppDataSource.getRepository(LecturerCourse);

    const existing = await lcRepo.findOne({
      where: { lecturer_id: lecturerId, courseCode },
    });
    if (!existing) {
      return false;
    }
    await lcRepo.remove(existing);
    return true;
  }
}; 