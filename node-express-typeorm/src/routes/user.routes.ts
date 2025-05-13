import {Router } from 'express';
import { getUsers, getUserByEmail, updateUser } from '../controller/userController';

const router = Router()

router.get('/', getUsers)
router.get('/:email', getUserByEmail)
router.put('/:email', updateUser)

export default router;