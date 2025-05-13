import {Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { Application } from '../entity/Application';
import { User } from "../entity/User";

const appRepo = AppDataSource.getRepository(Application);

//CREATE application
export const createApplication = async (req: Request, res: Response) => {
    try {
      const {
        userId,
        selectedCourse,
        role,
        previousRoles,
        availability,
        skills,
        academicCredentials,
        comments,
        rank,
      } = req.body;
  
      const userRepo = AppDataSource.getRepository(User);
      const appRepo = AppDataSource.getRepository(Application);
  
      const user = await userRepo.findOne({ where: { id: userId }, relations: ["applications"] });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const application = appRepo.create({
        name: user.name,
        email: user.email,
        selectedCourse: { courseCode: selectedCourse },
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
      return res.status(500).json({ message: "Failed to submit application" });
    }
  };

//GET all applications
export const getLecturerApplications = async(_req: Request, res: Response) => {
    try {
        const apps = await appRepo.find({order: {dateApplied: "DESC"} });
        res.json(apps);
    } catch (error) { 
        res.status(500).json({ message: "Internal server error" });
    }
}


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
        res.status(500).json({ message: "Internal server error" });
    }
}

//DELETE application
export const deleteApplication = async (req: Request, res: Response) => {
    try {
        await appRepo.delete(req.params.id);
        res.json({ message: "Application deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

