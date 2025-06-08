import {Router} from 'express';
import { 
  getLecturerApplications, 
  updateApplication, 
  deleteApplication, 
  createApplication,
  addCourseTutor,
  removeCourseTutor 
} from '../controller/applicationController';

const router = Router();

router.get('/lecturer/applications', getLecturerApplications);
router.put('/applications/:id/', updateApplication);
router.delete('/applications/:id', deleteApplication);
router.post("/applications", createApplication);
router.post("/course-tutor", addCourseTutor);
router.delete("/course-tutor", removeCourseTutor);

export default router;