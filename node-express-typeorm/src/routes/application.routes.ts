import {Router} from 'express';
import { getLecturerApplications, updateApplication, deleteApplication } from '../controller/applicationController';

const router = Router();

router.get('/lecturer/applications', getLecturerApplications);
router.put('/applications/:id/', updateApplication);
router.delete('/applications/:id', deleteApplication);

export default router;