import {Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { Application } from '../entity/Application';
import { User } from "../entity/User";
import { Courses } from '../entity/Courses';

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
  const { search, sortBy, order } = req.query;
  const qb = AppDataSource.getRepository(Application)
    .createQueryBuilder("app")
    .leftJoinAndSelect("app.selectedCourse", "courses");

  if (search && typeof search === "string") {
    const q = `%${search.toLowerCase()}%`;
    qb.where(
      `LOWER(app.name) LIKE :q
       OR LOWER(app.email) LIKE :q
       OR LOWER(app.skills) LIKE :q
       OR LOWER(app.availability) LIKE :q
       OR LOWER(app.role) LIKE :q
       OR LOWER(courses.courseName) LIKE :q`,
      { q }
    );
  }

  if (sortBy && typeof sortBy === "string") {
    const dir = (order as string)?.toUpperCase() === "DESC" ? "DESC" : "ASC";
    qb.orderBy(`app.${sortBy}`, dir);
  } else {
    qb.orderBy("app.dateApplied", "DESC");
  }

  const apps = await qb.getMany();
  return res.json(apps);
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

