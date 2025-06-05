import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import { Course } from "../../entities/Course";
import { LecturerCourse } from "../../entities/LecturerCourse";

export const adminResolvers = {
  Query: {
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

    adminLecturerAssignments: async (
      _: any,
      { lecturerId }: { lecturerId: number }
    ) => {
      const lcRepo = AppDataSource.getRepository(LecturerCourse);
      return lcRepo.find({
        where: { lecturer_id: lecturerId },
        relations: ["lecturer", "course"],
      });
    },

    adminCourseAssignments: async (
      _: any,
      { courseCode }: { courseCode: string }
    ) => {
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
  },

  Mutation: {
    adminAssignLecturerCourse: async (
      _: any,
      args: { lecturerId: number; courseCode: string }
    ) => {
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

    adminRemoveLecturerCourse: async (
      _: any,
      args: { lecturerId: number; courseCode: string }
    ) => {
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
    },

    
    adminCreateCourse: async (
      _: any,
      args: { courseCode: string; courseName: string; semester: string }
    ) => {
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

    adminUpdateCourse: async (
      _: any,
      args: { courseCode: string; courseName?: string; semester?: string }
    ) => {
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
      const existing = await courseRepo.findOne({
        where: { courseCode: args.courseCode },
      });
      if (!existing) {
        return false;
      }
      await courseRepo.remove(existing);
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
    },
  },
};
