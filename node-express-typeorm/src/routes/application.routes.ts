import {Router} from 'express';
import { getLecturerApplications, updateApplication, deleteApplication, createApplication } from '../controller/applicationController';

const router = Router();

router.get('/lecturer/applications', getLecturerApplications);
router.put('/applications/:id/', updateApplication);
router.delete('/applications/:id', deleteApplication);
router.post("/applications", createApplication);  // correct


export default router;