import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/User";
import { Course } from "../../../entities/Course";
import { LecturerCourse } from "../../../entities/LecturerCourse";
import { Application } from "../../../entities/Application";

export const adminQueries = {
  adminAllLecturers: async () => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.find({ where: { isLecturer: true } });
  },

  adminAllCourses: async (_: any, args: { semester?: string }) => {
    const courseRepo = AppDataSource.getRepository(Course);
    if (args.semester) {
      return courseRepo.find({ where: { semester: args.semester } });
    }
    return courseRepo.find();
  },

  adminLecturerAssignments: async (_: any, { lecturerId }: { lecturerId: number }) => {
    const lcRepo = AppDataSource.getRepository(LecturerCourse);
    return lcRepo.find({
      where: { lecturer_id: lecturerId },
      relations: ["lecturer", "course"],
    });
  },

  adminCourseAssignments: async (_: any, { courseCode }: { courseCode: string }) => {
    const lcRepo = AppDataSource.getRepository(LecturerCourse);
    return lcRepo.find({
      where: { courseCode },
      relations: ["lecturer", "course"],
    });
  },

  adminAllTutors: async () => {
    const userRepo = AppDataSource.getRepository(User);
    return userRepo.find({ where: { isLecturer: false } });
  },

  adminAllApplications: async () => {
    const appRepo = AppDataSource.getRepository(Application);
    return appRepo.find();
  }
}; 