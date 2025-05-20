import {Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';

const userRepo = AppDataSource.getRepository(User)

export const signup = async (req: Request, res: Response) => {
    const {name, email, password, isLecturer} = req.body

    
    if(!name || !email || !password || isLecturer === "boolean") {
        return res.status(400).json({message: 'Please provide name, email, password isLecturer'})
    }

    try {
        const exists = await userRepo.findOneBy({email})
        if(exists) return res.status(400).json({message: 'Email in use'})

        const hash = await bcrypt.hash(password, 10);
        const user = userRepo.create({
            name,
            email,
            password: hash,
            isLecturer,
            selectionCount: 0
        });

        await userRepo.save(user)

        return res.status(201).json({message: 'User created'})


    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to create user', error: error})
    }

}


export const signin = async (req: Request, res: Response) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({message: 'email and password required'})
    }

    try {
        const user = await userRepo.findOneBy({email})
        if(!user) return res.status(400).json({message: 'Invalid email or password'})

        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(400).json({message: 'Invalid email or password'})

        const { password: _, ...u } = user;
        return res.json({ message: `Welcome ${user.name}`, user: u });


    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to signin', error: error})
    }   

}

export const logout = async (_req: Request, res: Response) => {
    try {
        return res.json({message: 'Logged out'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Failed to logout', error: error})
    }
}
    