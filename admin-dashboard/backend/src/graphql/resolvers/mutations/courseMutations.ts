import { AppDataSource } from "../../../data-source";
import { Course } from "../../../entities/Course";
import { LecturerCourse } from "../../../entities/LecturerCourse";
import { Application } from "../../../entities/Application";

export const courseMutations = {
  adminCreateCourse: async (_: any, args: { courseCode: string; courseName: string; semester: string }) => {
    const courseRepo = AppDataSource.getRepository(Course);
    const already = await courseRepo.findOne({
      where: { courseCode: args.courseCode, semester: args.semester },
    });
    if (already) {
      throw new Error("Course already exists in this semester");
    }

    const newCourse = courseRepo.create({
      courseCode: args.courseCode,
      courseName: args.courseName,
      semester: args.semester,
    });
    return courseRepo.save(newCourse);
  },

  adminUpdateCourse: async (_: any, args: { courseCode: string; courseName?: string; semester?: string }) => {
    const courseRepo = AppDataSource.getRepository(Course);
    const existing = await courseRepo.findOne({
      where: { courseCode: args.courseCode },
    });
    if (!existing) {
      throw new Error("Course not found");
    }
    if (args.courseName !== undefined) {
      existing.courseName = args.courseName;
    }
    if (args.semester !== undefined) {
      existing.semester = args.semester;
    }
    return courseRepo.save(existing);
  },

  adminDeleteCourse: async (_: any, args: { courseCode: string }) => {
    const courseRepo = AppDataSource.getRepository(Course);
    const lcRepo = AppDataSource.getRepository(LecturerCourse);
    const appRepo = AppDataSource.getRepository(Application);
    const existing = await courseRepo.findOne({
      where: { courseCode: args.courseCode },
    });
    if (!existing) {
      return false;
    }

    await lcRepo.delete({ courseCode: args.courseCode });
    await appRepo.delete({ selectedCourse: args.courseCode });
    await courseRepo.remove(existing);
    return true;
  }
}; 