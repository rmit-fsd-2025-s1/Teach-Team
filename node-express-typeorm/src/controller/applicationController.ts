import {Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { Application } from '../entity/Application';
import { User } from "../entity/User";
import { Courses } from '../entity/Courses';
import { CourseLecturer } from '../entity/CourseLectutrers';
const appRepo = AppDataSource.getRepository(Application);


//CREATE application
export const createApplication = async (req: Request, res: Response) => {
    try {
      const {
        userId,
        selectedCourse: courseCode,
        role,
        previousRoles,
        availability,
        skills,
        academicCredentials,
        comments,
        rank,
      } = req.body;

      const courseRepo = AppDataSource.getRepository(Courses)
      const userRepo = AppDataSource.getRepository(User);
      const appRepo = AppDataSource.getRepository(Application);

      const course = await courseRepo.findOneBy({courseCode})
      if(!course) return res.status(404).json({message: "Course not found"})
  
      const user = await userRepo.findOne({ where: { id: userId }, relations: ["applications"] });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const application = appRepo.create({
        name: user.name,
        email: user.email,
        selectedCourse: course,
        role,
        previousRoles,
        availability,
        skills,
        academicCredentials,
        comments,
        rank,
      });
  
      const savedApp = await appRepo.save(application);
  
      user.applications.push(savedApp);
      await userRepo.save(user);
  
      return res.status(201).json({ message: "Application submitted", application: savedApp });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to submit application", error: error });
    }
  };
//GET all applications

export const getLecturerApplications = async (req: Request, res: Response) => {
  const { search, sortBy, order, lecturerId } = req.query;

  const rawLecturerId = (lecturerId as string) || "";
  
  const qb = AppDataSource.getRepository(Application)
    .createQueryBuilder("app")
    .leftJoinAndMapOne(
      "app.selectedCourseEntity", 
      Courses,                    
      "courses",                 
      "courses.courseCode = app.selectedCourse"
    )
    .innerJoin(
      CourseLecturer,
      "cl",
      "cl.courseCode = app.selectedCourse AND cl.lecturer_id = :lecturerId",
      { lecturerId: rawLecturerId }
    );

  if (search && typeof search === "string") {
    const q = `%${search.toLowerCase()}%`;
    qb.andWhere(
      `LOWER(app.name) LIKE :q
        OR LOWER(app.email) LIKE :q
        OR LOWER(app.skills) LIKE :q
        OR LOWER(app.availability) LIKE :q
        OR LOWER(app.role) LIKE :q
        OR LOWER(courses.courseName) LIKE :q`,
      { q }
    );
  }

  const sortDirection = order === "DESC" ? "DESC" : "ASC";

  if (sortBy === "availability") {
    qb.orderBy("app.availability", sortDirection);
  } else if (sortBy && typeof sortBy === "string") {
    qb.orderBy("courses.courseName", sortDirection);
  } else {
  
    qb.orderBy("app.dateApplied", "DESC");
  }


  try {
    const applications = await qb.getMany();
    return res.json(applications);
  } catch (err) {
    console.error("Error in getLecturerApplications:", err);
    return res.status(500).json({ message: "Failed to load applications" });
  }
};

//PUT update application
export const updateApplication = async (req: Request, res: Response) => {
    const {id} = req.params;
    const updates = req.body;
    try {
       const app = await appRepo.findOneBy({id: id});
       if(!app) return res.status(404).json({message: 'Application not found'})
        Object.assign(app, updates);
        const updatedApp = await appRepo.save(app);
        res.json(updatedApp);
    } catch (error) {
        res.status(500).json({ message: "Failed to update application", error: error });
    }
}

//DELETE application
export const deleteApplication = async (req: Request, res: Response) => {
    try {
        await appRepo.delete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete application", error: error });
    }
}

