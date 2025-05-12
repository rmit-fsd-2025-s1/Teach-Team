import {Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { Application } from '../entity/Application';

const appRepo = AppDataSource.getRepository(Application);


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

