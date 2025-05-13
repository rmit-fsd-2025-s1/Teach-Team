import {Router} from 'express'
import {signin, signup, logout} from '../controller/authController';
import { createApplication } from "../controller/applicationController";


const router = Router()

router.post('/signup', signup)

router.post('/signin', signin)

router.post('/logout', logout)

router.post("/applications", createApplication);

export default router;
